import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SubSidebar = () => {
  return (
    <Paper>
      <Box sx={{ backgroundColor: 'common.black', width: '500px', height: '100vh' }}>
        <Typography> This is my subsidebar</Typography>
      </Box>
    </Paper>
  );
};

export default SubSidebar;
