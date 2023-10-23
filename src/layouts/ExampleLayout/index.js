// import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

// ==============================|| MINIMAL LAYOUT ||============================== //

function AuthLayout() {
  return (
    <>
      {/* <Headers /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default AuthLayout;
