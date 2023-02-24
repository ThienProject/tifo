import { NavLink } from 'react-router-dom';
import React from 'react';
import { ListItemIcon, MenuItem, MenuList, Typography, Box } from '@mui/material';
// import images from 'src/assets/images';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import images from 'src/assets/images';
import MenuPopper from 'src/components/Popper';
import ModeSwitcher from 'src/theme/ModeSwitcher';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { ImenuItem } from 'src/types/common';
const cx = classNames.bind(styles);

const Menu = ({
  menus,
  setMenus
}: {
  menus: ImenuItem[];
  setMenus: React.Dispatch<React.SetStateAction<ImenuItem[]>>;
}) => {
  const subMenus = [
    {
      name: 'Settings',
      icon: <SettingsSuggestOutlinedIcon />,
      iconActive: <SettingsSuggestOutlinedIcon />,
      type: 'link'
    },
    {
      name: 'Switch appearance',
      icon: <ModeSwitcher />,
      iconActive: <ModeSwitcher />,
      type: null
    },
    {
      name: 'Logout',
      icon: <LogoutOutlinedIcon />,
      iconActive: <LogoutOutlinedIcon />,
      type: null
    }
  ];

  const MenuItemElement = ({ item }: { item: ImenuItem }) => {
    return (
      <MenuItem
        sx={{ color: 'text.primary', p: { xs: 1, sm: 2 }, py: 2, width: '100%' }}
        onClick={() => {
          setMenus((prev) => {
            const newMenus = prev.map((newItem) => {
              console.log(newItem.name, item.name);
              if (newItem.name === item.name) {
                console.log('có');
                return { ...newItem, active: true };
              } else return { ...newItem, active: false };
            });
            console.log(newMenus);
            return newMenus;
          });
        }}
      >
        <ListItemIcon
          sx={{
            color: 'text.primary',
            minWidth: 0,
            justifyContent: 'center',
            mr: { xs: 0, sm: 2 }
          }}
        >
          {item.active ? item.iconActive : item.icon}
        </ListItemIcon>
        <Typography display={{ xs: 'none', sm: 'block' }} className={cx('item-name')} variant='inherit'>
          {item.name}
        </Typography>
      </MenuItem>
    );
  };
  const SubMenuCpn = ({
    subMenus,
    handleClose
  }: {
    subMenus: ImenuItem[];
    handleClose: (event: Event | React.SyntheticEvent) => void;
  }) => {
    return (
      <Box>
        {subMenus.map((menuItem) => (
          <MenuItem
            divider
            sx={{ py: 2, px: 3, display: 'flex', justifyContent: 'space-between' }}
            key={menuItem.name}
            onClick={handleClose}
          >
            <Typography>{menuItem?.name}</Typography>
            {menuItem?.icon && (
              <ListItemIcon
                sx={{
                  color: 'text.primary',
                  minWidth: 0,
                  justifyContent: 'center'
                }}
              >
                {/* <menuItem.icon fontSize='large' /> */}
                {menuItem.icon}
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Box>
    );
  };
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
          {/* <menuItem.icon  fontSize='large' />
          <menuItem.iconActive  fontSize='large' /> */}
        </ListItemIcon>
      </MenuItem>
      {menus.map((menuItem) =>
        !menuItem.isChild ? (
          menuItem.to ? (
            <NavLink key={menuItem.name} className={(nav) => cx('navLink', { active: nav.isActive })} to={menuItem.to}>
              <MenuItemElement item={menuItem} />
            </NavLink>
          ) : (
            <MenuItemElement key={menuItem.name} item={menuItem} />
          )
        ) : (
          <MenuPopper
            sx={{ display: { xs: 'none', sm: 'block' } }}
            key={menuItem.name}
            activeIcon={<MenuItemElement item={menuItem} />}
            content={(handleClose: (event: Event | React.SyntheticEvent) => void) => (
              <SubMenuCpn subMenus={subMenus} handleClose={handleClose} />
            )}
          ></MenuPopper>
        )
      )}
    </MenuList>
  );
};
export { Menu };
