import { useRef, useState } from 'react';
import { Avatar, Box, Button, Divider, Hidden, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import TranslateOutlined from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import { toastMessage } from 'src/utils/toast';
import { CPath } from 'src/constants';
import { logout } from 'src/redux_store/user/user_slice';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.grey[500]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

function UserBox() {
  const { me } = useAppSelector((state) => state.userSlice);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = {
    name: me?.username,
    avatar: CPath.host_user + me?.avatar
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color='secondary' ref={ref} onClick={handleOpen}>
        <Avatar variant='rounded' alt={user.name} src={user.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant='body1'>{user.name}</UserBoxLabel>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display='flex'>
          <Avatar variant='rounded' alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant='body1'>{user.name}</UserBoxLabel>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component='nav'>
          <ListItem
            button
            onClick={() => {
              const newLang = i18n.language === 'en' ? 'vi' : 'en';
              changeLanguage(newLang);
              localStorage.setItem('i18nLanguage', newLang);
              toastMessage.success(t('sidebar.toast.switchLanguage'));
            }}
          >
            <TranslateOutlined fontSize='small' />
            <ListItemText primary={t('sidebar.switchLanguage')} />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            onClick={() => {
              dispatch(logout());
            }}
            color='primary'
            fullWidth
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            {t('sidebar.logout')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default UserBox;
