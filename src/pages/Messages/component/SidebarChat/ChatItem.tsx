import React from 'react';
import { Box, Stack, Avatar, Typography } from '@mui/material';
import { IGroup } from 'src/types/group';
import { IUser } from 'src/types/user';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
const ChatItem = ({ group }: { group: IGroup }) => {
  const isChatFriend = group.users?.length === 2;
  let avatar = group.avatar ? CPath.host_public + group.avatar : images.account;
  let chatName = group.name;
  const chatDemo = group?.chats ? group.chats[0].message : 'say hello !';
  if (isChatFriend) {
    const friend: IUser = group.users[1];
    if (friend.avatar) {
      avatar = CPath.host_public + group.users[1].avatar;
    }
    chatName = friend.fullname;
  }
  return (
    <Stack
      direction={'row'}
      py={2}
      px={1}
      borderRadius={2}
      sx={{ ':hover': { background: 'rgba(85, 105, 255, 0.1);' }, overflow: 'hidden' }}
      onClick={() => {}}
    >
      <Avatar alt='chat-img' src={avatar} sx={{ mr: 1.5 }} />
      <Box>
        <Typography
          textOverflow='ellipsis'
          maxWidth={'75%'}
          whiteSpace='nowrap'
          overflow='hidden'
          fontSize={15}
          fontWeight={700}
        >
          {chatName}
        </Typography>
        <Typography
          fontSize={12}
          fontWeight={300}
          textOverflow='ellipsis'
          maxWidth={'75%'}
          whiteSpace='nowrap'
          overflow='hidden'
          color={'text.secondary'}
        >
          {chatDemo}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ChatItem;
