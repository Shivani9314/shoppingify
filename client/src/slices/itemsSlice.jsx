import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createItemApi } from '../Api';
import { hideLoader, showLoader } from './loaderSlice';
import toast from 'react-hot-toast';

const initialState = {
    items: {},
};

export const createItem = createAsyncThunk('items/createItem', async ({ item },{dispatch}) => {
    try {
        dispatch(showLoader())
        const newItem = await createItemApi(item);
        toast("Created Item sucessfully");
        return { item: newItem };
    } catch (error) {
        toast.error("Error in creating new item")
    }finally{
        dispatch(hideLoader())
    }
});


const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
});


export default itemsSlice.reducer;
