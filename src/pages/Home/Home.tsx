import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListFriends from './components/ListFriends/ListFriends';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostItem from './components/PostItem';
import { IPayloadGetPost, IPost } from 'src/types/post';
import Suggestions from './components/Suggestions';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getPostsThunk } from 'src/redux_store/post/post_action';
import { clearPost } from 'src/redux_store/post/post_slice';
import { useTranslation } from 'react-i18next';
import ProtectBox from 'src/components/ProtectBox/ProtectBox';

const Home = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const { posts } = useAppSelector((state) => state.postSlice);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const { t } = useTranslation();
  const fetchApi = (offset: number) => {
    const id_user = me?.id_user;
    const params: IPayloadGetPost = { id_user: id_user || '', limit: 10, offset: offset };
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
    const offset = posts.length;
    fetchApi(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      const action = clearPost();
      dispatch(action);
    };
  }, []);

  return (
    <Grid container justifyContent={'center'} spacing={0}>
      <Grid item lg={6} justifyContent={'flex-end'}>
        <Box mt={3} height={100} color={'common.black'}>
          <ProtectBox>
            <ListFriends />
          </ProtectBox>
          <Box mt={3}>
            {posts.length > 0 && (
              <Box>
                <InfiniteScroll
                  style={{ overflow: 'hidden' }}
                  dataLength={posts.length}
                  next={() => {
                    fetchApi(posts.length);
                  }}
                  hasMore={isLoadMore}
                  loader={
                    <Box textAlign={'center'}>
                      <CircularProgress />
                    </Box>
                  }
                  endMessage={<p style={{ fontSize: '14px', color: 'rgb(124 108 108)' }}>{t('home.empty')}</p>}
                >
                  {posts.map((post) => {
                    return <PostItem key={post.id_post} post={post} />;
                  })}
                </InfiniteScroll>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item lg={5} display={{ xs: 'none', lg: 'block' }}>
        <Box mt={4} mx={10}>
          <ProtectBox>
            <Suggestions />
          </ProtectBox>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
