import { Box, Avatar } from '@mui/material';
import Button from '@mui/material/Button/Button';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { CPath } from 'src/constants';
import MODAL_IDS from 'src/constants/modal';
import PostDetail from 'src/pages/PostDetail';
import { useAppDispatch } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { getPostByIDThunk } from 'src/redux_store/post/post_action';
import { INotification } from 'src/types/notification';

const NotiItem = ({
  noti,
  handleClose,
  handleAcceptFollow
}: {
  noti: INotification;
  handleClose: (event: Event | React.SyntheticEvent) => void;
  handleAcceptFollow: (noti: INotification) => void;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <MenuItem
      sx={{
        py: 2,
        alignItems: 'center',
        my: 2,
        mx: 1.5,
        borderRadius: 2,
        // boxShadow: 'var(--mui-shadows-1)',
        // border: '1px solid var(--mui-palette-divider)',
        bgcolor: '#fcfcfc'
      }}
      onClick={(e) => {
        if (noti.type === 'follow') {
          navigate('/' + noti.id_actor);
        } else {
          if (noti.id_post) {
            const actionGetPost = getPostByIDThunk({ id_post: noti.id_post });
            dispatch(actionGetPost)
              .unwrap()
              .then((data) => {
                const post = data.post;
                if (post) {
                  const action = openModal({
                    modalId: MODAL_IDS.postDetail,
                    dialogComponent: <PostDetail post={post} />
                  });
                  dispatch(action);
                }
              });
          }
        }
        if (handleClose) handleClose(e);
      }}
    >
      <Stack width='80%' direction={'row'} alignItems='center'>
        <Avatar sx={{ mr: 1 }} alt='avatar' src={CPath.host_user + noti.avatar} />
        <Box maxWidth='100%'>
          <Typography sx={{ fontSize: 15, whiteSpace: 'pre-wrap' }}>
            {noti.username}
            {t(`notification.content.${noti.type}`)}
          </Typography>
        </Box>
      </Stack>

      {noti.type === 'follow' && (
        <Button
          size='small'
          sx={{ flex: 'flex-end', fontSize: 12, color: 'white', textTransform: 'capitalize' }}
          onClick={(e) => {
            e.stopPropagation();
            handleAcceptFollow(noti);
          }}
          variant='contained'
        >
          {t('button.accept')}
        </Button>
      )}
    </MenuItem>
  );
};

export default NotiItem;
