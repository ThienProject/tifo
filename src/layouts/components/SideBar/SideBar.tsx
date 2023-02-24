import React from 'react';
// import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
// import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { styled, CSSObject, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { MenuPhone } from './Menu';
import MuiDrawer from '@mui/material/Drawer';
// import { useTheme } from '@emotion/react';
// import styles from './SideBar.module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);

const SideBar = () => {
  // const theme = useTheme();
  const drawerWidth = 240;
  // const [open, setOpen] = React.useState(true);
  const [open] = React.useState(true);
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  });
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    }),
    [theme.breakpoints.down('md')]: {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    }
  }));
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box component='nav'>
      <Drawer variant='permanent' open={open}>
        <MenuPhone />
      </Drawer>
      {/* <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
        open
      >
        <MenuDesktop />
      </Drawer> */}
    </Box>
  );
};

export default SideBar;
