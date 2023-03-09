import { createSlice } from '@reduxjs/toolkit';
import { IPost } from 'src/types/post';
import { deleteCommentThunk, getPostsThunk, sendCommentThunk } from './post_action';

// const authLocalStorage: any = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;

// const { me, accessToken, refreshToken } = authLocalStorage || { me: '', accessToken: '', refreshToken: '' };

const posts: IPost[] = [];
const initialState = { posts: posts };

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      const { posts } = action.payload;
      for (let i = 0; i < posts.length; i++) {
        state.posts.push({
          id_post: posts[i].id_post,
          commentLength: posts[i].commentLength,
          loves: posts[i].loves
        });
      }
    });
    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      const { message, id_post } = action.payload;

      if (message) {
        const index = state.posts.findIndex((post) => post.id_post == id_post);
        if (index != -1) {
          state.posts[index].commentLength = state.posts[index].commentLength - 1;
        }
      }
    });
    builder.addCase(sendCommentThunk.fulfilled, (state, action) => {
      const { newComment } = action.payload;
      if (newComment) {
        const index = state.posts.findIndex((post) => post.id_post == newComment.id_post);
        if (index != -1) {
          state.posts[index].commentLength++;
        }
      }
    });
  }
});

const { reducer } = postSlice;
export default reducer;
