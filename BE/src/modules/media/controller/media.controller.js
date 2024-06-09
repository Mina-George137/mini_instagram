const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
}); 
const mediaModel = require("../../../../DB/models/media");

const createMediaIntoDB = async (req, result) => {
  let userId = req.user._id;
  let filePath = result.secure_url;
  let cloudID = result.public_id;
  let type = result.resource_type;
  let original_name = result.original_filename;
  let format = result.format;
  const newMedia = new mediaModel({
    cloudID: cloudID,
    userId: userId,
    filePath: filePath,
    type: type,
    originalName: original_name,
    format: format,
  });
  await newMedia.save();
  return newMedia;
};

const uploadToCloud = async (req, res, next) => {
  console.log(req.file);
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(req.file.path, {
      use_filename: true,
      unique_filename: false,
    });
    console.log(result);
    let newMedia = await createMediaIntoDB(req, result);
    return res
      .status(200)
      .json({ message: "success", data: { assets: [newMedia] } });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "fail", error: "Can not upload media" });
  }
};

function deleteFromCloudinary(public_id) {
  cloudinary.v2.api
  .delete_resources([public_id])
  .then(console.log);
}

const deleteMedia = async (req, res, next) => {
  try {
    let deletedMediaFromDB = await mediaModel.findByIdAndDelete(
      req.params.id
    );
    deleteFromCloudinary(deletedMediaFromDB.cloudID);
    return res
      .status(200)
      .json({ message: "success", data: { assets: [deletedMediaFromDB] } });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "fail", error: "Can not delete media" });
  }
};

const getMediaByUserID = async(req,res,next)=>{
  try{
    let assets = await mediaModel.find({userId : req.user._id});
    if(assets.length === 0){
      return res.status(404).json({message:"fail" , error:"No assets found for this user"})
    }else{
      return res.status(200).json({message:"success" , data:{assets: assets}})
    }
  }catch(err){
    return res.status(400).json({message:"fail" , error:"Can not get assets"})

  }
};

const getAllMedia = async(req,res,next)=>{
  try{
    let assets = await mediaModel.find();
    if(assets.length === 0){
      return res.status(404).json({message:"fail" , error:"No assets found for this user"})
    }else{
      return res.status(200).json({message:"success" , data:{assets: assets}})
    }
  }catch(err){
    return res.status(400).json({message:"fail" , error:"Can not get assets"})

  }
};

const likeMedia = async(req,res,next)=>{
  try{
    let assets = await mediaModel.findByIdAndUpdate(req.params.id,{$push:{likes:req.user._id}});

    return res.status(200).json({message:"success" , data:{assets: [assets]}});
    
  }catch(err){
    return res.status(400).json({message:"fail" , error:"Can not like assets"})
  }
};

const unlikeMedia = async(req,res,next)=>{
  try{
    let assets = await mediaModel.findByIdAndUpdate(req.params.id,{$pull:{likes:req.user._id}});

    return res.status(200).json({message:"success" , data:{assets: [assets]}});
    
  }catch(err){
    return res.status(400).json({message:"fail" , error:"Can not unlike assets"})

  }
};

module.exports = { uploadToCloud, deleteMedia,getMediaByUserID,getAllMedia,likeMedia,unlikeMedia };
