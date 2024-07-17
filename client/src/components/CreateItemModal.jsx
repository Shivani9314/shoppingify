import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem } from '../slices/itemsSlice';
import { selectCategories, createCategory } from '../slices/categorySlice';

function CreateItemModal({ onCloseModal }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        throw new Error('Name field is required.');
      }
      const itemData = {
        name,
        note,
        image_url: image,
        categoryName: categoryName,
      };

      await dispatch(createItem({item:itemData}));
      onCloseModal();
    } catch (error) {
      console.error('Error creating category or item:', error);
    }
  };

  return (
    <div className="bg-yellowBg flex flex-col w-2/5 relative h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg h-screen">
        <h2 className="text-2xl font-bold mb-10 mt-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-m mb-2">Name (Required)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-m mb-2">Note (Optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-m mb-2">Image URL (Optional)</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex flex-col item-center">
            <label className="block text-gray-700 text-m mb-2">Category (Required)</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter or select a category"
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              list="categories"
            />
            <datalist className='bg-white border-accent overflow-y-auto' id="categories">
              {categories.map(category => (
                <option className='bg-white text-black cursor-pointer' key={category.id} value={category.name} />
              ))}
            </datalist>
          </div>
          <div className="flex items-center mt-20 justify-around">
            <button
              type="submit"
              className="bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={onCloseModal}
              className="font-bold py-2 px-4 bg-lightGray text-white rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItemModal;
