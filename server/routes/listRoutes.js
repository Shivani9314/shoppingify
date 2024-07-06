const express = require('express');
const router = express.Router();
const {
  createList,
  getList,
  updateList,
  deleteList,
  getActiveList,
  getListsByUserId
} = require("../controllers/listController");

router.post("/", createList); 
router.get("/", getList); 
router.put("/:listId", updateList); 
router.delete("/:id", deleteList); 
router.get('/:userId/active', getActiveList);
router.get('/:userId', getListsByUserId)

module.exports = router;
