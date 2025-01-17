const { Category, Item } = require('../models');

const createItem = async (req, res) => {
  const { name, note, image_url, categoryName } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Name field is required" });
    }

    let category;
    if (categoryName) {
      const [categoryInstance] = await Category.findOrCreate({
        where: { name: categoryName },
        defaults: { name: categoryName }
      });
      category = categoryInstance
    }

    const item = await Item.create({
      name,
      note,
      image_url,
      category_id:category.id ,
    });

    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



const getItemByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const items = await Item.findAll({
      where: { category_id: categoryId },
      attributes: ['id', 'name', 'note', 'image_url', 'category_id'],
    });

    return res.status(200).json(items);
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
  const { name, note, image_url } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const [updated] = await Item.update(
      { name ,note,image_url},
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

module.exports = { createItem, getItemByCategoryId, deleteItem, updateItem };

