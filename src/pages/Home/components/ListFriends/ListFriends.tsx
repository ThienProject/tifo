import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { IUser } from 'src/types/user';
import ItemFriend from './ItemFriend';
import { getFollowingsThunk } from 'src/redux_store/user/user_action';
import { useAppDispatch, useAppSelector } from 'src/redux_store';

const ListFriends = () => {
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    if (me?.id_user) {
      const action = getFollowingsThunk({ id_user: me.id_user, limit: 5, offset: 0 });
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
    <Box display={'flex'}>
      {users.map((itemFriend) => {
        return <ItemFriend key={itemFriend.id_user} itemFriend={itemFriend} />;
      })}
    </Box>
  );
};

export default ListFriends;
