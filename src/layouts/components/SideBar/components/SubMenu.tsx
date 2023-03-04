import React from 'react';
import { ListItemIcon, MenuItem, Typography, Box } from '@mui/material';
import { ImenuItem } from 'src/types/common';
import { useNavigate } from 'react-router';

const SubMenu = ({
  subMenus,
  handleClose
}: {
  subMenus?: ImenuItem[];
  handleClose: (event: Event | React.SyntheticEvent) => void;
}) => {
  const navigate = useNavigate();
  return (
    <Box>
      {subMenus?.map((menuItem) => (
        <MenuItem
          divider
          sx={{ minWidth: 200, py: 2, px: 3, display: 'flex', justifyContent: 'space-between' }}
          key={menuItem.name}
          onClick={(e) => {
            menuItem.action && menuItem.action();
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
              {/* <menuItem.icon fontSize='large' /> */}
              {menuItem.icon}
            </ListItemIcon>
          )}
        </MenuItem>
      ))}
    </Box>
  );
};

export default SubMenu;
