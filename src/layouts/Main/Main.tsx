import Grid from '@mui/material/Grid';
import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import SideBar from '../components/SideBar';
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
  TranslateOutlined,
  PostAdd,
  MissedVideoCallOutlined
} from '@mui/icons-material';
import { t } from 'i18next';
import Search from 'src/pages/Search';
import Notification from 'src/pages/Notification';
import { logout } from 'src/redux_store/user/user_slice';
import { toastMessage } from 'src/utils/toast';
import ModeSwitcher from 'src/theme/ModeSwitcher';
import { ImenuItem } from 'src/types/common';
import { useAppDispatch } from 'src/redux_store';
import { useTranslation } from 'react-i18next';

const MainLayout = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const dispatch = useAppDispatch();
  const menuLists: ImenuItem[] = [
    {
      key: 'Home',
      name: t('sidebar.home'),
      icon: <HomeOutlined />,
      iconActive: <HomeRounded />,
      to: '/'
    },
    {
      key: 'Search',
      name: t('sidebar.search'),
      icon: <SearchRounded />,
      iconActive: <SearchRounded />,
      childNode: Search
    },
    {
      key: 'reels',
      name: t('sidebar.reels'),
      icon: <MovieOutlined />,
      iconActive: <MovieRounded />,
      to: '/reels'
    },
    {
      key: 'Notification',
      name: t('sidebar.notification'),
      icon: <NotificationsNoneRounded />,
      iconActive: <NotificationsActiveRounded />,
      childNode: Notification,
      isAuth: true
    },
    {
      key: 'Create',
      name: t('sidebar.create'),
      icon: <AddCircleOutlineRounded />,
      iconActive: <AddCircleRounded />,
      isAuth: true,
      child: [
        {
          key: 'Reels',
          name: t('common.reel'),
          icon: <MissedVideoCallOutlined />,
          to: '/create/reels'
        },
        {
          key: 'Post',
          name: t('common.post'),
          icon: <PostAdd />,
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
      to: '/profile',
      isAuth: true
    },
    {
      key: 'Message',
      name: t('sidebar.chat'),
      icon: <ForumOutlined />,
      iconActive: <Forum />,
      to: '/message',
      isAuth: true
    },
    {
      key: 'Login',
      name: t('sidebar.login'),
      icon: <ExitToAppRounded />,
      iconActive: <ExitToAppRounded />,
      to: '/auth/login'
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
      isMore: true
    }
  ];
  return (
    <Grid container sx={{ mb: { xs: '56px', md: 0 } }}>
      <Grid item xs={0} sm={1} md={3} lg={2.4}>
        <SideBar menus={menuLists} />
      </Grid>
      <Grid item xs={12} sm={11} md={9} lg={9.6}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
