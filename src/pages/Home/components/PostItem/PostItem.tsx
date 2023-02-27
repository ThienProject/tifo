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
const PostItem = ({ post }: { post: IPost }) => {
  const [isLove, setIsLove] = useState(false);
  const [isMark, setIsMark] = useState(false);

  return (
    <Box>
      {/* top */}
      <Stack mb={1.2} direction='row' justifyContent='space-between'>
        <Box display='flex' alignItems='center'>
          <UserItem size='small' user={post.user} />
          <Typography sx={{ opacity: '0.6' }} fontSize={12}>
            {post.time}
          </Typography>
        </Box>
        <IconButton size='small'>
          <MoreHoriz />
        </IconButton>
      </Stack>
      {/* media */}
      <SliderImg medias={post.medias} />
      <Stack mt={0.7} justifyContent={'space-between'} direction={'row'}>
        <Stack direction={'row'}>
          <IconButton
            sx={{ p: 0 }}
            size='small'
            onClick={() => {
              setIsLove((prev) => !prev);
            }}
          >
            {!isLove ? <FavoriteBorder /> : <Favorite color='error' />}
          </IconButton>
          <IconButton sx={{ pl: 2 }} size='small'>
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
        1,001 likes
      </Typography>
      <Typography fontSize={14} fontWeight={550}>
        Rồi sao đi ăn cơm?
      </Typography>
      <Button sx={{ p: 0, fontWeight: '600', fontSize: 10, color: 'text.secondary' }}>see translation</Button>
      <Button fullWidth sx={{ justifyContent: 'start', p: 0, fontSize: 10, color: 'text.secondary' }}>
        view all 5 comments
      </Button>
      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default PostItem;
