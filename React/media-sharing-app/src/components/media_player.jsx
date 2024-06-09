import CardComponent from "./card";
import { useEffect, useState } from "react";
import { getMedia } from "../API/api_manager";
import MediaNotFound from "./media_not_found";

function MediaPlayer() {
  const [media, setMedia] = useState([]);
  const [mediaNotFound, setMediaNotFound] = useState(false);



  // Fetch media data when the component is mounted
  useEffect(() => {
    async function fetchData() {
      const mediaData = await getMedia();
      if(mediaData){
        setMediaNotFound(false);
        setMedia(mediaData);
      }else{
        setMediaNotFound(true);
      }
    }
    fetchData();

    document.addEventListener("mediaUploaded", handleMediaUpload);
    return () => {
      // Cleanup: remove event listener when component unmounts
      document.removeEventListener("mediaUploaded", handleMediaUpload);
    };

  }, []);// Empty array as the second argument ensures the effect runs once

  const handleDeleteCallback = (deletedItemId) => {
    // Update the component's state
    // Filter out the deleted item from the media array
    const updatedMedia = media.filter((asset) => asset._id !== deletedItemId);
    // Update the component's state with the filtered media array
    setMedia(updatedMedia);
  };

  const handleMediaUpload = (event) => {
  // Update media state with the newly uploaded media
  console.log("Inside handle Media Upload in media player");
  console.log(event);
  
  // Extract the newly uploaded media from the event detail
  const uploadedMedia = event.detail[0];

  // Append the newly uploaded media to the existing media state
  setMedia((prevMedia) => [...prevMedia, uploadedMedia]);
 };

  // Map over the media array and pass each asset to CardComponent
  if(mediaNotFound || media.length === 0) {
    return <MediaNotFound></MediaNotFound>; // Return a message indicating no media found
  }else{
    const mediaList = media.map((asset) => (
      <CardComponent
        parentDeleteCallBack={handleDeleteCallback}
        asset={asset}
        key={asset._id}
      />
    ));

    return mediaList;
  }
}

export default MediaPlayer;
