import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IPayloadGetPost, IPost } from 'src/types/post';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getPostsThunk } from 'src/redux_store/post/post_action';
// import { clearPost } from 'src/redux_store/post/post_slice';
import ReelItem from './ReelItem';
import { clearReels } from 'src/redux_store/post/post_slice';

const Reels = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const { reels } = useAppSelector((state) => state.postSlice);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const fetchApi = (offset: number) => {
    const id_user = me?.id_user;
    const params: IPayloadGetPost = { id_user: id_user || '', limit: 10, offset: offset, type: 'reel' };
    const action = getPostsThunk(params);
    dispatch(action)
      .unwrap()
      .then((data: { message: string; posts: IPost[] }) => {
        const { posts } = data;
        if (!posts || posts.length === 0) {
          setIsLoadMore(false);
        }
      });
  };

  useEffect(() => {
    const offset = reels.length;
    fetchApi(offset);
    return () => {
      const action = clearReels();
      dispatch(action);
    };
  }, []);
  return (
    <Grid container justifyContent={'center'} spacing={0}>
      <Grid item lg={5} justifyContent={'flex-end'}>
        <Box>
          {reels.length > 0 && (
            <Box>
              <InfiniteScroll
                dataLength={reels.length}
                next={() => {
                  if (isLoadMore) {
                    fetchApi(reels.length);
                  }
                }}
                hasMore={true}
                loader={
                  <p style={{ fontSize: '14px', color: 'rgb(124 108 108)' }}>
                    {isLoadMore ? 'Loading...' : 'No more reels, come back later !'}
                  </p>
                }
              >
                {reels.map((post) => {
                  return <ReelItem key={post.id_post} post={post} />;
                })}
              </InfiniteScroll>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Reels;
