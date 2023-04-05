import { Grid } from '@mui/material';
import React, { useState } from 'react';
import ChatBox from './component/ChatBox';
import SidebarChat from './component/SidebarChat';
import { styled, Drawer, useTheme, Box, IconButton } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
const Messages = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const RootWrapper = styled(Box)(
    () => `
       height: calc(100vh);
       display: flex;
`
  );
  const DrawerWrapperMobile = styled(Drawer)(
    () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
  );
  const Sidebar = styled(Box)(
    ({ theme }) => `
        width: 290px;
        background: ${theme.palette.common.white};
`
  );
  const IconButtonToggle = styled(IconButton)(
    ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.palette.common.white};
`
  );
  const buttonToggle = (
    <IconButtonToggle
      sx={{
        display: { lg: 'none', xs: 'flex' },
        mr: 2
      }}
      color='primary'
      onClick={handleDrawerToggle}
      size='small'
    >
      <MenuTwoToneIcon />
    </IconButtonToggle>
  );
  return (
    <RootWrapper mt={2}>
      <DrawerWrapperMobile
        sx={{
          display: { lg: 'none', xs: 'inline-block' }
        }}
        variant='temporary'
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <SidebarChat />
      </DrawerWrapperMobile>
      <Sidebar
        sx={{
          display: { xs: 'none', lg: 'inline-block' }
        }}
      >
        <SidebarChat />
      </Sidebar>

      <ChatBox ButtonToggle={buttonToggle} />
    </RootWrapper>
  );
};

export default Messages;
