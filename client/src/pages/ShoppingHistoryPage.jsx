import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectList, getListByUserId } from '../slices/listSlice';
import SideNavbar from '../components/utilityComponents/SideNavbar';
import RightPanel from '../components/utilityComponents/RightPannel';

function formatCreatedAt(createdAt) {
    const date = new Date(createdAt);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function ShoppingHistoryPage() {
    const dispatch = useDispatch();
    const lists = useSelector(selectList);
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => {
        const userId = 4;
        dispatch(getListByUserId(userId));
    }, [dispatch]);

    const handleListClick = (list) => {
        setSelectedList(list);
    };

    return (
        <div className='flex'>
            <SideNavbar />
            <div className='flex flex-col bg-grayBg w-full h-screen relative'>
                <div className='w-full flex z-50 justify-between p-10 fixed absolute'>
                    <h2 className='text-2xl font-bold'>Shopping History</h2>
                </div>
                <div className='mt-32 px-10 flex flex-col overflow-y-scroll'>
                    {lists && lists.length > 0 ? (
                        <ul>
                            {lists.map((list) => (
                                <li className='mb-4 bg-white rounded-xl cursor-pointer' key={list.id} onClick={() => handleListClick(list)}>
                                    <div className='shadow-lg flex py-4 px-10 justify-between rounded-xl'>
                                        <span className='font-bold'>{list.name}</span>
                                        <span className='font-bold'>{formatCreatedAt(list.createdAt)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No lists found.</p>
                    )}
                </div>
            </div>
            <RightPanel selectedList={selectedList} showListComponent={false}/>
        </div>
    );
}

export default ShoppingHistoryPage;
