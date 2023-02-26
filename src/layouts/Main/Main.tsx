import Grid from '@mui/material/Grid';
import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/SideBar';
const MainLayout = () => {
  return (
    <Grid container>
      <Grid item xs={0} sm={1.3} md={3.3} lg={3.3}>
        <SideBar />
      </Grid>
      <Grid item xs={12} sm={8.7} md={6.7} lg={8.7}>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
