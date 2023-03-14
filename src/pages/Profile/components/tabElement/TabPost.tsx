import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getPostsThunk } from 'src/redux_store/user/user_action';
import { IPost } from 'src/types/post';
import PostList from '../PostList';

const TabPost = ({ id_user }: { id_user: string }) => {
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = () => {
    const action = getPostsThunk({ id_user, limit: 6, offset: posts.length });
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { posts } = data;
        setPosts((prev) => [...prev, ...posts]);
        console.log(data);
      });
  };
  const handleLoadMore = () => {
    fetchApi();
  };
  return (
    <Box>
      <PostList posts={posts} handleLoadMore={handleLoadMore} />
    </Box>
  );
};

export default TabPost;
