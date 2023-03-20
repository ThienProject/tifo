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
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import { useNavigate } from 'react-router';
import ConfirmationDialog from 'src/components/model/confirmation_dialog';
import { deletePostThunk } from 'src/redux_store/post/post_action';
import { toastMessage } from 'src/utils/toast';

const PostDetail = (props: { post: IPost }) => {
  const navigate = useNavigate();
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
      handleClick: () => {
        const action: any = closeModal({ modalId: MODAL_IDS.postDetail });
        dispatch(action);
        navigate(`update/${id_post}`);
      },
      element: <Box> Edit post</Box>
    },
    {
      name: 'delete post',
      handleClick: () => {
        const action = openModal({
          modalId: MODAL_IDS.confirmDeletePost,
          dialogComponent: (
            <ConfirmationDialog
              modalId={MODAL_IDS.confirmDeletePost}
              describe={'Are you sure delete this post ?'}
              sliceName={'DELETE POST'}
              functionName={'deleting'}
              callback={function () {
                if (post.id_post) {
                  const action = deletePostThunk({ id_post: post.id_post });
                  dispatch(action)
                    .unwrap()
                    .then((data) => {
                      toastMessage.success(data.message || 'Delete post success!');
                      const action = closeModal({ modalId: MODAL_IDS.postDetail });
                      dispatch(action);
                    });
                }
              }}
            />
          )
        });
        dispatch(action);
      },
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
