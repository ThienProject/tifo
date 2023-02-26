import React from 'react';
import { ListItemIcon, MenuItem, MenuList, Box } from '@mui/material';
// import images from 'src/assets/images';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import images from 'src/assets/images';
import Popper from 'src/components/Popper';
import { ImenuItem } from 'src/types/common';
import SideBarItem from './components/SideBarItem';
import SubMenu from './components/SubMenu';
const cx = classNames.bind(styles);

const Menu = ({
  menus,
  setMenus,
  handleToggleDrawer,
  handleSetOpenDrawer
}: {
  menus: ImenuItem[];
  setMenus: React.Dispatch<React.SetStateAction<ImenuItem[]>>;
  handleToggleDrawer: () => boolean;
  handleSetOpenDrawer: (isOpen: boolean) => void;
}) => {
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
        !menuItem.child && !menuItem.element ? (
          <SideBarItem
            handleSetOpenDrawer={handleSetOpenDrawer}
            setMenus={setMenus}
            key={menuItem.name}
            item={menuItem}
          />
        ) : (
          <Box key={menuItem.name}>
            <Popper
              placement={'right'}
              sx={{ display: { xs: 'none', sm: 'block' } }}
              isOpen={menuItem.active || false}
              name={menuItem.name}
              setMenus={setMenus}
              activeIcon={<SideBarItem handleToggleDrawer={handleToggleDrawer} item={menuItem} />}
              content={(handleClose: (event: Event | React.SyntheticEvent) => void) => (
                <Box>
                  {menuItem.element && menuItem.element}
                  <SubMenu subMenus={menuItem.child} handleClose={handleClose} />
                </Box>
              )}
            ></Popper>
          </Box>
        )
      )}
    </MenuList>
  );
};
export { Menu };
