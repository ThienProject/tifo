import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { IPostAdmin } from 'src/types/post';
import CustomTypography from 'src/components/CustomTypography';
import PostDetail from 'src/pages/PostDetail/PostDetail';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { useAppDispatch } from 'src/redux_store';
import { useTranslation } from 'react-i18next';

const ModalViewLockPost = ({ post }: { post: IPostAdmin }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <ModalWrapper maxWidth={450} minWidth={450} modalId={MODAL_IDS.viewLockNoti}>
      <Box padding={1} sx={{ overflowY: 'scroll', maxHeight: 250, minHeight: 250 }}>
        <Box ml={0.5}>
          {/* <UserItem size='small' isFullname post={post} /> */}
          <CustomTypography max={100} text={post.description!} />
          <Divider />
          <Card variant='outlined' sx={{ mt: 0.5, p: 1, borderColor: '#ff6000' }}>
            <Box>
              {/* <UserItem size='small' user={{ username, id_user, avatar }} /> */}
              {/* <Typography ml={1} color={'text.secondary'} fontSize={13}>
                {moment(datetime).format('DD-MM-YYYY')}
              </Typography> */}
            </Box>
            <Divider />
            <CardContent sx={{ ml: 0, p: 1 }}>
              <Typography fontSize={14}>{post.banned_reason}</Typography>
            </CardContent>
          </Card>
          <Box mt={1} display={'flex'} alignItems={'center'}>
            <Button
              onClick={() => {
                if (post) {
                  const action = openModal({
                    modalId: MODAL_IDS.postDetail,
                    dialogComponent: <PostDetail post={post!} />
                  });
                  dispatch(action);
                }
              }}
              sx={{ color: '#fff', fontSize: 13, textTransform: 'capitalize' }}
              variant='contained'
            >
              {t('admin.posts.viewDetail')}
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default ModalViewLockPost;
