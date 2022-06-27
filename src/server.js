const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const path = require('path');
const fileUpload = require("express-fileupload");

const db = require("./config/db");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user");
const orderRoutes = require("./routings/order");
const categoryRoutes = require("./routings/category");

const production = process.env.NODE_ENV === "production";

require("dotenv").config();

const app = express();
app.use(cors())

production && app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.json());
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

production && (
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  })
)

app.listen(process.env.PORT || 5000);
console.log("App listening on PORT: " + process.env.PORT || "5000")
