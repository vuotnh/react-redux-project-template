import React, { lazy } from 'react';

const Login = lazy(() => import('../containers/Login'));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/auth',
  children: [
    {
      path: '/auth/login',
      element: <Login />,
    },
  ],
};

export default AuthenticationRoutes;
