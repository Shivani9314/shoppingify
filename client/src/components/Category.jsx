import React from 'react';
import { FaPlus } from "react-icons/fa";

function Category({ category, setItemModalState, searchQuery }) {
  const items = category.Items;

  const filteredItems = items.filter(item => 
    item.name && item.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div className='p-8 px-16'>
      <h2 className='mb-5 font-medium text-lg'>{category.name}</h2>
      <div className='flex gap-10 flex-wrap'>
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className='flex bg-white rounded-xl shadow-lg p-4 gap-4 cursor-pointer' 
            onClick={() => setItemModalState(item)}
          >
            <p>{item.name}</p>
            <button><FaPlus /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
