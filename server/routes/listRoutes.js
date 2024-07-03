const express = require('express');
const router = express.Router();
const {
  createList,
  getList,
  updateList,
  deleteList
} = require("../controllers/listController");

router.post("/", createList); 
router.get("/", getList); 
router.put("/:id", updateList); 
router.delete("/:id", deleteList); 

module.exports = router;
