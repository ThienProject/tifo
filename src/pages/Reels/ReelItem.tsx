import { Box, IconButton, Typography, Stack } from '@mui/material';
import React, { useRef } from 'react';
import { MoreHoriz, Favorite, ChatBubble } from '@mui/icons-material';
import UserItem from 'src/components/items/UserItem';
import { IPost } from 'src/types/post';

import { IUser } from 'src/types/user';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import PostDetail from 'src/pages/PostDetail';
import { updateLoveThunk } from 'src/redux_store/post/post_action';
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
    <Stack
      direction={'row'}
      sx={{
        my: 2,
        height: { xs: 'calc(100vh - 100px)', sm: 'calc(100vh - 50px)' },
        width: { xs: 338 },
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <Box height={'100%'} width={'100%'}>
        <Box ref={myRef}></Box>
        {post?.medias && (
          <ItemMedia
            control={false}
            isReel
            autoPlay
            sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
            key={post.id_post}
            item={post?.medias[0]}
          />
        )}
        <Stack
          alignItems={'center'}
          sx={{ position: 'absolute', bottom: 0 }}
          mb={1.2}
          direction='column'
          justifyContent='space-between'
        >
          <UserItem textColor='#fff' size='small' to={`/${user.id_user}`} user={user} />
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
      </Box>
      <Box sx={{ position: 'absolute', bottom: '20%', right: 10 }}>
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
                        id_user: me?.id_user,
                        isLove: !post.isLove,
                        id_post: post.id_post,
                        type: post.type
                      });
                      dispatch(action).unwrap();
                    }
                  }}
                >
                  {!post.isLove ? <Favorite sx={{ color: '#fff' }} /> : <Favorite color='error' />}
                </IconButton>
                <Typography color='#fff' fontSize={12} fontWeight={550}>
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
              <ChatBubble sx={{ color: '#fff' }} />
            </IconButton>
            <IconButton sx={{ color: '#fff', boxShadow: 1 }} size='small'>
              <MoreHoriz />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ReelItem;
