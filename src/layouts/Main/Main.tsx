import { Container, CssBaseline } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
const MainLayout = () => {
  return (
    <Container fixed>
      <CssBaseline />
      <div>
        main
        <Outlet></Outlet>
      </div>
    </Container>
  );
};

export default MainLayout;
