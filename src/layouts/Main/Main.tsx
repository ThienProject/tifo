import Grid from '@mui/material/Grid';
import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/SideBar';
const MainLayout = () => {
  return (
    <Grid container sx={{ mb: { xs: '56px', md: 0 } }}>
      <Grid item xs={0} sm={1} md={3} lg={2.4}>
        <SideBar />
      </Grid>
      <Grid item xs={12} sm={11} md={9} lg={9.6}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
