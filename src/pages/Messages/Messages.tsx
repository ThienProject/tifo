import { styled, Drawer, useTheme, Box } from '@mui/material';
import React, { useEffect } from 'react';

import SidebarChat from './component/SidebarChat';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getChatsByIDroomThunk, getRoomsThunk } from 'src/redux_store/room/room_action';
import { useParams, useNavigate, Outlet } from 'react-router';
import { resetRoom, toggleMenu } from 'src/redux_store/room/room_slice';
import { toastMessage } from 'src/utils/toast';
import { IPayloadChats } from 'src/types/room';

const Messages = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const mobileOpen = useAppSelector((state) => state.roomSlice.isOpenMenu);
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const { id_room } = useParams();
  useEffect(() => {
    const id_user = me?.id_user;
    if (id_user) {
      const action = getRoomsThunk({ id_user, offset: 0, limit: 10 });
      dispatch(action);
    }
    return () => {
      dispatch(resetRoom());
    };
  }, []);
  useEffect(() => {
    const id_user = me?.id_user;
    const param: IPayloadChats = { offset: 0, limit: 10 };
    if (id_user) {
      param.id_user = id_user;
      if (id_room) {
        param.id_room = id_room;
      }
      if (param.id_room) {
        const action = getChatsByIDroomThunk(param);
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
      }
    }
  }, [id_room]);
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
