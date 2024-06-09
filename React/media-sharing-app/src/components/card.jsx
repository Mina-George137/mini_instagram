import PropTypes from "prop-types";
import { useState } from "react";
import { deleteMedia, likeMedia, unlikeMedia } from "../API/api_manager";
function CardComponent(props) {
  // props refers to the  properties passed into this component => Immutable (does not change)
  // states refers to value that are managed by the component => mutable (changes)
  let [likes, setlikes] = useState(props.asset.likes.length);
  let [buttonName, setButtonName] = useState("like");

  const increment = () => {
    // use the current state to calculate the NEXT state
    // it is called updater function
    setlikes((likes) => likes + 1);
  };

  const decrement = () => {
    setlikes((likes) => likes - 1);
  };

  const updateButton = (label) => {
    setButtonName(label);
  };

  const handleLikeClick = (event) => {
    if (event.target.textContent == "like") {
      increment();
      updateButton("unlike");
      likeMedia(props.asset._id);
    } else {
      decrement();
      updateButton("like");
      unlikeMedia(props.asset._id);
    }
  };

  const handledeleteClick = async () => {
    await deleteMedia(props.asset._id);
    props.parentDeleteCallBack(props.asset._id);

    // not best practice!
    //  but we need to tell parent component something has changed so it can re render with new data
    // window.location.reload();
  };

  return (
    <div className="card">
      <img src={props.asset.filePath} alt="" className="cardImage" />
      <p>{likes}</p>
      <button onClick={handleLikeClick}>{buttonName}</button>
      &nbsp;
      <button onClick={handledeleteClick}>delete</button>
    </div>
  );
}

CardComponent.propTypes = {
  asset: PropTypes.object,
  parentDeleteCallBack: PropTypes.func,
};
export default CardComponent;
