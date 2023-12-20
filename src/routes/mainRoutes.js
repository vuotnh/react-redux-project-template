import React, { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';

const HomePage = lazy(() => import('../containers/HomePage'));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <HomePage />,
    },
  ],
};

export default MainRoutes;
