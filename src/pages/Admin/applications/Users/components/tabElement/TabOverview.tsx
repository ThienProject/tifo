import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import { t } from 'i18next';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MODAL_IDS from 'src/constants/modal';
import { useAppDispatch } from 'src/redux_store';
import { getUserThunk } from 'src/redux_store/admin/admin_action';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { IUserAdmin } from 'src/types/user';

const Overview = ({ id_user }: { id_user: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUserAdmin>();
  useEffect(() => {
    fetchApi(id_user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApi = (id_user: string) => {
    const action = getUserThunk({ id_user });
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { user } = data;
        if (user) {
          setUser(user);
        }
      });
  };

  return (
    <Box>
      <Box sx={{ mb: 1 }}>
        <Typography fontSize={14} variant='body1'>
          {t('admin.users.participationDate')}
        </Typography>
        <Typography fontSize={12} variant='body2'>
          {moment(user?.datetime).format('DD-MM-YYYY')}
        </Typography>
      </Box>
      <Card sx={{ p: 1, mb: 1 }}>
        <Typography fontSize={15}>{t('admin.users.postInfo')}</Typography>
        <Divider />
        <CardContent sx={{ p: 0, ml: 1 }}>
          <Box mt={1} display={'flex'} alignItems={'center'}>
            <Typography fontSize={13} variant='body1'>
              {t('admin.users.totalPost')}
            </Typography>
            <Button
              onClick={() => {
                dispatch(closeModal({ modalId: MODAL_IDS.viewDetailUser }));
                navigate('/admin/posts/' + user?.id_user);
              }}
              sx={{ fontSize: 13, textTransform: 'capitalize' }}
              variant='text'
            >
              {user?.post_quantity || 0} items
            </Button>
          </Box>
          <Box mt={1} display={'flex'} alignItems={'center'}>
            <Typography fontSize={13} variant='body1'>
              {t('admin.users.postReport')}
            </Typography>
            <Button
              onClick={() => {
                dispatch(closeModal({ modalId: MODAL_IDS.viewDetailUser }));
                navigate('admin/posts/' + user?.id_user + '?filter=reported');
              }}
              sx={{ fontSize: 13, textTransform: 'capitalize' }}
              variant='text'
            >
              {user?.post_reports || 0} items
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Overview;
