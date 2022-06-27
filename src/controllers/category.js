const Category = require("../models/Category");
const Product = require("../models/Product");

exports.fetchCategories = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = {};

    const count = await Category.countDocuments({ ...keyword });
    const _categories = await Category.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    let ctr = 0;
    let categories = [];
    _categories.forEach(async (category) => {
      const _keyword = category.slug
        ? {
            type: {
              $regex: category.slug,
              $options: "i",
            },
          }
        : {};

      let newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        count: await Product.countDocuments({ ..._keyword }),
      };

      console.log(newCategory);
      categories.push(newCategory);
      ctr++;

      if (ctr === _categories.length) {
        console.log(categories);
        res.json({ categories, page, pages: Math.ceil(count / pageSize) });
      }
    });
  } catch (err) {
    res.status(500);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const name = req.body.category_name;
    const slug = req.body.category_slug;

    const category = new Category({
      name,
      slug,
      createdAt: new Date().toISOString(),
    });

    await category.save();

    return res.status(200).json({
      message: "Category added",
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchCategory = async (req, res) => {
  try {
    const id = req.params.productId;
    const category = await Category.findById({ _id: id });

    res.status(200).json({
      category,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchCategoryStock = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          type: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    res.status(200).json({
      count,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;

    await Category.deleteOne({ _id: categoryId });
    const categories = await Category.find({});

    return res
      .status(200)
      .json({ message: "Successfully Deleted", categories });
  } catch (err) {
    res.status(500);
  }
};

exports.editCategory = async (req, res) => {
  try {
    const catId = req.body.category_id;
    const name = req.body.category_name;
    const slug = req.body.category_slug;

    await Category.updateOne(
      { _id: catId },
      {
        $set: {
          name,
          slug,
        },
      }
    );
    res.status(200).json({
      message: "Category edited",
    });
  } catch (err) {
    res.status(500);
  }
};
