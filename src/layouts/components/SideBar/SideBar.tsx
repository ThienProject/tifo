import React, { useState } from 'react';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
import MenuSideBar from './SidebarMenu';
import MuiDrawer from '@mui/material/Drawer';
// import { useTheme } from '@emotion/react';
// import styles from './SideBar.module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);
import {
  HomeOutlined,
  HomeRounded,
  AccountCircleOutlined,
  AccountCircleRounded,
  NotificationsNoneRounded,
  NotificationsActiveRounded,
  AddCircleRounded,
  MovieOutlined,
  SearchRounded,
  AddCircleOutlineRounded,
  ExitToAppRounded,
  SettingsSuggestOutlined,
  LogoutOutlined,
  MovieRounded,
  Menu
} from '@mui/icons-material';

import ModeSwitcher from 'src/theme/ModeSwitcher';
import { ImenuItem } from 'src/types/common';
import Search from 'src/pages/Search';
import Notification from 'src/pages/Notification';
import { useAppDispatch } from 'src/redux_store';
import { logout } from 'src/redux_store/user/user_slice';
const SideBar = () => {
  // const { me } = useAppSelector((state) => {
  //   return state.userSlice;
  // });
  const dispatch = useAppDispatch();
  // const theme = useTheme();
  const drawerWidth = 240;
  // const [open, setOpen] = React.useState(true);
  const [open, setOpen] = React.useState(true);
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuLists: ImenuItem[] = [
    {
      name: 'Home',
      icon: <HomeOutlined />,
      iconActive: <HomeRounded />,
      to: '/',
      active: window.location.pathname === '/home' ? true : false
    },
    {
      name: 'Search',
      icon: <SearchRounded />,
      iconActive: <SearchRounded />,
      childNode: <Search />,
      active: false
    },
    {
      name: 'Reels',
      icon: <MovieOutlined />,
      iconActive: <MovieRounded />,
      to: 'reels',
      active: window.location.pathname === '/reels' ? true : false
    },
    {
      name: 'Notifications',
      icon: <NotificationsNoneRounded />,
      iconActive: <NotificationsActiveRounded />,
      childNode: <Notification />,
      active: false,
      isAuth: true
    },
    {
      name: 'Create',
      icon: <AddCircleOutlineRounded />,
      iconActive: <AddCircleRounded />,
      to: 'create',
      active: window.location.pathname === '/create' ? true : false,
      isAuth: true
    },
    {
      name: 'Profile',
      icon: <AccountCircleOutlined />,
      iconActive: <AccountCircleRounded />,
      to: 'profile',
      active: window.location.pathname === '/profile' ? true : false,
      isAuth: true
    },
    {
      name: 'Login',
      icon: <ExitToAppRounded />,
      iconActive: <ExitToAppRounded />,
      to: 'auth/login',
      active: false
    },
    {
      name: 'More',
      icon: <Menu />,
      child: [
        {
          name: 'Settings',
          icon: <SettingsSuggestOutlined />,
          to: 'setting'
        },
        {
          name: 'Switch appearance',
          icon: <ModeSwitcher />
        },
        {
          name: 'Logout',
          icon: <LogoutOutlined />,
          isAuth: true,
          action: () => {
            dispatch(logout());
          }
        }
      ],
      active: false,
      isMore: true
    }
  ];
  const action = { handleDrawerOpen: handleDrawerOpen, handleDrawerClose: handleDrawerClose };
  const [menus, setMenus] = useState<ImenuItem[]>(menuLists);
  return (
    <Box component='nav'>
      <Drawer variant='permanent' open={open}>
        <MenuSideBar menus={menus} action={action} setMenus={setMenus} />
      </Drawer>
    </Box>
  );
};

export default SideBar;
