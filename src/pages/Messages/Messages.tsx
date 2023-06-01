import { styled, Drawer, useTheme, Box } from '@mui/material';
import React, { useEffect } from 'react';
import SidebarChat from './component/SidebarChat';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { Outlet } from 'react-router';
import { resetRoom, toggleMenu } from 'src/redux_store/room/room_slice';
const RootWrapper = styled(Box)(
  () => `
       height: 100vh;
       display: flex;
`
);
const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
);
const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 290px;
        background: ${theme.palette.common.white};
`
);
const Messages = () => {
  const theme = useTheme();
  const { isOpenMenu: mobileOpen } = useAppSelector((state) => state.roomSlice);
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    dispatch(toggleMenu());
  };
  useEffect(() => {
    return () => {
      dispatch(resetRoom());
    };
  }, []);

  console.log('render message');
  return (
    <RootWrapper my={0}>
      <DrawerWrapperMobile
        sx={{
          display: { lg: 'none', xs: 'inline-block' }
        }}
        variant='temporary'
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <SidebarChat />
      </DrawerWrapperMobile>
      <Sidebar
        sx={{
          display: { xs: 'none', lg: 'inline-block' }
        }}
      >
        <SidebarChat />
      </Sidebar>
      <Outlet />
    </RootWrapper>
  );
};

export default Messages;
