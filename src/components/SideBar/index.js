import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../../containers/HomePage';
import UserPage from '../../containers/UserPage';

function SideBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenSideBar = () => {
    setMobileOpen(!mobileOpen);
  };
  const menuList = [
    {
      text: 'Home',
      path: '/home',
      component: <HomePage />,
    },
    {
      text: 'User',
      path: '/user',
      component: <UserPage />,
    },
    {
      text: 'Product',
      path: '/product',
      component: <HomePage />,
    },
  ];

  return (
    <div
      style={{
        width: '270px',
        minHeight: '100vh',
        borderRight: '1px solid rgb(229, 234, 239)',
      }}>
      <Toolbar />
      {/* <Divider /> */}
      {menuList.map((item) => (
        <ListItem
          key={item.text}
          disablePadding
          selected={location.pathname.includes(item.path)}
          sx={{
            backgroundColor: 'transparent !important',
          }}>
          <ListItemButton
            onClick={() => navigate(item.path)}
            sx={{
              paddingLeft: 0,
              marginLeft: '16px',
              paddingRight: 0,
              marginRight: '16px',
              borderRadius: '10px',
              backgroundColor: location.pathname.includes(item.path) ? '#5D87FF' : 'transparent',
              ':hover': location.pathname.includes(item.path)
                ? {
                    backgroundColor: location.pathname.includes(item.path)
                      ? '#5D87FF'
                      : 'transparent',
                  }
                : {
                    backgroundColor: 'rgba(93,135,255,0.1)',
                  },
            }}>
            <ListItemIcon sx={{ marginLeft: '20px' }}>
              <InboxIcon
                sx={{
                  color: location.pathname.includes(item.path) ? 'white' : 'black',
                  ':hover': location.pathname.includes(item.path)
                    ? ''
                    : {
                        color: '#5D87FF',
                      },
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: location.pathname.includes(item.path) ? 'white' : 'black',
                ':hover': location.pathname.includes(item.path)
                  ? ''
                  : {
                      color: '#5D87FF',
                    },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </div>
  );
}

export default SideBar;
