import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  mainComponent: {
    display: 'flex',
    width: '100%',
  },
}));

function MainLayout() {
  const classes = useStyles();
  return (
    <div className={classes.mainComponent}>
      <Outlet />
    </div>
  );
}

export default MainLayout;
