import { Grid, styled, Drawer, useTheme, Box, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChatBox from './component/ChatBox';
import SidebarChat from './component/SidebarChat';

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { IGroup } from 'src/types/group';
import { useLocation, useNavigate } from 'react-router';

const Messages = ({
  groups,
  setGroups
}: {
  groups: IGroup[];
  setGroups: React.Dispatch<React.SetStateAction<IGroup[]>>;
}) => {
  const theme = useTheme();

  const location = useLocation();
  const pathName = location.pathname.split('/').pop();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<IGroup>();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathName !== 'message') {
      const group = groups.find((item) => item.id_group === pathName);
      if (group) {
        setCurrentGroup(group);
      } else navigate('/notfound');
    } else navigate('/message/' + groups[0].id_group);
  }, [pathName]);
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
  console.log('groups', groups);
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
        <SidebarChat groups={groups} setGroups={setGroups} />
      </DrawerWrapperMobile>
      <Sidebar
        sx={{
          display: { xs: 'none', lg: 'inline-block' }
        }}
      >
        <SidebarChat groups={groups} setGroups={setGroups} />
      </Sidebar>

      {currentGroup && <ChatBox group={currentGroup} ButtonToggle={buttonToggle} />}
    </RootWrapper>
  );
};

export default Messages;
