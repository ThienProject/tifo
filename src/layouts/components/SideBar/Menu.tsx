import React from 'react';
import { NavLink } from 'react-router-dom';
// import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
// import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon, MenuItem, MenuList, Typography, Box } from '@mui/material';
// import images from 'src/assets/images';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import { useTheme } from '@mui/styles';
import images from 'src/assets/images';
import MenuPopper from 'src/components/MenuPopper';
const cx = classNames.bind(styles);

const MenuPhone = () => {
  const subMenus = [
    {
      name: 'settings',
      icon: <HomeOutlinedIcon />,
      iconActive: <HomeRoundedIcon />,
      type: 'link'
    },
    {
      name: 'Switch appearance',
      icon: <HomeOutlinedIcon />,
      iconActive: <HomeRoundedIcon />,
      type: null
    },
    {
      name: 'Logout',
      icon: <HomeOutlinedIcon />,
      iconActive: <HomeRoundedIcon />,
      type: null
    }
  ];
  const menuLists = [
    {
      name: 'Home',
      icon: <HomeOutlinedIcon />,
      iconActive: <HomeRoundedIcon />,
      type: 'link'
    },
    {
      name: 'Search',
      icon: <SearchRoundedIcon />,
      iconActive: <SearchRoundedIcon />,
      type: null
    },
    {
      name: 'Reels',
      icon: <MovieOutlinedIcon />,
      iconActive: <MovieRoundedIcon />,
      type: 'link'
    },
    {
      name: 'Notifications',
      icon: <NotificationsNoneRoundedIcon />,
      iconActive: <NotificationsActiveRoundedIcon />,
      type: null
    },
    {
      name: 'Create',
      icon: <AddCircleOutlineRounded />,
      iconActive: <AddCircleRoundedIcon />,
      type: null
    },
    {
      name: 'Profile',
      icon: <AccountCircleOutlinedIcon />,
      iconActive: <AccountCircleRoundedIcon />,
      type: 'link'
    },
    {
      name: 'Profile',
      icon: <AccountCircleOutlinedIcon />,
      iconActive: <AccountCircleRoundedIcon />,
      type: 'link'
    },
    {
      name: 'More',
      icon: <MenuIcon />,
      iconActive: <MenuIcon />,
      type: null,
      isChild: true
    }
  ];
  interface ImenuItem {
    name: string;
    icon: React.ReactNode;
    iconActive: React.ReactNode;
    type?: string | null;
    isChild?: boolean | null;
  }

  const theme = useTheme();
  const MenuItemElement = ({ item }: { item: ImenuItem }) => {
    return (
      <MenuItem sx={{ color: 'text.primary', py: 2, width: '100%' }}>
        <ListItemIcon
          sx={{
            color: 'text.primary',
            minWidth: 0,
            justifyContent: 'center',
            mr: 1
          }}
        >
          {item.icon}
          {/* <item.icon className={cx('iconActive')} fontSize='large' />
          <item.iconActive className={cx('icon')} fontSize='large' /> */}
        </ListItemIcon>
        <Typography className={cx('item-name')} pl={1} variant='inherit'>
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
    handleClose: React.MouseEventHandler<HTMLLIElement> | undefined;
  }) => {
    return (
      <Box>
        {subMenus.map((menuItem) => (
          <MenuItem key={menuItem.name} onClick={handleClose}>
            <Typography>{menuItem?.name}</Typography>
            {menuItem?.icon && (
              <ListItemIcon
                sx={{
                  color: 'text.primary',
                  minWidth: 0,
                  justifyContent: 'center',
                  mr: 1
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
    <MenuList component='nav'>
      <MenuItem sx={{ color: 'text.primary' }}>
        <ListItemIcon
          sx={{
            color: 'text.primary',
            minWidth: 0,
            justifyContent: 'center',
            mr: 3
          }}
        >
          <img className={cx('logo-only', 'iconActive')} alt='home-icon' src={images.only_logo_white_background} />
          <img className={cx('logo', 'iconActive')} alt='home-icon' src={images.black_only_word} />
          {/* <menuItem.icon className={cx('iconActive')} fontSize='large' />
          <menuItem.iconActive className={cx('icon')} fontSize='large' /> */}
        </ListItemIcon>
      </MenuItem>
      {menuLists.map((menuItem, index) =>
        !menuItem.isChild ? (
          <NavLink key={index} className={(nav) => cx('navLink', { active: nav.isActive })} to={'/profile'}>
            <MenuItemElement  item={menuItem} />
          </NavLink>
        ) : (
          <MenuPopper
            key={index}
            activeIcon={<MenuItemElement item={menuItem} />}
            content={(handleClose: any) => <SubMenuCpn subMenus={subMenus} handleClose={handleClose} />}
          ></MenuPopper>
        )
      )}

      {/* <ModeSwitcher /> */}
    </MenuList>
  );
};
export { MenuPhone };
