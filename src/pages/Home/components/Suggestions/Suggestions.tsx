import React, { useEffect, useState } from 'react';
import { Divider, Box, Stack, Avatar, Typography, Button } from '@mui/material';
import UserItem from 'src/components/items/UserItem';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { useTranslation } from 'react-i18next';
import { IUser } from 'src/types/user';
import { getUserSuggestsThunk } from 'src/redux_store/user/user_action';
import { CPath } from 'src/constants';
const Suggestions = () => {
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  const { t } = useTranslation();
  const isLogin = me?.id_user;
  useEffect(() => {
    if (me?.id_user) {
      const action = getUserSuggestsThunk({ id_user: me?.id_user, limit: 10, offset: 0 });
      dispatch(action)
        .unwrap()
        .then((data) => {
          const { users } = data;
          if (users) {
            setUsers(users);
          }
        });
    }
  }, []);
  return (
    <Box>
      <Link to={isLogin ? '/profile' : '/auth/login'} style={{ textDecoration: 'none' }}>
        <Stack direction={'row'} alignItems='center'>
          <Avatar sizes='large' sx={{ mr: 1, boxShadow: 1 }} alt="it's me" src={CPath.host_user + me?.avatar} />
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
          {t('home.suggestTab')}
        </Typography>
        {users.map((user) => {
          return (
            <Stack my={2} key={user.id_user} direction={'row'} justifyContent='space-between'>
              <UserItem to={`/${user.id_user}`} size='small' user={user} />
              <Button sx={{ fontSize: 13, textTransform: 'lowercase' }}>follow</Button>
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
};

export default Suggestions;
