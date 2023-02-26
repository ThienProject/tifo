import { Box, IconButton, Typography, Stack, Divider } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import React from 'react';
import UserItem from 'src/components/items/UserItem';
import { IPost } from 'src/types/post';
import SliderImg from './SliderImg';
const PostItem = ({ post }: { post: IPost }) => {
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
      {/* action/ love info */}
      {/* comment modal */}
      <Divider sx={{ my: 3 }} />
    </Box>
  );
};

export default PostItem;
