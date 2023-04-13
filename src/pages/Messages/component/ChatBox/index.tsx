import { Box, Divider, styled, IconButton } from '@mui/material';
import React from 'react';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import ChatContent from './ChatContent';

import BottomBarContent from './BottomBarContent';
import TopBarContent from './TopBarContent';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { useAppDispatch, useAppSelector } from 'src/redux_store';

import * as io from 'socket.io-client';
import { toggleMenu } from 'src/redux_store/group/group_slice';
const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.palette.common.white};
`
);
const ChatBox = () => {
  const dispatch = useAppDispatch();

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
  const socket = io.connect(CPath.host || 'http://localhost:8000');

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
      <Box bgcolor={'rgb(242, 245, 249)'} flex={1}>
        <ChatContent socket={socket} />
      </Box>
      <Divider />
      <BottomBarContent />
    </ChatWindow>
  );
};

export default ChatBox;
