import React from 'react';
import { Divider, Box, Stack, Avatar, Typography, Button } from '@mui/material';
import UserItem from 'src/components/items/UserItem';
import images from 'src/assets/images';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/redux_store';
const Suggestions = () => {
  const { me } = useAppSelector((state) => state.userSlice);
  const users = [
    {
      id_user: '1',
      username: 'sybuivan',
      fullname: 'Phamj vawn Thien',
      avatar: images.full_Logo_black
    },
    {
      id_user: '2',
      username: 'sybuivan',
      fullname: 'Phamj vawn Thien',
      avatar: images.full_Logo_black
    },
    {
      id_user: '3',
      username: 'sybuivan',
      fullname: 'Phamj vawn Thien',
      avatar: images.full_Logo_black
    },
    {
      id_user: '4',
      username: 'sybuivan',
      fullname: 'Phamj vawn Thien',
      avatar: images.full_Logo_black
    }
  ];
  return (
    <Box>
      <Link to={'/profile'} style={{ textDecoration: 'none' }}>
        <Stack direction={'row'} alignItems='center'>
          <Avatar
            sizes='large'
            sx={{ mr: 1 }}
            alt="it's me"
            src='https://instagram.fdad3-5.fna.fbcdn.net/v/t51.2885-15/274193622_633941284504134_4933464597307664209_n.jpg?stp=c0.248.640.640a_dst-jpg_e15_s150x150&_nc_ht=instagram.fdad3-5.fna.fbcdn.net&_nc_cat=106&_nc_ohc=QEZ3-3oky4gAX-i9X7r&edm=ANmP7GQBAAAA&ccb=7-5&oh=00_AfB5A8fTtThZG_0I3CgqcHdw0o5IcCvYJLyYVVVimfWhLg&oe=63FE653A&_nc_sid=276363'
          />
          <Box>
            <Button
              sx={{
                textTransform: 'uppercase',
                color: 'common.black',
                justifyContent: 'left',
                m: 0,
                p: 0,
                fontSize: 13,
                fontWeight: '600'
              }}
            >
              {me?.username || 'username'}
            </Button>
            <Typography textTransform={'capitalize'} color={'text.secondary'} fontSize={12} fontWeight={400}>
              {me?.fullname || 'fullname'}
            </Typography>
          </Box>
        </Stack>
      </Link>
      <Divider sx={{ mt: 3, mb: 1 }} />
      <Box>
        <Typography color={'text.secondary'} fontWeight={500}>
          Suggestions for you
        </Typography>
        {users.map((user) => {
          return (
            <Stack my={2} key={user.id_user} direction={'row'} justifyContent='space-between'>
              <UserItem size='small' user={user} />
              <Button sx={{ fontSize: 13, textTransform: 'lowercase' }}>follow</Button>
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
};

export default Suggestions;
