import { Box, Input, Typography, Divider, MenuList, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { getNotifications, getUsersThunk } from 'src/redux_store/user/user_action';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { IUser } from 'src/types/user';
import { useTranslation } from 'react-i18next';
import { INotification } from 'src/types/notification';
import NotiItem from './components/NotiItem';

const Notification = ({ handleClose }: { handleClose: (event: Event | React.SyntheticEvent) => void }) => {
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { id_user } = useAppSelector((state) => state.userSlice.me);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id_user) {
      const action = getNotifications({ id_user });
      dispatch(action)
        .unwrap()
        .then((data: any) => {
          const { notifications } = data;
          if (notifications.length > 0) {
            setNotifications(notifications);
          }
        });
    }
  }, []);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6' mb={2}>
        {t('sidebar.notification')}
      </Typography>
      {notifications.length > 0 && (
        <MenuList>
          {notifications.map((noti) => {
            return <NotiItem handleClose={handleClose} key={noti.id_notification} noti={noti} />;
          })}
        </MenuList>
      )}
    </Box>
  );
};

export default Notification;
