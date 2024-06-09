const router = require("express").Router();

// Multer for files uploading.
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require("multer");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
    folder: "minly  ",
    allowedFormats: ["jpeg", "png", "jpg", "gif"],
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(undefined, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });
const auth = require("../../middleware/auth");
const {
  uploadToCloud,
  deleteMedia,
  getMediaByUserID,
  getAllMedia,
  likeMedia,
  unlikeMedia,
} = require("./controller/media.controller");

router.post("/upload", auth(), upload.single("mediaFile"), uploadToCloud);
router
  .route("/:id")
  .delete(auth(), deleteMedia)
  .post(auth(), likeMedia)
  .patch(auth(), unlikeMedia);
router.route("/").get(getAllMedia);

module.exports = router;
