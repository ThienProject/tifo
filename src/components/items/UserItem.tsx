import { Avatar, Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { CPath } from 'src/constants';
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
    <>
      {user && (
        <Link to={`/${user?.id_user}`} style={{ textDecoration: 'none' }}>
          <Box pl={1} display='flex' alignItems={'center'}>
            <Box width={newSize} height={newSize}>
              <Avatar
                style={{
                  boxShadow: '1px 2px 1px #888',
                  // border: '1px solid var(--mui-palette-Slider-errorTrack)',
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%'
                }}
                alt='avatar'
                src={CPath.host_public + user?.avatar}
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
              color={'common.black'}
            >
              {user.username}
            </Typography>
            <Divider />
          </Box>
        </Link>
      )}
    </>
  );
};

export default UserItem;
