const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const categoryController = require("../controllers/category");

router.get("/", categoryController.fetchCategories);
router.get("/fetch-category/:categoryId", categoryController.fetchCategory);
router.post("/add-category", categoryController.addCategory);
router.post("/edit-category", categoryController.editCategory);
router.post("/delete-category", categoryController.deleteCategory);
router.get("/fetch-category-stock", categoryController.fetchCategoryStock);

module.exports = router;
