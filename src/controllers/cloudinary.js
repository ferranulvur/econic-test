const cloudinary = require("cloudinary").v2;
const path = require("path");
const DatauriParser = require("datauri/parser");

const parser = new DatauriParser();

/* Functions */
const formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);

/* READ ALL PRODUCTS */
exports.fetchImages = async (req, res) => {
  try {
    console.log("fetchImages");
    const images = req.query.images;
    imagesArray = images.split(",");
    let expression = "";

    imagesArray.forEach((image) => {
      expression += `public_id:${image} OR`;
    });

    expression = expression.slice(0, -3);

    /*     const response = cloudinary.api.resources(function (error, result) {
      console.log(result, error);
    }); */

    console.log(expression);
    const data = await cloudinary.search
      .expression(expression)
      .sort_by("public_id", "desc")
      .max_results(10)
      .execute();
    //console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching images", err });
  }
};

/* UPLOAD IMAGE */
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) throw new Error("Image is not presented!");

    const file64 = formatBufferTo64(req.file);
    const cloudinaryData = await cloudinaryUpload(file64.content);

    res.status(200).json(cloudinaryData);
  } catch (err) {
    res.status(500).json({ message: "Error uploading image", err });
  }
};
