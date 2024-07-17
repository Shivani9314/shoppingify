import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentList, selectCurrentList, updateList, updateItemQuantity, setCurrentList } from '../slices/listSlice';
import { FaMinus, FaPlus } from "react-icons/fa";

function List() {
  const currentList = useSelector(selectCurrentList);
  const [listName, setListName] = useState(currentList?.name || 'Shopping List');
  const dispatch = useDispatch();

  if (!currentList) {
    return <p>No items in the list.</p>;
  }

  const handleSaveList = () => {
    const { id } = currentList; 
    const is_active = false;
    dispatch(updateList({ listName, listId: id, is_active }));
    dispatch(clearCurrentList());
  }

  const handleIncreaseQuantity = (itemId) => {
    dispatch(updateItemQuantity({ itemId, change: 1 }));
  }

  const handleDecreaseQuantity = (itemId) => {
    dispatch(updateItemQuantity({ itemId, change: -1 }));
  }

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h2 className='text-2xl font-bold mb-8'>{listName}</h2>
        <ul>
          {currentList.items?.map(item => (
            <li key={item?.id} className='flex justify-between items-center mb-2'>
              <span className='text-lg'>{item?.name}</span>
              <div className='flex items-center gap-4'>
                <span className='cursor-pointer' onClick={() => handleIncreaseQuantity(item.id)}><FaPlus /></span>
                <span className='text-lg'>{item?.quantity}</span>
                <span className='cursor-pointer' onClick={() => handleDecreaseQuantity(item.id)}><FaMinus /></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col '>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className='py-2 px-4'
        />
        <div className='flex w-full justify-around'>
          <button onClick={handleSaveList} className="bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" >Save List</button>
          <button className="font-bold py-2 px-4 bg-lightGray text-white rounded focus:outline-none focus:shadow-outline mt-4">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default List;
