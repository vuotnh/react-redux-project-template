import { ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import InventoryIcon from '@mui/icons-material/Inventory';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/dark-logo.svg';
import axiosInstance from '../../utils/axios';

function SideBar() {
  // const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // const handleOpenSideBar = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  const menuList = [
    {
      text: 'Home',
      path: '/home',
      iconComponent: (
        <InboxIcon
          sx={{
            color: location.pathname.includes('/home') ? 'white' : 'black',
            ':hover': location.pathname.includes('/home')
              ? ''
              : {
                  color: '#5D87FF',
                },
          }}
        />
      ),
    },
    {
      text: 'User',
      path: '/user',
      iconComponent: (
        <AccountCircleIcon
          sx={{
            color: location.pathname.includes('/user') ? 'white' : 'black',
            ':hover': location.pathname.includes('/user')
              ? ''
              : {
                  color: '#5D87FF',
                },
          }}
        />
      ),
    },
    {
      text: 'Category',
      path: '/category',
      iconComponent: (
        <BackupTableIcon
          sx={{
            color: location.pathname.includes('/category') ? 'white' : 'black',
            ':hover': location.pathname.includes('/category')
              ? ''
              : {
                  color: '#5D87FF',
                },
          }}
        />
      ),
    },
    {
      text: 'Product',
      path: '/product',
      iconComponent: (
        <InventoryIcon
          sx={{
            color: location.pathname.includes('/product') ? 'white' : 'black',
            ':hover': location.pathname.includes('/product')
              ? ''
              : {
                  color: '#5D87FF',
                },
          }}
        />
      ),
    },
  ];

  const logOutHandle = async () => {
    const logOutRes = await axiosInstance({
      url: `${import.meta.env.VITE_API_URL}/auth/logout`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (logOutRes.status === 204 || logOutRes.status === 200) {
      localStorage.removeItem('access_token');
      navigate('/auth/login');
    }
  };

  return (
    <div
      style={{
        width: '270px',
        minWidth: '270px',
        minHeight: '100vh',
        borderRight: '1px solid rgb(229, 234, 239)',
      }}>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <img src={logoImage} alt="" />
      </div>
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
            <ListItemIcon sx={{ marginLeft: '20px' }}>{item.iconComponent}</ListItemIcon>
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
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          minHeight: '30px',
          width: '270px',
          textAlign: 'center',
        }}>
        <button
          className="btn btn-primary"
          style={{ marginBottom: '30px' }}
          onClick={() => logOutHandle()}>
          LogOut
        </button>
      </div>
    </div>
  );
}

export default SideBar;
