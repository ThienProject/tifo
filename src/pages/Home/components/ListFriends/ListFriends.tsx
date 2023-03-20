import { Box } from '@mui/system';
import React from 'react';
import images from 'src/assets/images';
import { IUser } from 'src/types/user';
import ItemFriend from './ItemFriend';

const ListFriends = () => {
  const friends: IUser[] = [
    {
      id_user: '1',
      fullname: 'bùi văn sỷ',
      avatar: images.loginPhone
    },
    {
      id_user: '2',
      fullname: 'bùi văn sỷ cccccccccc',
      avatar: images.loginPhone
    }
  ];
  return (
    <Box display={'flex'}>
      {friends.map((itemFriend) => {
        return <ItemFriend key={itemFriend.id_user} itemFriend={itemFriend} />;
      })}
    </Box>
  );
};

export default ListFriends;
