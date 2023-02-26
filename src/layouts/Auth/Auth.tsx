import React from 'react';
import { Grid, Box } from '@mui/material';
import images from 'src/assets/images';
import { Outlet } from 'react-router';
const Auth = () => {
  return (
    <Grid container marginTop={5} columnSpacing={3}>
      <Grid item xs={0} sm={6} display='flex' justifyContent={'flex-end'}>
        <Box>
          <img style={{ height: '500px' }} alt='login phone img' src={images.loginPhone} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} justifyContent={'flex-start'}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Auth;
