import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import UserItem from 'src/components/items/UserItem';

const ItemReported = ({ report }: { report: any }) => {
  const { username, id_user, reason, avatar, datetime } = report;
  return (
    <Card variant='outlined' sx={{ mt: 0.5, p: 1, borderColor: '#ff6000' }}>
      <Box>
        <UserItem size='small' user={{ username, id_user, avatar }} />
        <Typography ml={1} color={'text.secondary'} fontSize={13}>
          {moment(datetime).format('DD-MM-YYYY')}
        </Typography>
      </Box>
      <Divider />
      <CardContent sx={{ ml: 0, p: 1 }}>
        <Typography fontSize={14}>{reason}</Typography>
      </CardContent>
    </Card>
  );
};

export default ItemReported;
