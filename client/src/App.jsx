import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ShoppingHistoryPage from './pages/ShoppingHistoryPage';

function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element: <HomePage/>
    },
    {
      path: '/shoppingHistory',
      element:<ShoppingHistoryPage/>
    }
  ])
  return (
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  );
}

export default App;
