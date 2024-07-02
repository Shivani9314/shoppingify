const express = require("express");
const { createCategory, getAllCategories, deleteCategory, updateCategory } = require("../controllers/categoryController");
const router = express.Router();

router.post("/create", createCategory);
router.get("/get", getAllCategories);
router.delete("/delete/:id" , deleteCategory);
router.put("/update/:id" , updateCategory);

module.exports = router;


