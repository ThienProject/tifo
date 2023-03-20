import React from 'react';
import { ListItemIcon, MenuItem, MenuList } from '@mui/material';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import images from 'src/assets/images';
import { ImenuItem } from 'src/types/common';
import SideBarItem from './components/SideBarItem';
import { useAppSelector } from 'src/redux_store';
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
      <MenuItem sx={{ color: 'text.primary', pl: 1, display: { xs: 'none', sm: 'block' } }}>
        <ListItemIcon
          sx={{
            color: 'text.primary',
            minWidth: 0,
            justifyContent: 'center',
            ml: 3
          }}
        >
          <img className={cx('logo-only', 'iconActive')} alt='home-icon' src={images.only_logo_white_background} />
          <img className={cx('logo', 'iconActive')} alt='home-icon' src={images.black_only_word} />
        </ListItemIcon>
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
