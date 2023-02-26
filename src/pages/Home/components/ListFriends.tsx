import { Box } from '@mui/system';
import React from 'react';
import images from 'src/assets/images';
import ItemFriend from './ItemFriend';

const ListFriends = () => {
  const friends = [
    {
      id: 1,
      name: 'bùi văn sỷ',
      avatar: images.loginPhone
    },
    {
      id: 2,
      name: 'bùi văn sỷ cccccccccc',
      avatar: images.loginPhone
    }
  ];
  return (
    <Box display={'flex'}>
      {friends.map((itemFriend) => {
        return <ItemFriend key={itemFriend.id} itemFriend={itemFriend} />;
      })}
    </Box>
  );
};

export default ListFriends;
