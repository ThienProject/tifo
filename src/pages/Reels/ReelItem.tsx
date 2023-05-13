import { Box, IconButton, Typography, Stack, Grid } from '@mui/material';
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
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import PostDetail from 'src/pages/PostDetail';
import { updateLoveThunk, updateSaveThunk } from 'src/redux_store/post/post_action';
import ProtectBox from 'src/components/ProtectBox/ProtectBox';
import CustomTypography from 'src/components/CustomTypography';
import ItemMedia from '../components/ItemMedia';

const ReelItem = ({ post }: { post: IPost }) => {
  const myRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { id_user, username, fullname, avatar } = post;
  const user: IUser = { id_user, username, fullname, avatar };
  const { me } = useAppSelector((state) => state.userSlice);
  return (
    <Grid sx={{ my: 2 }} container>
      <Grid item lg={8} sx={{ position: 'relative' }}>
        <Box ref={myRef}></Box>
        {post?.medias && (
          <ItemMedia control={false} isReel autoPlay sx={{ height: 500 }} key={post.id_post} item={post?.medias[0]} />
        )}
        <Stack
          alignItems={'center'}
          sx={{ position: 'absolute', bottom: 0 }}
          mb={1.2}
          direction='column'
          justifyContent='space-between'
        >
          <UserItem size='small' to={`/${user.id_user}`} user={user} />
          {/* <Box display='flex' flexDirection={'column'} alignItems='center'>
            <Typography width={'100%'} sx={{ opacity: '0.6', ml: 10 }} fontSize={12}>
              {moment(post.date_time).format('DD-MM-YYYY')}
            </Typography>
          </Box> */}
          <CustomTypography
            color={'#fff'}
            myRef={myRef}
            ml={6}
            textAlign={'justify'}
            text={post.description!}
            fontSize={14}
            fontWeight={550}
            max={100}
          />
        </Stack>
      </Grid>
      <Grid item lg={3}>
        <Stack height={'100%'} justifyContent={'flex-end'}>
          <Stack justifyContent={'flex-end'} gap={2} alignItems={'center'}>
            <ProtectBox toLogin>
              <Box sx={{ textAlign: 'center' }}>
                <IconButton
                  sx={{ p: 0 }}
                  size='small'
                  onClick={() => {
                    if (me?.id_user) {
                      const action = updateLoveThunk({
                        id_user: me.id_user,
                        isLove: !post.isLove,
                        id_post: post.id_post,
                        type: post.type
                      });
                      dispatch(action).unwrap();
                    }
                  }}
                >
                  {!post.isLove ? <FavoriteBorder /> : <Favorite color='error' />}
                </IconButton>
                <Typography color='common.black' fontSize={12} fontWeight={550}>
                  {post.loves ? post.loves : 0}
                </Typography>
              </Box>
            </ProtectBox>

            <IconButton
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
            <ProtectBox toLogin>
              <IconButton
                size='small'
                onClick={() => {
                  if (me?.id_user) {
                    const action = updateSaveThunk({
                      id_user: me.id_user,
                      isSave: !post.isSave,
                      id_post: post.id_post,
                      type: 'reel'
                    });
                    dispatch(action).unwrap();
                  }
                  // setIsMark((prev) => !prev);
                }}
              >
                {post.isSave ? <BookmarkOutlined sx={{ color: 'common.black' }} /> : <BookmarkBorderOutlined />}
              </IconButton>
            </ProtectBox>
            <IconButton size='small'>
              <MoreHoriz />
            </IconButton>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ReelItem;
