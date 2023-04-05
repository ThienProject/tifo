import { Box, Stack, Avatar, Divider, styled, Drawer, IconButton, useTheme } from '@mui/material';
import React from 'react';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import { IGroup } from 'src/types/group';
import { IUser } from 'src/types/user';
import ChatContent from './ChatContent';
import { Scrollbars } from 'react-custom-scrollbars-2';
import BottomBarContent from './BottomBarContent';
import TopBarContent from './TopBarContent';

const ChatBox = ({ group, ButtonToggle }: { group: IGroup; ButtonToggle: React.ReactNode }) => {
  const isChatFriend = group?.users?.length === 2;
  let avatar = group?.avatar ? CPath.host_public + group.avatar : images.account;
  let chatName = group?.name;
  if (isChatFriend) {
    const friend: IUser = group.users[1];
    if (friend.avatar) {
      avatar = CPath.host_public + group.users[1].avatar;
    }
    chatName = friend.fullname;
  }
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
        {ButtonToggle}
        <TopBarContent />
      </ChatTopBar>
      <Box flex={1}>
        <Scrollbars>
          <ChatContent />
        </Scrollbars>
      </Box>
      <Divider />
      <BottomBarContent />
    </ChatWindow>
  );
};

export default ChatBox;
