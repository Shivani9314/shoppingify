import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '../slices/categorySlice';
import itemsReducer from '../slices/itemsSlice'
import listReducer from '../slices/listSlice'
import loaderReducer from '../slices/loaderSlice'

export const store = configureStore({
    reducer:{
       categories : categoryReducer,
       items:itemsReducer,
       lists:listReducer,
       loader:loaderReducer
    }})