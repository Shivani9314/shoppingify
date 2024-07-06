const { List, Item, ListItem, User } = require("../models");
const { Sequelize } = require("sequelize");

const createList = async (req, res) => {
  const { name, user_id } = req.body;

  try {
    if (!name || !user_id) {
      return res.status(400).json({ message: "Name and user_id are required" });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const list = await List.create({ name, user_id, is_active: true });
    return res.status(201).json(list);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getList = async (req, res) => {
  try {
    const lists = await List.findAll({
      include: [
        {
          model: Item,
          through: {
            model: ListItem,
            attributes: ["quantity"],
          },
          as: "items",
        },
      ],
    });
    return res.status(200).json(lists);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateList = async (req, res) => {
  const { listId } = req.params;
  const { name, is_active } = req.body;

  try {
    const [updated] = await List.update(
      { name, is_active },
      {
        where: { id: listId },
      }
    );

    if (updated) {
      const updatedList = await List.findOne({ where: { id: listId } });
      return res.status(200).json({ list: updatedList });
    }
    throw new Error("List not found");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteList = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await List.destroy({ where: { id } });
    if (result) {
      return res.status(200).json({ message: "List deleted successfully" });
    } else {
      return res.status(404).json({ error: "List not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getActiveList = async (req, res) => {
  try {
    const { userId } = req.params;

    const activeList = await List.findOne({
      where: {
        user_id: userId,
        is_active: true,
      },
      include: [
        {
          model: Item,
          as: "items",
          through: {
            model: ListItem,
            attributes: [],
          },
          attributes: [
            "id",
            "name",
            "note",
            "image_url",
            "category_id",
            [Sequelize.literal('"items->ListItem"."quantity"'), "quantity"],
          ],
        },
      ],
      attributes: ["id", "name", "user_id", "is_active"],
    });

    if (!activeList) {
      return res.status(200).json({});
    }

    return res.json(activeList);
  } catch (error) {
    console.error("Error retrieving active list:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the active list" });
  }
};

const getListsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const lists = await List.findAll({
      where: { user_id: userId, is_active: false },
      include: [
        {
          model: Item,
          as: "items",
          through: {
            model: ListItem,
            attributes: [],
          },
          attributes: [
            "id",
            "name",
            "note",
            "image_url",
            "category_id",
            [Sequelize.literal('"items->ListItem"."quantity"'), "quantity"],
          ],
        },
      ],
    });

    if (!lists || lists.length === 0) {
      return res.status(404).json({ message: 'No lists found for this user' });
    }

    res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the lists' });
  }
};



module.exports = {
  createList,
  getList,
  updateList,
  deleteList,
  getActiveList,
  getListsByUserId,
};
