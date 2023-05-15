import {
  Box,
  Typography,
  MenuList,
  Stack,
  Button,
  Fade,
  Popper,
  ClickAwayListener,
  Paper,
  CircularProgress
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { acceptFollowThunk, getNotifications } from 'src/redux_store/user/user_action';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { useTranslation } from 'react-i18next';
import { INotification, IPayloadNoti } from 'src/types/notification';
import NotiItem from './components/NotiItem';
import Filter from './components/Filter';
import InfiniteScroll from 'react-infinite-scroll-component';
import Scrollbars from 'react-custom-scrollbars-2';

const Notification = ({ handleClose }: { handleClose: (event: Event | React.SyntheticEvent) => void }) => {
  const { t } = useTranslation();
  const { socket } = useAppSelector((state) => state.userSlice);
  const { id_user } = useAppSelector((state) => state.userSlice.me);
  const anchorRef = React.useRef<HTMLButtonElement>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>();
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [params, setParams] = useState<IPayloadNoti>({
    id_user,
    limit: 10,
    offset: 0,
    sort: 'desc',
    category: 'all',
    time: 'all'
  });
  const dispatch = useAppDispatch();
  const [isLoadMore, setIsLoadMore] = useState(true);
  useEffect(() => {
    setAnchorEl(anchorRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleGetNoti = (params: IPayloadNoti) => {
    const action = getNotifications(params);
    dispatch(action)
      .unwrap()
      .then((data: any) => {
        const { notifications } = data;
        if (notifications && notifications.length > 0) {
          setNotifications(notifications);
        } else {
          if (params.offset === 0) {
            console.log('params.offset', params.offset);
            setNotifications([]);
          }
          setIsLoadMore(false);
        }
      })
      .catch(() => {
        if (params.offset === 0) {
          console.log('params.offset', params.offset);
          setNotifications([]);
        }
        setIsLoadMore(false);
      });
  };
  useEffect(() => {
    if (id_user) {
      handleGetNoti(params);
    }
  }, [params]);
  const handleLoadMore = () => {
    setParams((prev) => {
      const newParams = { ...prev };
      newParams.offset = notifications.length;
      return newParams;
    });
  };
  const handleAcceptFollow = (noti: INotification) => {
    const action = acceptFollowThunk({
      id_noti: noti.id_notification,
      id_follower: noti.id_actor,
      id_user: noti.id_user,
      id_follow: noti.id_follow
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
  const handleClosePopper = () => {
    setIsOpenFilter(false);
  };
  return (
    <Box sx={{ py: 3, overflowX: 'hidden' }}>
      <Popper
        sx={{ zIndex: 1203 }}
        open={isOpenFilter}
        anchorEl={anchorEl}
        role={undefined}
        placement={'bottom-start'}
        transition
        disablePortal={false}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener disableReactTree onClickAway={handleClosePopper}>
                <Box>
                  <Filter setIsOpenFilter={setIsOpenFilter} setParams={setParams} />
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant='h6' mb={2} ml={2}>
          {t('sidebar.notification')}
        </Typography>
        <Box ref={anchorRef}>
          <Button
            onClick={() => {
              setIsOpenFilter(true);
            }}
            variant='text'
          >
            {t('notification.filter')}
          </Button>
        </Box>
      </Stack>
      <MenuList sx={{ height: 500, textAlign: 'center' }}>
        <Scrollbars>
          <InfiniteScroll
            style={{ overflow: 'hidden' }}
            dataLength={notifications.length}
            next={handleLoadMore}
            hasMore={isLoadMore}
            endMessage={<p style={{ fontSize: '14px', color: 'rgb(124 108 108)' }}>{t('notification.empty')}</p>}
            loader={<CircularProgress sx={{ width: 10 }} />}
          >
            {notifications.length > 0 &&
              notifications.map((noti) => {
                return (
                  <NotiItem
                    handleAcceptFollow={handleAcceptFollow}
                    handleClose={handleClose}
                    key={noti.id_notification}
                    noti={noti}
                  />
                );
              })}
          </InfiniteScroll>
        </Scrollbars>
      </MenuList>
    </Box>
  );
};

export default Notification;
