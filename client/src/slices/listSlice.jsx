import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createListApi, addItemToListApi, fetchAllListItemsOfListApi, fetchAllListApi, getActiveListApi, updateListApi, updateListItemApi, removeItemFromListApi, getListByUserIdApi } from '../Api';
import { hideLoader, showLoader } from './loaderSlice';
import toast from 'react-hot-toast';

const initialState = {
    lists: [],
    currentList: { id: null, name: 'Shopping List', items: [] },
};

export const createList = createAsyncThunk('lists/createList', async ({ listName, user_id }, { dispatch }) => {
    try {
        dispatch(showLoader())
        const newList = await createListApi(listName, user_id);
        toast.success("List Created Successfully")
        return newList;
    } catch (error) {
        toast.error("Error in creating List")
    } finally {
        dispatch(hideLoader());
    }
});

export const addItemToList = createAsyncThunk('lists/addItemToList', async ({ listId, item, quantity }, { dispatch }) => {
    try {
        dispatch(showLoader())
        const addedItem = await addItemToListApi({ list_id: listId, item_id: item.id, quantity });
        toast.success("Item added Successfully");
        return { ...item, quantity };
    } catch (error) {
        toast.error("Opps can't add the list it already exist")
    } finally {
        dispatch(hideLoader());
    }
});

export const fetchItemsByList = createAsyncThunk('lists/fetchItemsByList', async (listId, { dispatch }) => {
    try {
        dispatch(showLoader())
        const fetchedItems = await fetchAllListItemsOfListApi(listId);
        return { listId, fetchedItems }
    } catch (error) {
        toast.error("Woops Can't fetch the items",error.message)
    } finally {
        dispatch(hideLoader());
    }
});

export const fetchActiveList = createAsyncThunk('lists/fetchAllList', async (userId, { dispatch }) => {
    try {
        dispatch(showLoader());
        const response = await getActiveListApi(userId);
        if (response === null) {
            return { id: null, name: 'Shopping List', items: [] };
        }
        return response;
    } catch (error) {
        toast.error("Create a new List");
    } finally {
        dispatch(hideLoader())
    }
});

export const updateList = createAsyncThunk('lists/updateList', async ({ listName, listId, is_active }, { dispatch }) => {
    try {
        dispatch(showLoader())
        const updatedList = await updateListApi(listName, listId, is_active);
        toast.success("List Updated Sucessfully")
        return updatedList;
    } catch (error) {
        toast.error("Can't update the list", error.message)
    } finally {
        dispatch(hideLoader())
    }
});

export const updateListItem = createAsyncThunk('lists/updateListItem', async ({ itemId, quantity }, { dispatch }) => {
    try {
        dispatch(showLoader())
        const updatedItem = await updateListItemApi(itemId, { quantity });
        return { itemId, quantity };
    } catch (error) {
        toast.error("Can't update the Items of list", error.message);
    } finally {
        dispatch(hideLoader())
    }
});

export const getListByUserId = createAsyncThunk('lists/getAllListOfUsers' , async(userId, {dispatch})=>{
    try {
        dispatch(showLoader())
        const allLists = await getListByUserIdApi(userId);
        return allLists;
    } catch (error) {
        toast.error("Can't fetch the lists", error.message);
    } finally {
        dispatch(hideLoader())
    }
});

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        setCurrentList(state, action) {
            state.currentList = action.payload;
        },
        clearCurrentList(state, action) {
            state.currentList = { id: null, name: 'Shopping List', items: [] };
        },
        updateItemQuantity(state, action) {
            const { itemId, change } = action.payload;
            const item = state.currentList.items.find(item => item.id === itemId);
            if (item) {
                item.quantity = Math.max(0, (item.quantity || 0) + change);
            }
            if (item && item.quantity === 0) {
                state.currentList.items = state.currentList.items.filter(i => i.id !== itemId);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createList.fulfilled, (state, action) => {
                state.currentList = action.payload;
            })
            .addCase(addItemToList.fulfilled, (state, action) => {
                if (!state.currentList.items) {
                    state.currentList.items = [];
                }
                state.currentList.items.push(action.payload);
            })
            .addCase(fetchItemsByList.fulfilled, (state, action) => {
                const list = state.lists.find((list) => list.id === action.payload.listId);
                if (list) {
                    list.items = action.payload.fetchedItems;
                }
            })
            .addCase(fetchActiveList.fulfilled, (state, action) => {
                state.currentList = action.payload;
            })
            .addCase(updateList.fulfilled, (state, action) => {
                state.currentList = action.payload.list;
                const index = state.lists.findIndex(list => list.id === action.payload.list.id);
                if (index !== -1) {
                    state.lists[index] = action.payload.list;
                }
            })
            .addCase(updateListItem.fulfilled, (state, action) => {
                const item = state.currentList.items.find(item => item.id === action.payload.itemId);
                if (item) {
                    item.quantity = action.payload.quantity;
                }
            })
            .addCase(getListByUserId.fulfilled, (state, action) => {
                state.lists = action.payload;
            });
    },
});

export const { setCurrentList, clearCurrentList, updateItemQuantity } = listsSlice.actions;
export const selectCurrentList = (state) => state.lists.currentList;
export const selectList = (state) => state.lists.lists;
export default listsSlice.reducer;
