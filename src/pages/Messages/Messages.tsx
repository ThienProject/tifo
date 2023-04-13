import { styled, Drawer, useTheme, Box } from '@mui/material';
import React, { useEffect } from 'react';

import SidebarChat from './component/SidebarChat';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getChatsByIDGroupThunk, getGroupsThunk } from 'src/redux_store/group/group_action';
import { useParams, useNavigate, Outlet } from 'react-router';
import { resetGroup, toggleMenu } from 'src/redux_store/group/group_slice';
import { toastMessage } from 'src/utils/toast';

const Messages = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mobileOpen = useAppSelector((state) => state.groupSlice.isOpenMenu);
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const { id_group } = useParams();
  useEffect(() => {
    console.log('get groups');
    const id_user = me.id_user;
    if (id_user) {
      const action = getGroupsThunk({ id_user, offset: 0, limit: 10 });
      dispatch(action);
    }
    return () => {
      console.log('unmount message');
      dispatch(resetGroup());
    };
  }, []);

  useEffect(() => {
    if (id_group) {
      // const index = groups.groups.findIndex((item: any) => item.id_group === id_group);
      // console.log(groups.groups);
      console.log('get chats');
      const action = getChatsByIDGroupThunk({ id_group: id_group, offset: 0, limit: 10 });
      dispatch(action)
        .unwrap()
        .then((data) => {
          if (!data.user && !data.chats) {
            toastMessage.error('Sometime is error !');
          }
        })
        .catch(() => {
          navigate('/notfound', { replace: true });
        });
      // else {
      //   navigate('/message');
      // }
    }
  }, [id_group]);
  const handleDrawerToggle = () => {
    dispatch(toggleMenu());
  };

  const RootWrapper = styled(Box)(
    () => `
       height: calc(100vh);
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
