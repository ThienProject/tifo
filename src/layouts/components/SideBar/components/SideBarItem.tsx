import React from 'react';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import { ImenuItem } from 'src/types/common';
import { useNavigate } from 'react-router-dom';

const SideBarItem = ({
  item,
  setMenus,
  handleToggleDrawer,
  handleSetOpenDrawer
}: {
  item: ImenuItem;
  setMenus?: React.Dispatch<React.SetStateAction<ImenuItem[]>>;
  handleToggleDrawer?: () => boolean;
  handleSetOpenDrawer?: (isOpen: boolean) => void;
}) => {
  const navigator = useNavigate();
  return (
    <MenuItem
      sx={{ color: 'text.primary', p: { xs: 1, sm: 2 }, py: 2, width: '100%' }}
      onClick={() => {
        let isOpenDrawer = false;
        if (item.to) {
          handleSetOpenDrawer && handleSetOpenDrawer(true);
          navigator(item.to);
        }
        if (handleToggleDrawer && !item.child) {
          isOpenDrawer = handleToggleDrawer();
          if (isOpenDrawer) {
            setMenus &&
              setMenus((prev) => {
                const newMenus = prev.map((newItem) => {
                  return { ...newItem, active: false };
                });
                return newMenus;
              });
          }
        }
        if (setMenus) {
          setMenus((prev) => {
            const newMenus = prev.map((newItem) => {
              if (newItem.name === item.name) {
                return { ...newItem, active: true };
              } else return { ...newItem, active: false };
            });
            return newMenus;
          });
        }
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
      <Typography display={{ xs: 'none', sm: 'block' }} variant='inherit'>
        {item.name}
      </Typography>
    </MenuItem>
  );
};

export default SideBarItem;
