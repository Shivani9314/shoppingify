const express = require('express');
const router = express.Router();
const {
  createItem,
  getItemByCategoryId,
  deleteItem,
  updateItem
} = require("../controllers/itemsController");

router.post("/", createItem); 
router.get("/category/:categoryId", getItemByCategoryId); 
router.delete("/:id", deleteItem); 
router.put("/:id", updateItem); 
module.exports = router;
