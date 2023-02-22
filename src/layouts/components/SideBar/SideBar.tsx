import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import DraftsIcon from '@mui/icons-material/Drafts';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { ListItemIcon, MenuItem, MenuList, Typography, Drawer } from '@mui/material';
import ModeSwitcher from 'src/theme/ModeSwitcher';
import images from 'src/assets/images';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const SideBar = () => {
  return (
    <Box className={cx('container')}>
      <Drawer variant='permanent' open={false}>
        <img className={cx('logo')} alt='home-icon' src={images.black_only_word} />
        <MenuList component='nav'>
          <NavLink className={(nav) => cx('navLink', { active: nav.isActive })} to={'/'}>
            <MenuItem sx={{ p: 2, color: 'common.black' }}>
              <ListItemIcon sx={{ color: 'common.black' }}>
                <HomeIcon className={cx('iconActive')} fontSize='large' />
                <HomeOutlinedIcon className={cx('icon')} fontSize='large' />
              </ListItemIcon>
              <Typography className={cx('item-name')} pl={1} variant='inherit'>
                Home
              </Typography>
            </MenuItem>
          </NavLink>

          <NavLink className={cx('navLink')} to={'/messages'}>
            <MenuItem sx={{ p: 2, color: 'common.black' }}>
              <ListItemIcon sx={{ color: 'common.black' }}>
                <PriorityHighIcon fontSize='large' />
              </ListItemIcon>
              <Typography className={cx('item-name')} pl={1} variant='inherit'>
                Messages
              </Typography>
            </MenuItem>
          </NavLink>

          <NavLink className={cx('navLink')} to={'/profile'}>
            <MenuItem sx={{ p: 2, color: 'common.black' }}>
              <ListItemIcon sx={{ color: 'common.black' }}>
                <DraftsIcon fontSize='large' />
              </ListItemIcon>
              <Typography className={cx('item-name')} pl={1} variant='inherit'>
                Profile
              </Typography>
            </MenuItem>
          </NavLink>
        </MenuList>
        <ModeSwitcher />
      </Drawer>
    </Box>
  );
};

export default SideBar;
