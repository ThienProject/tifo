import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import { IUser } from 'src/types/user';

const ItemFriend = ({ itemFriend }: { itemFriend: IUser }) => {
  return (
    <Link to={`/${itemFriend?.id_user}`} style={{ textDecoration: 'none' }}>
      <Box pl={2} display='flex' flexDirection='column'>
        <Box width={50} height={50}>
          <Avatar
            style={{
              boxShadow: '1px 2px 1px #888',
              border: '1px solid var(--mui-palette-Slider-errorTrack)',
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              borderRadius: '50%'
            }}
            alt={itemFriend.username}
            src={itemFriend.avatar ? CPath.host_user + itemFriend.avatar : images.account}
          />
        </Box>
        <Typography
          mt={0.5}
          color={'text.secondary'}
          overflow={'hidden'}
          maxWidth={50}
          whiteSpace={'nowrap'}
          textOverflow={'ellipsis'}
          fontSize={10}
        >
          {itemFriend.username}
        </Typography>
      </Box>
    </Link>
  );
};

export default ItemFriend;
