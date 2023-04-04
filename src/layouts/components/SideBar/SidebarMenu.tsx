import React from 'react';
import { ListItemIcon, MenuItem, MenuList } from '@mui/material';
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
  setMenus,
  action
}: {
  menus: ImenuItem[];
  setMenus: React.Dispatch<React.SetStateAction<ImenuItem[]>>;
  action: {
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
  };
}) => {
  const theme = useTheme();
  const { me } = useAppSelector((state) => {
    return state.userSlice;
  });
  const isLogin: boolean = me?.id_user;
  return (
    <MenuList
      component='nav'
      sx={{
        justifyContent: 'space-between',
        display: { xs: 'flex', sm: 'block' }
      }}
    >
      <MenuItem
        onKeyDown={(e) => e.stopPropagation()}
        sx={{ color: 'text.primary', display: { xs: 'none', sm: 'block' } }}
      >
        <img
          className={cx('logo')}
          alt='home-icon'
          src={theme.palette.mode === 'dark' ? images.home_Logo_black : images.home_Logo_white}
        />
      </MenuItem>
      {menus.map((menuItem) => {
        if (menuItem.isAuth) {
          if (isLogin) {
            return <SideBarItem action={action} setMenus={setMenus} key={menuItem.key} item={menuItem} />;
          }
        } else {
          if (isLogin) {
            if (menuItem.key === 'Login') return;
          }
          return <SideBarItem action={action} setMenus={setMenus} key={menuItem.key} item={menuItem} />;
        }
      })}
    </MenuList>
  );
};
export default Menu;
