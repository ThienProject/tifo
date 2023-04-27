import { Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
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
