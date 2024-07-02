const { Category, Item } = require('../models');

// Create a Category
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "This field is required" });
    }
    
    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get All Categories with Items
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Item,
          attributes: ['id', 'name', 'note', 'image_url', 'category_id'],
        },
      ],
    });
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a Category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.destroy({ where: { id } });
    if (result) {
      return res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update a Category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if(!name){
      return res.status(400).json({ message: "This field is required" });
    }
    const [updated] = await Category.update({ name }, {
      where: { id }
    });

    if (updated) {
      const updatedCategory = await Category.findOne({ where: { id } });
      return res.status(200).json(updatedCategory);
    }
    return res.status(404).json({ error: 'Category not found' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createCategory, getAllCategories, deleteCategory, updateCategory };
