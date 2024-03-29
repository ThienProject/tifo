import React from 'react';
import { ListItemIcon, MenuItem, Typography, MenuList } from '@mui/material';
import { ImenuItem } from 'src/types/common';
import { useNavigate } from 'react-router';
import { useAppSelector } from 'src/redux_store';

const SubMenu = ({
  subMenus,
  handleClose
}: {
  subMenus: ImenuItem[];
  handleClose: (event: Event | React.SyntheticEvent) => void;
}) => {
  const navigate = useNavigate();
  const { me } = useAppSelector((state) => {
    return state.userSlice;
  });

  return (
    <MenuList>
      {subMenus.map((menuItem) => {
        if (menuItem.isAuth) {
          if (!me?.id_user) {
            return;
          }
        }
        return (
          <MenuItem
            onKeyDown={(e) => e.stopPropagation()}
            divider
            sx={{ minWidth: 200, py: 2, px: 3, display: 'flex', justifyContent: 'space-between' }}
            key={menuItem.key}
            onClick={(e) => {
              e.stopPropagation();
              const action = menuItem.action;
              if (action) {
                action();
              }
              handleClose(e);
              menuItem.to && navigate(menuItem.to);
            }}
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
                {menuItem.icon}
              </ListItemIcon>
            )}
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default SubMenu;
