const { ListItem, Item, List } = require('../models');

const createListItem = async(req,res) =>{
    const {list_id, item_id , quantity} = req.body;

    try{
        if(!list_id , !item_id , !quantity){
            return res.status(400).json({message:"All fields are required"});
        }

        // const exist = await ListItem.findOne({where:{id : item_id}});

        const listItem = await ListItem.create({list_id, item_id , quantity});
        return res.status(200).json(listItem);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}


const getAllListItemOfList = async(req,res) =>{
    const { list_id } = req.params;
    try{

        const listItems = await ListItem.findAll({
            where: { list_id },
            include: [Item]
        });
        return res.status(200).json(listItems);
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
}

const getListItem = async (req, res) => {
    const { id } = req.params;
  
    try {
      const listItem = await ListItem.findByPk(id, {
        include: [Item, List]
      });
  
      if (!listItem) {
        return res.status(404).json({ message: "ListItem not found" });
      }
  
      return res.status(200).json(listItem);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
};

const updateListItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
  
    try {
      const listItem = await ListItem.findOne({ where: { item_id: itemId } });
  
      if (!listItem) {
        return res.status(404).json({ message: "ListItem not found" });
      }
  
      listItem.quantity = quantity || listItem.quantity;
  
      await listItem.save();
      return res.status(200).json(listItem);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };


  const deleteListItem = async (req, res) => {
    const { itemId } = req.params;
  
    try {
      const listItem = await ListItem.findOne({where:{item_id:itemId}});
  
      if (!listItem) {
        return res.status(404).json({ message: "ListItem not found" });
      }
  
      await listItem.destroy();
      return res.status(200).json({ message: "ListItem deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

module.exports = {createListItem,getAllListItemOfList, getListItem,updateListItem, deleteListItem}