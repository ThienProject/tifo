import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux_store';
import { getPostsThunk } from 'src/redux_store/user/user_action';
import { IPost } from 'src/types/post';
import PostList from '../PostList';

const TabPost = ({ id_user }: { id_user: string }) => {
  console.log('id_user mới nề : ', id_user);
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    console.log('fetch mới nề : ', id_user);
    fetchApi(id_user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApi = (id_user: string) => {
    console.log('fetch api post ', posts);
    const action = getPostsThunk({ id_user, limit: 6, offset: posts.length });
    dispatch(action)
      .unwrap()
      .then((data) => {
        const newPosts = data.posts;
        setPosts((prev) => [...prev, ...newPosts]);
      });
  };
  const handleLoadMore = () => {
    fetchApi(id_user);
  };
  return <Box>{posts.length > 0 && <PostList posts={posts} handleLoadMore={handleLoadMore} />}</Box>;
};

export default TabPost;
