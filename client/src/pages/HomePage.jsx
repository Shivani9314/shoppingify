import React, { useState, useEffect } from 'react';
import { MdSearch } from "react-icons/md";
import Category from '../components/Category';
import CreateItemModal from '../components/CreateItemModal'; 
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, fetchCategories } from '../slices/categorySlice';
import SideNavbar from '../components/utilityComponents/SideNavbar';
import RightPanel from '../components/utilityComponents/RightPannel';
import { selectLoader } from '../slices/loaderSlice';
import Loader from '../components/utilityComponents/Loader';
import Toast from '../components/utilityComponents/Toast';

function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemModalState, setItemModalState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);
  const loader = useSelector(selectLoader);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);


  const handleItemClick = (item) => {
    setSelectedItem(item);
    setItemModalState(true);
  };
  
  const handleCloseModal = () => {
    setSelectedItem(null);
    setItemModalState(false);
  };

  const handleAddItem = () => {
    setShowCreateItemModal(true);
  };

  const handleCloseCreateItemModal = () => {
    setShowCreateItemModal(false);
    dispatch(fetchCategories());
  };

  const filteredCategories = categories?.filter(category =>
    category.Items && category.Items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  return (
    <div className='flex'>
      <Loader/>
      <SideNavbar/>
      <div className='bg-grayBg w-full flex h-screen relative'>
        <div className="w-full flex z-50 justify-between p-10 fixed absolute">
          <div className="w-4/5">
            <span className="text-3xl font-semibold">
              <span className="text-accent">Shoppingify</span>
              <span> allows you take your shopping list wherever you go</span>
            </span>
          </div>
          <div className="w-50 h-16 lg:flex items-center relative mb-6 hidden shadow-lg ml-20 rounded-xl">
            <MdSearch
              size={26}
              color="lightDark"
              className="absolute ml-2 w-10 "
            />
            <input
              placeholder="Search Items...."
              className="shadow-sm rounded-xl p-4 w-50 h-16 pl-14 outline-accent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className='mt-40 overflow-y-scroll w-full'>
          {filteredCategories?.map((category) => (
            <Category key={category.id} category={category} setItemModalState={handleItemClick} searchQuery={searchQuery} />
          ))}
        </div>
      </div>
      {showCreateItemModal ? (
        <CreateItemModal onCloseModal={handleCloseCreateItemModal} />
      ) : (
        <RightPanel itemModalState={itemModalState} selectedItem={selectedItem} onCloseModal={handleCloseModal} onAddItem={handleAddItem} showListComponent={true} />
      )}
      <Toast/>
    </div>
  );
}

export default HomePage;
