import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCategoryApi, fetchCategoriesApi } from '../Api';
import { hideLoader, showLoader } from './loaderSlice';
import toast from 'react-hot-toast';

const initialState = {
    categories : []
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories' , async(_,{dispatch} )=>{
   try {
    dispatch(showLoader());
    const categoriesData = await fetchCategoriesApi();
    return categoriesData;
   } catch (error) {
    toast.error("Cant fetch the Categories" , error.message);
   }finally{
    dispatch(hideLoader());
   }
})

export const createCategory = createAsyncThunk('categories/newCategory',async(categoryName,{dispatch}) =>{
   try {
    dispatch(showLoader());
    const newCategory = await createCategoryApi(categoryName);
    toast.success("Created Category Successfully")
    return newCategory;
   } catch (error) {
    toast.error("Cant create new category");
   }finally{
    dispatch(hideLoader());
   }
})


const categorySlice = createSlice({
    name : "categories",
    initialState,
    reducers: {},
    extraReducers : (builder) =>{
        builder
        .addCase(fetchCategories.fulfilled, (state,action) =>{
            state.categories = action.payload;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            console.log('Payload:', action.payload);
            state.categories = [action.payload, ...state.categories];
        });
    }
})


export const selectCategories = (state) => state.categories.categories;

export default categorySlice.reducer;