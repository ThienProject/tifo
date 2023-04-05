import { Grid } from '@mui/material';
import React from 'react';
import ChatBox from './component/ChatBox';
import SidebarChat from './component/SidebarChat';

const Messages = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={1.3} md={3.3} lg={2.4}>
        <SidebarChat />
      </Grid>
      <Grid item xs={0} sm={8.7} md={6.7} lg={9.6}>
        <ChatBox />
      </Grid>
    </Grid>
  );
};

export default Messages;
