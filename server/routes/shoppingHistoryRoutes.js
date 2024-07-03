const express = require('express');
const router = express.Router();
const {
  createShoppingHistoryEntry,
  getAllShoppingHistory,
  getShoppingHistoryByUserId,
  deleteShoppingHistoryEntry
} = require("../controllers/shoppingHistoryController");

router.post("/", createShoppingHistoryEntry); 
router.get("/", getAllShoppingHistory); 
router.get("/:user_id", getShoppingHistoryByUserId); 
router.delete("/:id", deleteShoppingHistoryEntry); 

module.exports = router;
