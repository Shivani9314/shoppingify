const express = require("express");
const router = express.Router();
const {
  createShoppingHistoryEntry,
  getAllShoppingHistory,
  getShoppingHistoryByUserId,
  deleteShoppingHistoryEntry,
} = require("../controllers/shoppingHistoryController.js");

router.post("/shopping-history", createShoppingHistoryEntry);
router.get("/shopping-history", getAllShoppingHistory);
router.get("/shopping-history/:user_id", getShoppingHistoryByUserId);
router.delete("/shopping-history/:id", deleteShoppingHistoryEntry);

module.exports = router;

