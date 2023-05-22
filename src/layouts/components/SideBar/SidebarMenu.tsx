import React from 'react';
import { MenuItem, MenuList } from '@mui/material';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import images from 'src/assets/images';
import { ImenuItem } from 'src/types/common';
import SideBarItem from './components/SideBarItem';
import { useAppSelector } from 'src/redux_store';
import { useTheme } from '@mui/material/styles';

const cx = classNames.bind(styles);

const Menu = ({
  menus,
  toggleDrawer,
  isOpenDrawer
}: {
  menus: ImenuItem[];
  toggleDrawer: () => void;
  isOpenDrawer: boolean;
}) => {
  const theme = useTheme();
  const { me } = useAppSelector((state) => {
    return state.userSlice;
  });
  const isLogin: boolean = me?.id_user;
  return (
    <MenuList
      sx={{
        backgroundColor: 'common.white',
        justifyContent: 'space-between',
        height: { lg: '100%', md: '100%' },
        display: { xs: 'flex', sm: 'block' }
      }}
    >
      <MenuItem
        // onKeyDown={(e) => e.stopPropagation()}
        sx={{ color: 'text.primary', ml: { xs: -1, md: 0 }, display: { xs: 'none', sm: 'block' } }}
      >
        {isOpenDrawer ? (
          <img
            className={cx('logo')}
            alt='home-icon'
            src={theme.palette.mode === 'dark' ? images.home_Logo_black : images.home_Logo_white}
          />
        ) : (
          <img style={{ height: '30px' }} className={cx('logo')} alt='home-icon' src={images.logo} />
        )}
      </MenuItem>
      {menus.map((menuItem) => {
        if (menuItem.isAuth) {
          if (isLogin) {
            return (
              <SideBarItem isOpenDrawer={isOpenDrawer} key={menuItem.key} toggleDrawer={toggleDrawer} item={menuItem} />
            );
          }
        } else {
          if (isLogin) {
            if (menuItem.key === 'Login') return;
          }
          return <SideBarItem isOpenDrawer toggleDrawer={toggleDrawer} key={menuItem.key} item={menuItem} />;
        }
      })}
    </MenuList>
  );
};
export default Menu;
