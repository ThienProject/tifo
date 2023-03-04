import React, { useEffect } from 'react';
import { Box, ListItemIcon, MenuItem, Popper, Typography } from '@mui/material';
import { ImenuItem } from 'src/types/common';
import { useNavigate } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import SubSidebar from './SubSidebar';
import SubMenu from './SubMenu';

const SideBarItem = ({
  item,
  setMenus,
  action
}: {
  item: ImenuItem;
  setMenus?: React.Dispatch<React.SetStateAction<ImenuItem[]>>;
  action: {
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
  };
}) => {
  const navigator = useNavigate();
  const anchorRef = React.useRef<HTMLButtonElement>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>();
  useEffect(() => {
    if (item.child || item.childNode) {
      setAnchorEl(anchorRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClosePopper = () => {
    setMenus &&
      setMenus((prev) => {
        const index = prev.findIndex((itemPrev) => itemPrev.name === item.name);
        const newMenus = [...prev.slice(0, index), { ...prev[index], active: false }, ...prev.slice(index + 1)];
        // if (newMenus[index].active === false) {
        //   newMenus[index].action.handleDrawerClose();
        // } else newMenus[index].action.handleDrawerOpen();
        return newMenus;
      });
    action.handleDrawerOpen();
  };
  return (
    <MenuItem sx={{ m: 0, p: 0 }}>
      <Box
        display={'flex'}
        ref={anchorRef}
        sx={{ color: 'text.primary', p: { xs: 1, sm: 2 }, py: 2, width: '100%' }}
        onClick={() => {
          if (item.to) {
            action?.handleDrawerOpen();
            navigator(item.to);
          } else {
            if (item.childNode) {
              if (item.active === false) {
                console.log('close draw');
                action?.handleDrawerClose();
              } else {
                console.log('open draw');
                action?.handleDrawerOpen();
              }
            }
            //always open drawer when not has childNode
            else {
              action?.handleDrawerOpen();
            }
          }
          if (setMenus) {
            setMenus((prev) => {
              const newMenus = prev.map((newItem) => {
                if (newItem.name === item.name) {
                  if (item.active === true) {
                    return { ...newItem, active: false };
                  } else {
                    return { ...newItem, active: true };
                  }
                } else return { ...newItem, active: false };
              });
              return newMenus;
            });
            console.log('đang set  menu', item.active);
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
      </Box>
      {(item.child || item.childNode) && anchorRef.current && (
        <Popper
          sx={{ zIndex: 9999 }}
          open={item.active ? item.active : false}
          anchorEl={anchorEl}
          role={undefined}
          placement={item.child ? 'top-end' : 'right'}
          transition
          disablePortal={false}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <ClickAwayListener onClickAway={handleClosePopper}>
                  <MenuList
                    sx={{ p: 0, m: 0 }}
                    autoFocusItem={item.active}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    // onKeyDown={handleListKeyDown}
                  >
                    {item.child ? <SubMenu subMenus={item.child} handleClose={handleClosePopper} /> : <SubSidebar />}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      )}
    </MenuItem>
  );
};

export default SideBarItem;
