const express = require('express');
const router = express.Router();
const {
  createListItem,
  getListItem,
  getAllListItemOfList,
  updateListItem,
  deleteListItem
} = require('../controllers/listItemController');

router.post("/", createListItem); 
router.get("/lists/:list_id", getAllListItemOfList); 
router.get("/:id", getListItem); 
router.put("/:id", updateListItem); 
router.delete("/:id", deleteListItem); 

module.exports = router;
