import { Box, IconButton, Typography, Stack, Divider, Button } from '@mui/material';
import React, { useRef } from 'react';
import {
  MoreHoriz,
  FavoriteBorder,
  Favorite,
  ChatBubbleOutlineOutlined,
  BookmarkBorderOutlined,
  BookmarkOutlined
} from '@mui/icons-material';
import UserItem from 'src/components/items/UserItem';
import { IPost } from 'src/types/post';

import { IUser } from 'src/types/user';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import PostDetail from 'src/pages/PostDetail';
import { deletePostThunk, updateLoveThunk, updateSaveThunk } from 'src/redux_store/post/post_action';
import { useTranslation } from 'react-i18next';
import ProtectBox from 'src/components/ProtectBox/ProtectBox';
import SliderMedia from './SliderMedia';
import CustomTypography from 'src/components/CustomTypography';
import { toastMessage } from 'src/utils/toast';
import ConfirmationDialog from 'src/components/model/confirmation_dialog';
import MenuOption from 'src/components/MenuOption';
import { useNavigate } from 'react-router';
import ReportPostModal from 'src/pages/components/ReportPostModal';

const PostItem = ({ post }: { post: IPost }) => {
  const myRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const postSlice = useAppSelector((state) => state.postSlice.posts[index]);
  const { id_user, username, fullname, avatar } = post;
  const user: IUser = { id_user, username, fullname, avatar };
  const { me } = useAppSelector((state) => state.userSlice);
  let options: any[] = [
    {
      name: t('button.report'),
      handleClick: () => {
        const action: any = openModal({
          modalId: MODAL_IDS.reportPost,
          dialogComponent: <ReportPostModal post={post} />
        });
        dispatch(action);
      }
    },
    {
      name: t('button.viewDetail'),
      handleClick: () => {
        const action: any = openModal({
          modalId: MODAL_IDS.postDetail,
          dialogComponent: <PostDetail post={post} />
        });
        dispatch(action);
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
    <Box ref={myRef}>
      <Stack mb={1.2} direction='row' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
          <UserItem size='small' to={`/${user.id_user}`} user={user} />
          <Typography width={'100%'} sx={{ opacity: '0.6' }} fontSize={12}>
            {moment(post.date_time).format('DD-MM-YYYY')}
          </Typography>
        </Box>
        <MenuOption icon={<MoreHoriz />} options={options} />
      </Stack>
      {/* media */}
      <SliderMedia sx={{ height: 300 }} medias={post?.medias} />{' '}
      <Stack mt={0.7} justifyContent={'space-between'} direction={'row'}>
        <Stack direction={'row'}>
          <ProtectBox toLogin>
            <IconButton
              sx={{ p: 0 }}
              size='small'
              onClick={() => {
                if (me?.id_user) {
                  const action = updateLoveThunk({
                    id_user: me?.id_user,
                    isLove: !post.isLove,
                    id_post: post.id_post
                  });
                  dispatch(action).unwrap();
                }
              }}
            >
              {!post.isLove ? <FavoriteBorder /> : <Favorite color='error' />}
            </IconButton>
          </ProtectBox>
          <IconButton
            sx={{ pl: 2 }}
            size='small'
            onClick={() => {
              const action = openModal({
                modalId: MODAL_IDS.postDetail,
                dialogComponent: <PostDetail post={post} />
              });
              dispatch(action);
            }}
          >
            <ChatBubbleOutlineOutlined />
          </IconButton>
        </Stack>

        <ProtectBox toLogin>
          <IconButton
            size='small'
            onClick={() => {
              if (me?.id_user) {
                const action = updateSaveThunk({
                  id_user: me?.id_user,
                  isSave: !post.isSave,
                  id_post: post.id_post
                });
                dispatch(action).unwrap();
              }
              // setIsMark((prev) => !prev);
            }}
          >
            {post.isSave ? <BookmarkOutlined sx={{ color: 'common.black' }} /> : <BookmarkBorderOutlined />}
          </IconButton>
        </ProtectBox>
      </Stack>
      <Typography color='common.black' fontSize={14} fontWeight={550}>
        {post.loves ? post.loves : 0} likes
      </Typography>
      <CustomTypography
        myRef={myRef}
        textAlign={'justify'}
        text={post.description!}
        fontSize={14}
        fontWeight={550}
        max={100}
      />
      <Button sx={{ p: 0, fontWeight: '600', fontSize: 10, color: 'text.secondary' }}>{t('home.translate')}</Button>
      {post.commentLength ? (
        <Button
          fullWidth
          sx={{ justifyContent: 'start', p: 0, fontSize: 10, color: 'text.secondary' }}
          onClick={() => {
            const action: any = openModal({
              modalId: MODAL_IDS.postDetail,
              dialogComponent: <PostDetail post={post} />
            });
            dispatch(action);
          }}
        >
          {t('home.view_comment', { count: post.commentLength })}
        </Button>
      ) : (
        ''
      )}
      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default PostItem;
