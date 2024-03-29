import { FC, ReactNode } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',
          '.MuiPageTitle-wrapper': {
            background: theme.palette.mode === 'dark' ? theme.palette.grey[50] : 'rgb(242, 245, 249);',
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.palette.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(theme.palette.grey[900], 0.1)}, 0px 5px 12px -4px ${alpha(
                    theme.palette.grey[900],
                    0.05
                  )}`
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `60px`,
            [theme.breakpoints.up('lg')]: {
              ml: `290px`
            }
          }}
        >
          <Box display='block' bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey[50] : 'rgb(242, 245, 249);'}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
