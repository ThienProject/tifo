import React from 'react';
import MODAL_IDS from 'src/constants/modal';
import { Box, Divider, Stack } from '@mui/material';
import ModalWrapper from 'src/components/model/ModelWrapper';
import Grid from '@mui/material/Grid';
import SliderImg from '../Home/components/PostItem/SliderImg';
import { IPost } from 'src/types/post';
import UserItem from 'src/components/items/UserItem';
import { MoreHoriz } from '@mui/icons-material';
import Comment from './components/Comment';
import * as io from 'socket.io-client';
import { CPath } from 'src/constants';
import MenuOption from 'src/components/MenuOption';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
const PostDetail = (props: { post: IPost }) => {
  const socket = io.connect(CPath.host || 'http://localhost:8000');
  const { post } = props;
  const { medias, id_post, fullname, avatar, username, id_user } = post;
  const user = { id_user, fullname, avatar, username };
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  let options: any[] = [];
  const optionOwner: any[] = [
    {
      name: 'edit post',
      element: <Box> Edit post </Box>
    },
    {
      name: 'delete post',
      element: <Box> Delete post </Box>
    }
  ];
  if (me?.id_user === id_user) {
    options = options.concat(optionOwner);
  }
  return (
    <ModalWrapper
      isNotAutoClose={false}
      isBgContent={true}
      modalId={MODAL_IDS.postDetail}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      isFullWidth
    >
      <Grid container>
        <Grid lg={6} sm={12} item>
          <Box p={4} bgcolor='#d7d7d7' boxSizing='border-box'>
            <SliderImg
              sx={{
                height: '80vh'
              }}
              medias={medias}
            />
          </Box>
        </Grid>
        <Grid lg={6} sm={12} item>
          <Box
            p={2}
            sx={{
              height: {
                lg: '80vh'
              }
            }}
            boxSizing={'border-box'}
          >
            <Stack direction={'row'} justifyContent='space-between'>
              <Box
                onClick={() => {
                  const action = closeModal({ modalId: MODAL_IDS.postDetail });
                  dispatch(action);
                }}
              >
                <UserItem size='small' user={user} />
              </Box>

              <MenuOption icon={<MoreHoriz />} options={options} />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Comment socket={socket} id_post={id_post} />
          </Box>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};

export default PostDetail;
