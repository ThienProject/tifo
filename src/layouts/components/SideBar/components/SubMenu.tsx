import React from 'react';
import { ListItemIcon, MenuItem, Typography, Box } from '@mui/material';
import { ImenuItem } from 'src/types/common';

const SubMenu = ({
  subMenus,
  handleClose
}: {
  subMenus?: ImenuItem[];
  handleClose: (event: Event | React.SyntheticEvent) => void;
}) => {
  return (
    <Box>
      {subMenus?.map((menuItem) => (
        <MenuItem
          divider
          sx={{ py: 2, px: 3, display: 'flex', justifyContent: 'space-between' }}
          key={menuItem.name}
          onClick={(e) => {
            console.log('có');
            menuItem.action && menuItem.action();
            handleClose(e);
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
