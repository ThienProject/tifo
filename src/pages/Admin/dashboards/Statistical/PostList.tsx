import { useState } from 'react';
import { Button, Box, Card, Typography } from '@mui/material';

import PostListColumn from './PostListColumn';

function PostList() {
  const [tabs] = useState<string | null>('watch_list_columns');

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          pb: 3
        }}
      >
        <Typography fontSize={28} variant='h3'>
          Posts List
        </Typography>
      </Box>

      {tabs === 'watch_list_columns' && <PostListColumn />}

      {!tabs && (
        <Card
          sx={{
            textAlign: 'center',
            p: 3
          }}
        >
          <Typography
            align='center'
            variant='h2'
            fontWeight='normal'
            color='text.secondary'
            sx={{
              mt: 3
            }}
            gutterBottom
          >
            Click something, anything!
          </Typography>
          <Button
            variant='contained'
            size='large'
            sx={{
              mt: 4
            }}
          >
            Maybe, a button?
          </Button>
        </Card>
      )}
    </>
  );
}

export default PostList;
