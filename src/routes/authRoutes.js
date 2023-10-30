import React, { lazy } from 'react';

const Login = lazy(() => import('../containers/Login'));
const Register = lazy(() => import('../containers/Register'));
const AccountVerify = lazy(() => import('../containers/AccountVerify'));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/auth',
  children: [
    {
      path: '/auth/login',
      element: <Login />,
    },
    {
      path: '/auth/register',
      element: <Register />,
    },
    {
      path: '/auth/account-verify',
      element: <AccountVerify />,
    },
  ],
};

export default AuthenticationRoutes;
