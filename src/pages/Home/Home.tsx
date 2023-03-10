import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListFriends from './components/ListFriends/ListFriends';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostItem from './components/PostItem';
import { IPayloadGetPost, IPost } from 'src/types/post';
import Suggestions from './components/Suggestions';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getPostsThunk } from 'src/redux_store/post/post_action';

const Home = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const [postList, setPosts] = useState<IPost[]>([]);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const fetchApi = () => {
    if (isLoadMore) {
      const id_user = me.id_user;
      const offset = postList.length;
      const params: IPayloadGetPost = { id_user: id_user || '', limit: 10, offset: offset };
      const action = getPostsThunk(params);
      dispatch(action)
        .unwrap()
        .then((data: { message: string; posts: IPost[] }) => {
          const { posts } = data;
          if (!posts || posts.length === 0) {
            setIsLoadMore(false);
          } else {
            setPosts((prev) => [...prev, ...posts]);
          }
        });
    }
  };
  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container justifyContent={'center'}>
      <Grid item lg={5} justifyContent={'flex-end'}>
        <Box mt={3} height={100} color={'common.black'}>
          <ListFriends />
          <Box mt={3}>
            {postList.length > 0 && (
              <Box>
                <InfiniteScroll
                  dataLength={postList.length}
                  next={fetchApi}
                  hasMore={true}
                  loader={<p>{isLoadMore ? 'Loading...' : 'No more posts, come back later !'}</p>}
                >
                  {postList.map((post, index) => {
                    return <PostItem index={index} key={post.id_post} post={post} />;
                  })}
                </InfiniteScroll>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item lg={5}>
        <Box mt={4} mx={10}>
          <Suggestions />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
