import { Box, Divider, styled, IconButton, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import ChatContent from './ChatContent';

import BottomBarContent from './BottomBarContent';
import TopBarContent from './TopBarContent';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { useAppDispatch, useAppSelector } from 'src/redux_store';

import { deleteNewUserChat, toggleMenu } from 'src/redux_store/room/room_slice';
import { useNavigate, useParams } from 'react-router';
import { IPayloadChats } from 'src/types/room';
import { getChatsByIDroomThunk } from 'src/redux_store/room/room_action';
import { toastMessage } from 'src/utils/toast';

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
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    dispatch(toggleMenu());
  };
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

  const { id_room } = useParams();
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
