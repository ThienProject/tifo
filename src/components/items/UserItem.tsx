import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { IUser } from 'src/types/user';

const UserItem = ({ user, size }: { user: IUser; size: string }) => {
  let newSize: number;
  if (size === 'media') {
    newSize = 50;
  } else {
    if (size === 'small') {
      newSize = 30;
    } else newSize = 100;
  }
  return (
    <Box pl={1} display='flex' alignItems={'center'}>
      <Box width={newSize} height={newSize}>
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
          src={user.avatar}
        />
      </Box>
      <Typography
        px={1}
        fontWeight={700}
        overflow={'hidden'}
        maxWidth={100}
        whiteSpace={'nowrap'}
        textOverflow={'ellipsis'}
        fontSize={14}
      >
        {user.username}
      </Typography>
      <Divider />
    </Box>
  );
};

export default UserItem;
