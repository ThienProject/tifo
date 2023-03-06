import React from 'react';
import MODAL_IDS from 'src/constants/modal';
import { Box, Divider, Stack, IconButton } from '@mui/material';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import CloseIcon from '@mui/icons-material/Close';
import ModalWrapper from 'src/components/model/ModelWrapper';
import Grid from '@mui/material/Grid';
import SliderImg from '../Home/components/PostItem/SliderImg';
import { IPost } from 'src/types/post';
import UserItem from 'src/components/items/UserItem';
import { MoreHoriz } from '@mui/icons-material';
import Comment from './components/Comment';
const PostDetail = (props: { post: IPost }) => {
  const { post } = props;
  const { medias, comments, fullname, avatar, username, id_user } = post;
  const user = { id_user, fullname, avatar, username };
  return (
    <ModalWrapper
      isNotAutoClose={false}
      isBgContent={true}
      modalId={MODAL_IDS.postDetail}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      isFullWidth
    >
      <Grid container>
        <Grid lg={6} item>
          <Box p={4} bgcolor='#d7d7d7' boxSizing='border-box'>
            <SliderImg sx={{ height: '80vh' }} medias={medias} />
          </Box>
        </Grid>
        <Grid lg={6} item>
          <Box p={2} height='80vh' boxSizing={'border-box'}>
            <Stack direction={'row'} justifyContent='space-between'>
              <UserItem size='small' user={user} />
              <IconButton size='small'>
                <MoreHoriz />
              </IconButton>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Comment comments={comments} />
          </Box>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};

export default PostDetail;
