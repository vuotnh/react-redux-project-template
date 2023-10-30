import React, { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';

const HomePage = lazy(() => import('../containers/HomePage'));
const UserPage = lazy(() => import('../containers/UserPage'));
const CategoryPage = lazy(() => import('../containers/CategoryPage'));
const ProductPage = lazy(() => import('../containers/ProductPage'));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '/user',
      element: <UserPage />,
    },
    {
      path: '/category',
      element: <CategoryPage />,
    },
    {
      path: '/product',
      element: <ProductPage />,
    },
  ],
};

export default AuthenticationRoutes;
