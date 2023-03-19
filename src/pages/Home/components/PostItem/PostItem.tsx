import { Box, IconButton, Typography, Stack, Divider, Button } from '@mui/material';
import React, { useState } from 'react';
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
import SliderImg from './SliderImg';
import { IUser } from 'src/types/user';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import PostDetail from 'src/pages/PostDetail';
import { updateLoveThunk } from 'src/redux_store/post/post_action';

const PostItem = ({ post, index }: { post: IPost; index: number }) => {
  // Before the component definition:
  const [isLove, setIsLove] = useState(false);
  const [isMark, setIsMark] = useState(false);
  const dispatch = useAppDispatch();
  // const postSlice = useAppSelector((state) => state.postSlice.posts[index]);
  const { id_user, username, fullname, avatar } = post;
  const user: IUser = { id_user, username, fullname, avatar };
  return (
    <Box>
      {/* top */}
      <Stack mb={1.2} direction='row' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
          <UserItem size='small' user={user} />
          <Typography sx={{ opacity: '0.6' }} fontSize={12}>
            {moment(post.date_time).format('DD-MM-YYYY')}
          </Typography>
        </Box>
        <IconButton size='small'>
          <MoreHoriz />
        </IconButton>
      </Stack>
      {/* media */}
      <SliderImg sx={{ height: 300 }} medias={post?.medias} />{' '}
      <Stack mt={0.7} justifyContent={'space-between'} direction={'row'}>
        <Stack direction={'row'}>
          <IconButton
            sx={{ p: 0 }}
            size='small'
            onClick={() => {
              // setIsLove((prev) => !prev);
              if (id_user) {
                const action = updateLoveThunk({ id_user: id_user, isLove: !post.isLove, id_post: post.id_post });
                dispatch(action).unwrap();
              }
            }}
          >
            {!post.isLove ? <FavoriteBorder /> : <Favorite color='error' />}
          </IconButton>
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
        <IconButton
          size='small'
          onClick={() => {
            setIsMark((prev) => !prev);
          }}
        >
          {isMark ? <BookmarkOutlined sx={{ color: 'common.black' }} /> : <BookmarkBorderOutlined />}
        </IconButton>
      </Stack>
      <Typography color='common.black' fontSize={14} fontWeight={550}>
        {post.loves ? post.loves : 0} likes
      </Typography>
      <Typography fontSize={14} fontWeight={550}>
        {post.description}
      </Typography>
      <Button sx={{ p: 0, fontWeight: '600', fontSize: 10, color: 'text.secondary' }}>see translation</Button>
      {post.commentLength ? (
        <Button
          fullWidth
          sx={{ justifyContent: 'start', p: 0, fontSize: 10, color: 'text.secondary' }}
          onClick={() => {
            const action = openModal({
              modalId: MODAL_IDS.postDetail,
              dialogComponent: <PostDetail post={post} />
            });
            dispatch(action);
          }}
        >
          {'view all ' + post.commentLength + ' comments'}
        </Button>
      ) : (
        ''
      )}
      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default PostItem;
