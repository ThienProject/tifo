import { Box } from '@mui/material';
import React from 'react';
import { IUser } from 'src/types/user';
import ProfileCover from './ProfileCover';

const TopProfile = (prop: { user: IUser }) => {
  const { user } = prop;
  return (
    <Box>
      <ProfileCover user={user} />
      <Box></Box>
    </Box>
  );
};

export default TopProfile;
