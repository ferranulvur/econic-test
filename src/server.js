const cloudinary = require("cloudinary").v2;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid").v4;

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const db = require("./config/db");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user");
const orderRoutes = require("./routings/order");
const categoryRoutes = require("./routings/category");
const cloudinaryRoutes = require("./routings/cloudinary");
const stripeRoutes = require("./routings/stripe");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const production = process.env.NODE_ENV === "production";

require("dotenv").config();

const app = express();
app.use(cors());

production && app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.json());

app.use("/cloudinary", cloudinaryRoutes);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());

// database connection
db.makeDb();

app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/stripe", stripeRoutes);

production &&
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });

app.listen(process.env.PORT || 5000);
console.log("App listening on PORT: " + process.env.PORT || "5000");
