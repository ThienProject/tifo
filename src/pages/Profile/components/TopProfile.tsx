import { Avatar, Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import images from 'src/assets/images';
import ProtectBox from 'src/components/ProtectBox';
import { IUser } from 'src/types/user';

const TopProfile = (prop: { user: IUser }) => {
  const { user } = prop;
  return (
    <Stack direction={'row'}>
      <Box minWidth={250}>
        <Avatar sx={{ width: 100, height: 100, margin: '0 auto', boxShadow: 1 }} src={user?.avatar || images.account} />
      </Box>
      <Box>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography>{user.username}</Typography>
          <ProtectBox id_owner={user.id_user}>
            <Button>Edit Profile</Button>
          </ProtectBox>
        </Stack>
        <Box>
          <Typography>{user.fullname}</Typography>
        </Box>
        <Stack direction={'row'} justifyContent={'center'}>
          <Typography>{user?.posts} posts</Typography>
          <Typography mx={2}>{user?.followers} followers</Typography>
          <Typography>{user?.followings} followings</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default TopProfile;
