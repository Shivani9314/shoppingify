const { List } = require('../models');

const createList = async (req, res) => {
  const { name, user_id } = req.body;

  try {
    if (!name || !user_id) {
      return res.status(400).json({ message: "Name and user_id are required" });
    }
    const list = await List.create({ name, user_id });
    return res.status(201).json(list);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getList = async (req, res) => {
  try {
    const lists = await List.findAll();
    return res.status(200).json(lists);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateList = async(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
  
    try{
      const [updated] = await List.update({name},{
        where : {id}
      });
  
      if(updated){
        const updatedList = await List.findOne({ where: { id } });
        return res.status(200).json({ list: updatedList });
      }
      throw new Error('Category not found');
    }
    catch(err){
      return res.status(500).json({ error: err.message });
    }
}

const deleteList = async(req,res)=>{
    const { id } = req.params;
  try {
    const result = await List.destroy({ where: { id } });
    if (result) {
      return res.status(200).json({ message: 'List deleted successfully' });
    } else {
      return res.status(404).json({ error: 'List not found' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { createList, getList,updateList, deleteList };


