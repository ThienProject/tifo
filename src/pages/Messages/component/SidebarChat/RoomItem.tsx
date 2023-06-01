import React, { useEffect } from 'react';
import { Box, Stack, Avatar, Typography, Button, Badge } from '@mui/material';
import { IRoom } from 'src/types/room';
import { IUser } from 'src/types/user';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuOption from 'src/components/MenuOption';
import { MoreHoriz } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { clearChatsThunk } from 'src/redux_store/room/room_action';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { toastMessage } from 'src/utils/toast';
import { Socket } from 'socket.io-client';
import { setStatusRoom } from 'src/redux_store/room/room_slice';
const ChatItem = ({ socket, room, chatDemo }: { socket: Socket; room: IRoom; chatDemo?: string }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const pathName = location.pathname.split('/').pop();
  const navigate = useNavigate();

  const isChatFriend = room.type === 'friend' || room.type === 'chatbot';
  let avatar = room.avatar ? CPath.host_user + room.avatar : images.roomDefault;
  let chatName = room.name;
  let isOnline = false;

  if (isChatFriend) {
    if (room.users && room.users.length > 0) {
      const friend: IUser = room.users[0];
      if (friend.avatar) {
        avatar = CPath.host_user + friend.avatar;
      }
      chatName = friend.fullname;
      isOnline = !me?.invisible && !friend?.invisible && friend?.status === 'online';
    } else {
      chatName = t('user.invalid')!;
      avatar = images.account;
    }
  }
  useEffect(() => {
    if (isChatFriend && socket) {
      socket.on('status', ({ id_user, status }: any) => {
        if (isChatFriend && room.users && room.users[0]?.id_user === id_user) {
          const action = setStatusRoom({ id_room: room.id_room, id_user, status });
          dispatch(action);
        }
      });
      return () => {
        socket.off('status');
      };
    }
  }, []);
  const classes = useStyles();
  return (
    <Box
      className={classes.wrapper}
      sx={{
        background: pathName === room.id_room ? 'rgba(85, 105, 255, 0.1)' : '',
        width: '100%',
        ':hover': {
          cursor: 'pointer',
          background: 'rgba(85, 105, 255, 0.1);'
        }
      }}
      my={1}
      borderRadius={2}
    >
      <Stack
        direction={'row'}
        sx={{ overflow: 'hidden' }}
        py={2}
        px={1}
        onClick={() => {
          if (pathName !== room.id_room) navigate(room.id_room!);
        }}
      >
        <Badge
          sx={{
            mr: 1.5,
            '& .MuiBadge-dot': { boxShadow: isOnline ? '0 0 0 2px var(--mui-palette-common-white)' : 'none' }
          }}
          color={isOnline ? 'success' : 'default'}
          overlap='circular'
          variant='dot'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Avatar alt='chat-img' src={avatar} />
        </Badge>
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
      <MenuOption
        classIcon='menu-option__room'
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        icon={<MoreHoriz />}
        options={[
          {
            element: (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  const id_user = me?.id_user;
                  console.log('me?.id_user', me);
                  if (id_user) {
                    toastMessage.success('ok');
                    const action = clearChatsThunk({ id_user, id_room: room.id_room });
                    dispatch(action);
                  }
                }}
                key={2}
                startIcon={<DeleteOutlineIcon fontSize='small' />}
                sx={{ p: 0, justifyContent: 'flex-start' }}
                color='error'
                variant='text'
                fullWidth
              >
                <Typography textTransform={'capitalize'} fontSize={13} fontWeight={100} color='text.secondary'>
                  {t('message.dleRoom')}
                </Typography>
              </Button>
            )
          }
        ]}
      />
    </Box>
  );
};
const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    '& .menu-option__room': { display: 'none' },

    '&:hover .menu-option__room': {
      display: 'block'
    }
  }
}));
export default ChatItem;
