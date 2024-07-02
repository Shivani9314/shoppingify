const express = require("express");
const { createList, getList, updateList, deleteList } = require("../controllers/listController");
const router = express.Router();

router.post('/createlist', createList);
router.get('/getList' , getList);
router.put("/updateList" , updateList);
router.delete('/deleteList/:id' , deleteList)

module.exports = router;
