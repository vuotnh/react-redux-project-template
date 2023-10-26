import React, { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';

const HomePage = lazy(() => import('../containers/HomePage'));
const UserPage = lazy(() => import('../containers/UserPage'));

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
  ],
};

export default AuthenticationRoutes;
