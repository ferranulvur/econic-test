const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const checkAuth = require("../middlewares/check-auth");
const cloudinaryController = require("../controllers/cloudinary");

/* const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
}); */

const storage = multer.memoryStorage();
const parser = multer({ storage });

router.get("/", cloudinaryController.fetchImages);

router.post(
  "/uploadImage",
  parser.single("image"),
  cloudinaryController.uploadImage
);

module.exports = router;
