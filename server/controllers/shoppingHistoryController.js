'use strict';
const { ShoppingHistory, List, User } = require('../models');

// Create a shopping history entry
const createShoppingHistoryEntry = async (req, res) => {
  const { user_id, list_id, timestamp } = req.body;

  try {
    if (!user_id || !list_id || !timestamp) {
      return res.status(400).json({ message: "User ID, List ID, and Timestamp are required" });
    }

    // Check if user_id and list_id exist before creating the entry
    const user = await User.findByPk(user_id);
    const list = await List.findByPk(list_id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${user_id} not found` });
    }

    if (!list) {
      return res.status(404).json({ message: `List with ID ${list_id} not found` });
    }

    const shoppingHistoryEntry = await ShoppingHistory.create({ user_id, list_id, timestamp });
    return res.status(201).json(shoppingHistoryEntry);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all shopping history entries
const getAllShoppingHistory = async (req, res) => {
  try {
    const shoppingHistory = await ShoppingHistory.findAll({
      include: [
        { model: List },
        { model: User, attributes: ['id', 'email'] }
      ]
    });
    return res.status(200).json(shoppingHistory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get shopping history by user ID
const getShoppingHistoryByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const shoppingHistory = await ShoppingHistory.findAll({
      where: { user_id },
      include: [
        { model: List },
        { model: User, attributes: ['id', 'email'] }
      ]
    });

    if (!shoppingHistory || shoppingHistory.length === 0) {
      return res.status(404).json({ message: "Shopping history not found for this user" });
    }

    return res.status(200).json(shoppingHistory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete shopping history entry by ID
const deleteShoppingHistoryEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const shoppingHistoryEntry = await ShoppingHistory.findByPk(id);
    if (!shoppingHistoryEntry) {
      return res.status(404).json({ message: "Shopping history entry not found" });
    }

    await shoppingHistoryEntry.destroy();
    return res.status(200).json({ message: "Shopping history entry deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createShoppingHistoryEntry,
  getAllShoppingHistory,
  getShoppingHistoryByUserId,
  deleteShoppingHistoryEntry,
};

