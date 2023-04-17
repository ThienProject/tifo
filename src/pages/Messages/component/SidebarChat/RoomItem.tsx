import React from 'react';
import { Box, Stack, Avatar, Typography } from '@mui/material';
import { IRoom } from 'src/types/room';
import { IUser } from 'src/types/user';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import { useNavigate, useLocation } from 'react-router';

const ChatItem = ({ room, chatDemo }: { room: IRoom; chatDemo?: string }) => {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();
  const navigate = useNavigate();
  const isChatFriend = room.type === 'friend' || room.type === 'chatbot';
  let avatar = room.avatar ? CPath.host_user + room.avatar : images.roomDefault;
  let chatName = room.name;

  if (isChatFriend && room.users) {
    const friend: IUser = room.users[0];
    if (friend.avatar) {
      avatar = CPath.host_user + friend.avatar;
    }
    chatName = friend.fullname;
  }
  return (
    <Stack
      direction={'row'}
      py={2}
      px={1}
      my={1}
      borderRadius={2}
      sx={{
        background: pathName === room.id_room ? 'rgba(85, 105, 255, 0.1)' : '',
        width: '100%',
        ':hover': { background: 'rgba(85, 105, 255, 0.1);' },
        overflow: 'hidden'
      }}
      onClick={() => {
        navigate('/message/' + room.id_room);
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
