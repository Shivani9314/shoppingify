import axios from 'axios';
const API_URL = 'https://shoppingify-production.up.railway.app';

export const fetchCategoriesApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const createCategoryApi = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/category/`, category);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const fetchItemsApi = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/items/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createItemApi = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/items/`, item);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createListApi = async (listName, user_id) => {
  try {
    const response = await axios.post(`${API_URL}/list/`, { name: listName, user_id });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const addItemToListApi = async (listItems) => {
  try {
    const response = await axios.post(`${API_URL}/list-items/`, listItems);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateListApi = async (listName, listId, is_active) => {
  try {
    const response = await axios.put(`${API_URL}/list/${listId}`, { name:listName, is_active });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchAllListItemsOfListApi = async (listId) => {
  try {
    const response = await axios.get(`${API_URL}/list-items/lists/${listId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchAllListApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/list/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getActiveListApi = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/list/${userId}/active`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateListItemApi = async (itemId, { quantity }) => {
  try {
    const response = await axios.put(`${API_URL}/list-items/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const removeItemFromListApi = async(itemId) =>{
  try {
    const response = await axios.delete(`${API_URL}/list-items/${itemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getListByUserIdApi = async(userId) =>{
  try {
    const response = await axios.get(`${API_URL}/list/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}