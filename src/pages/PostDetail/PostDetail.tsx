import React from 'react';
import MODAL_IDS from 'src/constants/modal';
import { Box, Divider, Stack } from '@mui/material';
import ModalWrapper from 'src/components/model/ModelWrapper';
import Grid from '@mui/material/Grid';
import SliderImg from '../Home/components/PostItem/SliderMedia';
import { IPost, IPostAdmin } from 'src/types/post';
import UserItem from 'src/components/items/UserItem';
import { MoreHoriz } from '@mui/icons-material';
import Comment from './components/Comment';
import MenuOption from 'src/components/MenuOption';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import { useNavigate } from 'react-router';
import ConfirmationDialog from 'src/components/model/confirmation_dialog';
import { deletePostThunk } from 'src/redux_store/post/post_action';
import { toastMessage } from 'src/utils/toast';
import CustomTypography from 'src/components/CustomTypography';
import { useTranslation } from 'react-i18next';
import ReportPostModal from '../components/ReportPostModal';

const PostDetail = (props: { post: IPost | IPostAdmin }) => {
  const navigate = useNavigate();
  const socket = useAppSelector((state) => state.userSlice.socket);
  const { post } = props;
  const { t } = useTranslation();
  const { medias, id_post, description, fullname, avatar, username, id_user } = post;
  const user = { id_user, fullname, avatar, username };
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  let options: any[] = [
    {
      name: t('button.report'),
      handleClick: () => {
        const action: any = openModal({
          modalId: MODAL_IDS.reportPost,
          dialogComponent: <ReportPostModal post={post} />
        });
        dispatch(action);
        // navigate(`update/${post?.id_post}`);
      }
    }
  ];
  const optionOwner: any[] = [
    {
      name: t('postDetail.edit'),
      handleClick: () => {
        const action: any = closeModal({ modalId: MODAL_IDS.postDetail });
        dispatch(action);
        navigate(`update/${post?.id_post}`);
      },
      element: <Box>{t('postDetail.edit')}</Box>
    },
    {
      name: t('postDetail.delete'),
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
                      const action2 = closeModal({ modalId: MODAL_IDS.confirmDeletePost });
                      dispatch(action2);
                    });
                }
              }}
            />
          )
        });
        dispatch(action);
      },
      element: <Box>{t('postDetail.delete')} </Box>
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
              },
              overflowY: 'scroll'
            }}
            boxSizing={'border-box'}
          >
            <Box>
              <Stack direction={'row'} justifyContent='space-between'>
                <Box
                  onClick={() => {
                    const action = closeModal({ modalId: MODAL_IDS.postDetail });
                    dispatch(action);
                  }}
                >
                  <UserItem to={`/${user.id_user}`} size='small' user={user} />
                </Box>
                <MenuOption icon={<MoreHoriz />} options={options} />
              </Stack>
              <Box>
                <CustomTypography
                  mt={2}
                  textAlign={'justify'}
                  text={description!}
                  fontSize={14}
                  fontWeight={550}
                  max={100}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Comment socket={socket} id_post={id_post} />
          </Box>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};

export default PostDetail;
