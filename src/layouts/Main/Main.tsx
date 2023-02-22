import Grid from '@mui/material/Grid';
import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../components/SideBar';
const MainLayout = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
