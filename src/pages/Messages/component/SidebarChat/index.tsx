import { Switch, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import UserItem from 'src/components/items/UserItem';
import TabCNP from 'src/components/Tab/Tab';
import { useAppSelector } from 'src/redux_store';

const SidebarChat = () => {
  const { me } = useAppSelector((state) => state.userSlice);
  return (
    <Box>
      <Box>
        <UserItem size='media' user={me} isFullname />
        <Box>
          <Switch size='small' />
        </Box>
        <TextField />
        <Typography variant='h4'>Chats</Typography>
        <TabCNP TabList={[{ label: 'Friend' }, { label: 'Group' }]} />
      </Box>
    </Box>
  );
};

export default SidebarChat;
