const express = require("express");
const { createItem, getItem, deleteItem, updateItem, } = require("../controllers/itemsController");
const router = express.Router();


router.post('/:id/createItem', createItem);
router.get('/items/:id', getItem);
router.delete('/items/:id' , deleteItem);
router.put('/items/:id', updateItem);


module.exports = router;

