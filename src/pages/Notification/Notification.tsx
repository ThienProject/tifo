import { Box, Typography, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { getNotifications } from 'src/redux_store/user/user_action';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { useTranslation } from 'react-i18next';
import { INotification } from 'src/types/notification';
import NotiItem from './components/NotiItem';

const Notification = ({ handleClose }: { handleClose: (event: Event | React.SyntheticEvent) => void }) => {
  const { t } = useTranslation();
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
    <Box sx={{ py: 3 }}>
      <Typography variant='h6' mb={2} ml={2}>
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
