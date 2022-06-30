const Product = require("../models/Product");
const { cloudinary } = require("../utils/cloudinary");

/* READ ALL PRODUCTS */
exports.fetchProducts = async (req, res) => {
  try {
    const pageSize = 100;
    const page = Number(req.query.pageNumber) || 1;

    const or_data = {
      $or: [
        {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
        {
          category: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
      ],
    };

    const keyword = req.query.keyword ? or_data : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", err });
  }
};

/* READ ONE PRODUCT */
exports.fetchProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById({ _id: id });

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", err });
  }
};

/* CREATE PRODUCT */
exports.addProduct = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.price;
    const inStock = req.body.inStock;
    const publicImage = req.body.publicImage;
    const file = req.files.file;

    const product = new Product({
      name,
      description,
      category,
      price,
      inStock,
      publicImage,
      images: [file.name],
      reviews: [],
      createdAt: new Date().toISOString(),
    });

    await product.save();

    return res.status(200).json({
      message: `Product ${name} added`,
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", err });
  }
};

/* DELETE PRODUCT */
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    console.log(productId);
    await Product.deleteOne({ _id: productId });

    return res
      .status(200)
      .json({ message: `Product ${productId} deleted`, productId });
  } catch (err) {
    res.status(500);
  }
};

/* UPDATE PRODUCT */
exports.editProduct = async (req, res) => {
  try {
    const _id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.price;
    const inStock = req.body.inStock;
    const publicImage = req.body.publicImage;
    const images = req.body.images;

    const productUpdated = await Product.updateOne(
      { _id: _id },
      {
        $set: {
          name,
          description,
          category,
          price,
          inStock,
          publicImage,
          images,
        },
      }
    );

    res
      .status(200)
      .json({ message: `Product ${name} updated`, productUpdated });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", err });
  }
};
