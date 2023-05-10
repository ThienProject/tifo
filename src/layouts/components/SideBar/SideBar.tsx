import React, { useEffect, useState } from 'react';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
import MenuSideBar from './SidebarMenu';
import MuiDrawer from '@mui/material/Drawer';
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
  Menu,
  MenuOpenRounded,
  Forum,
  ForumOutlined,
  TranslateOutlined
} from '@mui/icons-material';
import ModeSwitcher from 'src/theme/ModeSwitcher';
import { ImenuItem } from 'src/types/common';
import Search from 'src/pages/Search';
import Notification from 'src/pages/Notification';
import { useAppDispatch } from 'src/redux_store';
import { logout } from 'src/redux_store/user/user_slice';
import { toastMessage } from 'src/utils/toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
const SideBar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const dispatch = useAppDispatch();
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(true);
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    boxShadow: theme.shadows[1],
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
    overflowX: 'hidden',
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
      key: 'Home',
      name: t('sidebar.home'),
      icon: <HomeOutlined />,
      iconActive: <HomeRounded />,
      to: '/',
      active: window.location.pathname === '/home' ? true : false
    },
    {
      key: 'Search',
      name: t('sidebar.search'),
      icon: <SearchRounded />,
      iconActive: <SearchRounded />,
      childNode: Search,
      active: false
    },
    {
      key: 'reels',
      name: t('sidebar.reels'),
      icon: <MovieOutlined />,
      iconActive: <MovieRounded />,
      to: 'reels',
      active: window.location.pathname === '/reels' ? true : false
    },
    {
      key: 'Notification',
      name: t('sidebar.notification'),
      icon: <NotificationsNoneRounded />,
      iconActive: <NotificationsActiveRounded />,
      childNode: Notification,
      active: false,
      isAuth: true
    },
    {
      key: 'Create',
      name: t('sidebar.create'),
      icon: <AddCircleOutlineRounded />,
      iconActive: <AddCircleRounded />,
      active: window.location.pathname === '/create' ? true : false,
      isAuth: true,
      child: [
        {
          key: 'Reels',
          name: 'Reels',
          icon: <SettingsSuggestOutlined />,
          to: '/create/reels'
        },
        {
          key: 'Post',
          name: 'Post',
          icon: <SettingsSuggestOutlined />,
          to: '/create/post'
        }
      ],
      isMore: true
    },
    {
      key: 'Profile',
      name: t('sidebar.profile'),
      icon: <AccountCircleOutlined />,
      iconActive: <AccountCircleRounded />,
      to: 'profile',
      active: window.location.pathname === '/profile' ? true : false,
      isAuth: true
    },
    {
      key: 'Message',
      name: t('sidebar.chat'),
      icon: <ForumOutlined />,
      iconActive: <Forum />,
      to: 'message',
      active: window.location.pathname === '/message' ? true : false,
      isAuth: true
    },
    {
      key: 'Login',
      name: t('sidebar.login'),
      icon: <ExitToAppRounded />,
      iconActive: <ExitToAppRounded />,
      to: 'auth/login',
      active: false
    },
    {
      key: 'More',
      name: t('sidebar.more'),
      icon: <Menu />,
      iconActive: <MenuOpenRounded />,
      child: [
        {
          key: 'Setting',
          name: t('sidebar.setting'),
          icon: <SettingsSuggestOutlined />,
          to: 'setting'
        },
        {
          key: 'switchAppearance',
          name: t('sidebar.switchAppearance'),
          icon: <ModeSwitcher />
        },
        {
          key: 'switchLanguage',
          name: t('sidebar.switchLanguage'),
          icon: <TranslateOutlined />,
          action: () => {
            const newLang = i18n.language === 'en' ? 'vi' : 'en';
            changeLanguage(newLang);
            localStorage.setItem('i18nLanguage', newLang);
            toastMessage.success(t('sidebar.toast.switchLanguage'));
          }
        },
        {
          key: 'Logout',
          name: t('sidebar.logout'),
          icon: <LogoutOutlined />,
          isAuth: true,
          action: () => {
            dispatch(logout());
            navigate('/auth/login');
            toastMessage.success(t('logout'));
            // window.location.reload();
          }
        }
      ],
      active: false,
      isMore: true
    }
  ];
  const action = { handleDrawerOpen: handleDrawerOpen, handleDrawerClose: handleDrawerClose };
  const [menus, setMenus] = useState<ImenuItem[]>(menuLists);
  useEffect(() => {
    setMenus(menuLists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);
  return (
    <Box component='nav'>
      <Drawer variant='permanent' open={open}>
        <MenuSideBar menus={menus} openDrawer={open} action={action} setMenus={setMenus} />
      </Drawer>
    </Box>
  );
};

export default SideBar;
