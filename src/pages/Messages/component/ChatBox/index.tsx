import { Box, Divider, styled, IconButton, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import ChatContent from './ChatContent';

import BottomBarContent from './BottomBarContent';
import TopBarContent from './TopBarContent';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { useAppDispatch, useAppSelector } from 'src/redux_store';

import { deleteNewUserChat, toggleMenu } from 'src/redux_store/room/room_slice';
import { useParams } from 'react-router';

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.palette.common.white};
`
);
const ChatBox = () => {
  const theme = useTheme();
  const socket = useAppSelector((state) => state.userSlice.socket);
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    dispatch(toggleMenu());
  };
  // const rooms = useAppSelector((state) => state.roomSlice.rooms);
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

  const ChatTopBar = styled(Box)(
    ({ theme }) => `
        background: ${theme.palette.common.white};
        border-bottom: ${theme.palette.grey[300]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`
  );
  const ChatWindow = styled(Box)(
    () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
  );
  const { id_user } = useParams();
  useEffect(() => {
    if (id_user) {
      return () => {
        const actionReset = deleteNewUserChat();
        dispatch(actionReset);
      };
    }
  }, [id_user]);
  return (
    <ChatWindow>
      <ChatTopBar
        sx={{
          display: { xs: 'flex', lg: 'inline-block' }
        }}
      >
        {buttonToggle}
        <TopBarContent />
      </ChatTopBar>
      <Box bgcolor={theme.palette.mode === 'dark' ? theme.palette.common.white : 'rgb(242, 245, 249)'} flex={1}>
        <ChatContent socket={socket} />
      </Box>
      <Divider />
      <BottomBarContent />
    </ChatWindow>
  );
};

export default ChatBox;
