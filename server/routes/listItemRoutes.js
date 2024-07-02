const express = require('express');
const { createListItem, getListItem, getAllListItemOfList, updateListItem, deleteListItem } = require('../controllers/listItemController');
const router = express.Router();

router.post('/list-items', createListItem);
router.get('/lists/:list_id/items', getAllListItemOfList);
router.get('/list-items/:id', getListItem);
router.put('/list-items/:id', updateListItem);
router.delete('/list-items/:id', deleteListItem);

module.exports = router;

