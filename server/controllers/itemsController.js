const { Item } = require("../models");

const createItem = async (req, res) => {
  const { name, note, image_url } = req.body;
  const { id } = req.params;

  try {
    if (!name) {
      return res.status(400).json({ message: "Name field is required" });
    }
    const item = await Item.create({
      name,
      note,
      image_url,
      category_id: id,
    });
    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id, {
      include: [
        {
          model: require("../models").Category,
          attributes: ["name"],
        },
      ],
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(200).json({ message: "Item not found" });
    }
    await Item.destroy({
      where: { id },
    });
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const [updated] = await Item.update(
      { name },
      {
        where: { id },
      }
    );

    if (updated) {
      const updatedItem = await Item.findOne({ where: { id } });
      return res.status(200).json({ item: updatedItem });
    }
    throw new Error("Item not found");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createItem, getItem, deleteItem, updateItem };

