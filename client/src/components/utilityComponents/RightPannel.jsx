import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '../../slices/categorySlice';
import { addItemToList, createList, fetchActiveList, selectCurrentList, setCurrentList } from '../../slices/listSlice';
import toast from 'react-hot-toast';
import List from '../List';

function RightPanel({ itemModalState, selectedItem, onCloseModal, onAddItem, selectedList, showListComponent }) {
    const categories = useSelector(selectCategories);
    const currentList = useSelector(selectCurrentList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchActiveList(4));
    }, [dispatch]);

    const handleAddToList = async () => {
        let listId = currentList ? currentList.id : null;

        if (listId == null) {
            const newList = await dispatch(createList({ listName: 'Shopping List', user_id: 4 })).unwrap();
            listId = newList.id;
            dispatch(setCurrentList(newList));
        }

        const existingItem = currentList?.items?.find((item) => item.id == selectedItem.id);
        if (existingItem) {
            toast.error("Item Already exists in List");
        } else {
            await dispatch(addItemToList({ listId, item: selectedItem, quantity: 1 })).unwrap();
        }
        onCloseModal();
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    return (
        <div className="bg-yellowBg flex flex-col w-2/5 relative h-screen">
            {itemModalState && selectedItem ? (
                <div className="flex flex-col justify-between h-full w-full bg-white p-8">
                    <div>
                        <img src={selectedItem.image_url} alt={selectedItem.name} className="w-full h-50 object-cover mb-4 rounded" />
                        <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
                        <p className="mb-5">Category: {getCategoryName(selectedItem.category_id)}</p>
                        <p className="mb-4 leading-6">{selectedItem.note}</p>
                    </div>
                    <div className='flex w-full justify-around'>
                        <button onClick={onCloseModal} className="bg-lightGray text-white px-4 py-2 rounded">
                            Close
                        </button>
                        <button onClick={handleAddToList} className="bg-accent text-white px-4 py-2 rounded">
                            Add to List
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-grow py-8 px-10 space-y-10">
                    <div className="grid grid-cols-3 w-full bg-darkRed rounded-2xl h-32 relative">
                        <div className="col-span-1 -mt-5">
                            <img src="/source.svg" alt="logo" className="absolute source"></img>
                        </div>
                        <div className="col-span-2 m-auto -ml-4 space-y-1">
                            <div className="text-white font-semibold text-lg leading-1 leading-snug">
                                Didn't find what you need?
                            </div>
                            <button
                                onClick={onAddItem}
                                className="bg-white px-8 py-3 rounded-xl text-sm w-32 font-bold"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                    {showListComponent ? (
                        <List />
                    ) : (
                        <div className='overflow-y-scroll'>
                            {selectedList && selectedList.items.length > 0 ? (
                                <ul>
                                    {selectedList.items.map((item) => (
                                        <li key={item.id} className="mb-2">
                                            <div className="bg-white p-4 rounded shadow">
                                                <h3 className="font-bold">{item.name}</h3>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No items in the selected list.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default RightPanel;
