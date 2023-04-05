import { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { SidebarContext } from 'src/contexts/SidebarContext';

import { Box, Drawer, alpha, styled, Divider, useTheme, lighten, darken } from '@mui/material';

import SidebarMenu from './SidebarMenu';
import Logo from 'src/components/admin/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: 290px;
        min-width: 290px;
        color: ${theme.palette.grey[50]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background: theme.palette.mode === 'dark' ? alpha(lighten('rgb(17, 25, 42)', 0.1), 0.5) : 'rgb(17, 25, 42)',
          boxShadow: theme.palette.mode === 'dark' ? theme.shadows[16] : 'none'
        }}
      >
        <Scrollbars>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52
              }}
            >
              <Logo />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.palette.grey[50]
            }}
          />
          <SidebarMenu />
        </Scrollbars>
        <Divider
          sx={{
            background: 'rgba(255, 255, 255, 0.1)'
          }}
        />
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.shadows[16]}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant='temporary'
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark' ? theme.palette.common.white : darken(theme.palette.grey[900], 0.5)
          }}
        >
          <Scrollbars>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            />
            <SidebarMenu />
          </Scrollbars>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
