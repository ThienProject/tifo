import { styled, Drawer, useTheme, Box, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChatBox from './component/ChatBox';
import SidebarChat from './component/SidebarChat';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getChatsByIDGroupThunk, getGroupsThunk } from 'src/redux_store/group/group_action';
import { useParams, useNavigate } from 'react-router';
import { createChat } from 'src/redux_store/group/group_slice';

const Messages = ({ socket }: { socket: any }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const { id_group } = useParams();
  const groups = useAppSelector((state) => state.groupSlice);
  useEffect(() => {
    const id_user = me.id_user;
    if (id_user) {
      const action = getGroupsThunk({ id_user, offset: 0, limit: 10 });
      dispatch(action);
    }
    return () => {
      /// setset state group
    };
  }, []);
  useEffect(() => {
    socket.on('new-chat', ({ chat, id_group, id_user, date }: any) => {
      const action = createChat({ chat, id_group, id_user, date });
      dispatch(action);
    });
    return () => {
      socket.off('new-chat');
    };
  }, []);
  useEffect(() => {
    if (id_group) {
      const action = getChatsByIDGroupThunk({ id_group: id_group, offset: 0, limit: 10 });
      const index = groups.groups.findIndex((item: any) => item.id_group === id_group);
      if (index > -1) dispatch(action);
      else {
        navigate('/message');
      }
    }
  }, [id_group]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
  const IconButtonToggle = styled(IconButton)(
    ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.palette.common.white};
`
  );

  const buttonToggle = (
    <IconButtonToggle
      sx={{
        display: { lg: 'none', xs: 'flex' },
        mr: 2
      }}
      color='primary'
      onClick={handleDrawerToggle}
      size='small'
    >
      <MenuTwoToneIcon />
    </IconButtonToggle>
  );
  return (
    <>
      {
        <RootWrapper mt={2}>
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
          <ChatBox ButtonToggle={buttonToggle} />
        </RootWrapper>
      }
    </>
  );
};

export default Messages;
