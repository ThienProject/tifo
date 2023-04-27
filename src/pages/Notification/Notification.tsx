import { Box, Typography, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { acceptFollowThunk, getNotifications } from 'src/redux_store/user/user_action';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { useTranslation } from 'react-i18next';
import { INotification } from 'src/types/notification';
import NotiItem from './components/NotiItem';

const Notification = ({ handleClose }: { handleClose: (event: Event | React.SyntheticEvent) => void }) => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { socket } = useAppSelector((state) => state.userSlice);
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
  const handleAcceptFollow = (noti: INotification) => {
    const action = acceptFollowThunk({
      id_noti: noti.id_notification,
      id_follower: noti.id_actor,
      id_user: noti.id_user
    });
    dispatch(action)
      .unwrap()
      .then(() => {
        setNotifications((prev) => prev.filter((item) => item.id_notification !== noti.id_notification));
      });
  };
  useEffect(() => {
    socket.on('notification', (noti: INotification) => {
      console.log('có socket');
      setNotifications((prev) => [...prev, noti]);
      // const action = createChat({ chat, id_room, id_user, date });
      // dispatch(action);
    });
    socket.on('delete-notification', (noti: INotification) => {
      setNotifications((prev) =>
        prev.filter(
          (item) => !(item.id_actor == noti.id_actor && item.id_user == noti.id_user && item.type == 'follow')
        )
      );
      // const action = createChat({ chat, id_room, id_user, date });
      // dispatch(action);
    });
    return () => {
      socket.off('notification');
      socket.off('delete-notification');
    };
  }, []);
  return (
    <Box sx={{ py: 3 }}>
      <Typography variant='h6' mb={2} ml={2}>
        {t('sidebar.notification')}
      </Typography>
      {notifications.length > 0 && (
        <MenuList>
          {notifications.map((noti) => {
            return (
              <NotiItem
                handleAcceptFollow={handleAcceptFollow}
                handleClose={handleClose}
                key={noti.id_notification}
                noti={noti}
              />
            );
          })}
        </MenuList>
      )}
    </Box>
  );
};

export default Notification;
