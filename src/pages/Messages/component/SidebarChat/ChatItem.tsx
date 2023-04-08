import React from 'react';
import { Box, Stack, Avatar, Typography } from '@mui/material';
import { IGroup } from 'src/types/group';
import { IUser } from 'src/types/user';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import { useNavigate, useLocation } from 'react-router';
import { useAppSelector } from 'src/redux_store';

const ChatItem = ({ group }: { group: IGroup }) => {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();
  const { id_me } = useAppSelector((state) => state.userSlice.me);
  const navigate = useNavigate();
  const isChatFriend = group.users?.length === 2;
  let avatar = group.avatar ? CPath.host_public + group.avatar : images.account;
  let chatName = group.name;
  const chatDemo = group?.chats ? group.chats[0].message : 'say hello !';
  if (isChatFriend && group.users) {
    const friend: IUser = group.users[0].id_user === id_me ? group.users[1] : group.users[0];
    if (friend.avatar) {
      avatar = CPath.host_public + friend.avatar;
    }
    chatName = friend.fullname;
  }
  return (
    <Stack
      direction={'row'}
      py={2}
      px={1}
      borderRadius={2}
      sx={{
        background: pathName === group.id_group ? 'rgba(85, 105, 255, 0.1)' : '',
        width: '100%',
        ':hover': { background: 'rgba(85, 105, 255, 0.1);' },
        overflow: 'hidden'
      }}
      onClick={() => {
        navigate('/message/' + group.id_group);
      }}
    >
      <Avatar alt='chat-img' src={avatar} sx={{ mr: 1.5 }} />
      <Box width={'100%'}>
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
