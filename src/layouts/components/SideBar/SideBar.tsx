import React, { useState } from 'react';
import { CSSObject, Theme, useTheme } from '@mui/material/styles';
import { Drawer } from '@mui/material';
import MenuSideBar from './SidebarMenu';

import { ImenuItem } from 'src/types/common';

const drawerWidth = 240;

const SideBar = ({ menus }: { menus: ImenuItem[] }) => {
  const [isOpen, setOpen] = useState(true);
  const theme = useTheme();
  const openedMixin = (theme: Theme): CSSObject => ({
    boxShadow: theme.shadows[1],
    [theme.breakpoints.up('lg')]: {
      '@keyframes openMixin': {
        from: { width: `calc(${theme.spacing(7)} + 1px)` },
        to: { width: drawerWidth }
      },
      animationName: 'openMixin',
      animationDuration: '0.2s'
    },
    overflowX: 'hidden'
  });
  const closedMixin = (theme: Theme): CSSObject => ({
    [theme.breakpoints.up('lg')]: {
      overflowX: 'hidden',
      height: '100%',
      '@keyframes closeMixin': {
        from: { width: drawerWidth },
        to: { width: `calc(${theme.spacing(7)} + 1px)` }
      },
      animationName: 'closeMixin',
      animationDuration: '0.2s'
    },
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  });
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Drawer
      variant='permanent'
      sx={{
        '& .MuiDrawer-paper': {
          overflowX: 'hidden',
          [theme.breakpoints.up('lg')]: {
            width: isOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
            ...(!isOpen && closedMixin(theme)),
            ...(isOpen && openedMixin(theme))
          },
          [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`
          }
        }
      }}
      anchor={'left'}
    >
      <MenuSideBar isOpenDrawer={isOpen} menus={menus} toggleDrawer={toggleDrawer} />
    </Drawer>
  );
};

export default SideBar;
