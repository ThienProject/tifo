import React, { useEffect, useRef, useState } from 'react';
import { Box, ListItemIcon, MenuItem, Typography, ClickAwayListener, Paper } from '@mui/material';
import { ImenuItem } from 'src/types/common';
import { useLocation, useNavigate } from 'react-router-dom';
import SubMenu from './SubMenu';
import DialogSidebar from '../../DialogSidebar';

const SideBarItem = ({
  item,
  isOpenDrawer,
  toggleDrawer
}: {
  item: ImenuItem;
  isOpenDrawer: boolean;
  setMenus?: React.Dispatch<React.SetStateAction<ImenuItem[]>>;
  toggleDrawer: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemRef = useRef<HTMLElement>(null);
  const [openMenu, setMenu] = useState(false);
  const [position, setPosition] = useState<any | undefined>();
  useEffect(() => {
    if (itemRef?.current) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { top } = itemRef.current?.getBoundingClientRect();
      setPosition({ top });
    }
  }, [itemRef?.current]);
  return (
    <MenuItem onKeyDown={(e) => e.stopPropagation()} sx={{ m: 0, p: 0, position: 'relative' }}>
      <Box
        ref={itemRef}
        display={'flex'}
        onClick={() => {
          if (item.to) {
            navigate(item.to);
          } else {
            if (item.childNode) {
              toggleDrawer && toggleDrawer();
              setMenu((prev) => !prev);
            }
            if (item.child) {
              setMenu((prev) => !prev);
            }
          }
        }}
        sx={{ color: 'text.primary', ml: 0.5, p: { xs: 1, sm: 2 }, py: 2, width: '100%', position: 'relative' }}
      >
        <ListItemIcon
          sx={{
            color: 'text.primary',
            minWidth: 0,
            justifyContent: 'center',
            pr: { xs: 0, sm: 2 },
            mr: 1
          }}
        >
          {item.to === location.pathname && isOpenDrawer ? item.iconActive : item.icon}
        </ListItemIcon>
        <Typography display={{ xs: 'none', sm: 'block' }} variant='inherit'>
          {item.name}
        </Typography>
      </Box>
      <Box>
        {item.child
          ? openMenu && (
              <ClickAwayListener
                onClickAway={() => {
                  setMenu(false);
                }}
              >
                <Box
                  sx={{
                    zIndex: 1201,
                    position: 'fixed',
                    // bottom: 20
                    left: 40,
                    top: position?.top,
                    transform: 'translateY(-100%)'

                    // bottom: position?.top + 'px'
                  }}
                >
                  <Paper>
                    <SubMenu
                      subMenus={item.child}
                      handleClose={() => {
                        setMenu(false);
                      }}
                    />
                  </Paper>
                </Box>
              </ClickAwayListener>
            )
          : item.childNode &&
            openMenu && (
              <DialogSidebar
                handleClose={() => {
                  setMenu(false);
                  toggleDrawer();
                }}
              >
                {
                  <item.childNode
                    handleClose={() => {
                      setMenu(false);
                      toggleDrawer();
                    }}
                  />
                }
              </DialogSidebar>
            )}
      </Box>
    </MenuItem>
  );
};

export default SideBarItem;
