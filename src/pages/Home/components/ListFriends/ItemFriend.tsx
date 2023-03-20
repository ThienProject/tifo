import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'src/types/user';

const ItemFriend = ({ itemFriend }: { itemFriend: IUser }) => {
  return (
    <Link to={`/${itemFriend?.id_user}`} style={{ textDecoration: 'none' }}>
      <Box pl={2} display='flex' flexDirection='column'>
        <Box width={50} height={50}>
          <img
            style={{
              boxShadow: '1px 2px 1px #888',
              border: '1px solid var(--mui-palette-Slider-errorTrack)',
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              borderRadius: '50%'
            }}
            alt='avatar'
            src={itemFriend.avatar}
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
          {itemFriend.fullname}
        </Typography>
      </Box>
    </Link>
  );
};

export default ItemFriend;
