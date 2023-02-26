import React, { useState } from 'react';
// import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
// import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Menu } from './Menu';
import MuiDrawer from '@mui/material/Drawer';
// import { useTheme } from '@emotion/react';
// import styles from './SideBar.module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import ModeSwitcher from 'src/theme/ModeSwitcher';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { ImenuItem } from 'src/types/common';
import Search from 'src/pages/Search';
import Notification from 'src/pages/Notification';
const SideBar = () => {
  // const theme = useTheme();
  const drawerWidth = 240;
  // const [open, setOpen] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  const handleToggleDrawer = () => {
    let isOpenDrawer = false;
    console.log('Toggle drawer', !open);
    setOpen((prev) => {
      isOpenDrawer = !prev;
      return isOpenDrawer;
    });
    return isOpenDrawer;
  };
  const handleSetOpenDrawer = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  const menuLists = [
    {
      name: 'Home',
      icon: <HomeOutlinedIcon />,
      iconActive: <HomeRoundedIcon />,
      to: '/',
      active: true
    },
    {
      name: 'Search',
      icon: <SearchRoundedIcon />,
      iconActive: <SearchRoundedIcon />,
      element: <Search />,
      active: false
    },
    {
      name: 'Reels',
      icon: <MovieOutlinedIcon />,
      iconActive: <MovieRoundedIcon />,
      to: 'reels',
      active: false
    },
    {
      name: 'Notifications',
      icon: <NotificationsNoneRoundedIcon />,
      iconActive: <NotificationsActiveRoundedIcon />,
      element: <Notification />,
      active: false
    },
    {
      name: 'Create',
      icon: <AddCircleOutlineRounded />,
      iconActive: <AddCircleRoundedIcon />,
      to: 'create',
      active: false,
      isLogin: true
    },
    {
      name: 'Profile',
      icon: <AccountCircleOutlinedIcon />,
      iconActive: <AccountCircleRoundedIcon />,
      to: 'profile',
      active: false,
      isLogin: false
    },
    {
      name: 'Login',
      icon: <ExitToAppRoundedIcon />,
      iconActive: <ExitToAppRoundedIcon />,
      to: 'auth/login',
      active: false,
      isLogin: false
    },
    {
      name: 'More',
      icon: <MenuIcon />,
      iconActive: <MenuIcon />,
      child: [
        {
          name: 'Settings',
          icon: <SettingsSuggestOutlinedIcon />,
          iconActive: <SettingsSuggestOutlinedIcon />,
          type: 'link'
        },
        {
          name: 'Switch appearance',
          icon: <ModeSwitcher />,
          iconActive: <ModeSwitcher />
        },
        {
          name: 'Logout',
          icon: <LogoutOutlinedIcon />,
          iconActive: <LogoutOutlinedIcon />
        }
      ],
      active: false,
      isMore: true
    }
  ];
  const [menus, setMenus] = useState<ImenuItem[]>(menuLists);
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
  });
  const openedMixinPhone = (theme: Theme): CSSObject => ({
    width: '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    position: 'fixed',
    bottom: 0,
    height: 50,
    overflowY: 'hidden'
  });
  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  });
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    }),
    [theme.breakpoints.down('md')]: {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    },
    [theme.breakpoints.down('sm')]: {
      ...openedMixinPhone(theme),
      '& .MuiDrawer-paper': {
        ...openedMixinPhone(theme),
        position: 'absolute'
      }
    }
  }));
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box component='nav'>
      <Drawer variant='permanent' open={open}>
        <Menu
          handleSetOpenDrawer={handleSetOpenDrawer}
          handleToggleDrawer={handleToggleDrawer}
          menus={menus}
          setMenus={setMenus}
        />
      </Drawer>
    </Box>
  );
};

export default SideBar;
