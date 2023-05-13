import { createSlice } from '@reduxjs/toolkit';
import { IPost } from 'src/types/post';
import {
  createPostThunk,
  deleteCommentThunk,
  deletePostThunk,
  getPostsThunk,
  sendCommentThunk,
  updateLoveThunk,
  updateSaveThunk
} from './post_action';
import { logout } from '../user/user_slice';

// const authLocalStorage: any = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;

// const { me, accessToken, refreshToken } = authLocalStorage || { me: '', accessToken: '', refreshToken: '' };

const posts: IPost[] = [];
const reels: IPost[] = [];
const initialState = {
  posts: posts,
  reels: reels
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    clearPost: (state) => {
      state.posts = initialState.posts;
    },
    clearReels: (state) => {
      state.reels = initialState.reels;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      const { posts, type } = action.payload;
      if (type === 'reel') {
        state.reels.push(...posts);
      } else state.posts.push(...posts);
    });
    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      const { id_post, type } = action.payload;
      if (type === 'reel') {
        const index = state.reels.findIndex((post) => post.id_post == id_post);
        state.reels.splice(index, 1);
      } else {
        const index = state.posts.findIndex((post) => post.id_post == id_post);
        state.posts.splice(index, 1);
      }
    });
    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      const { post, type } = action.payload;
      if (type === 'reel') {
        state.reels.push(post);
      } else state.posts.push(post);
    });
    builder.addCase(updateLoveThunk.fulfilled, (state, action) => {
      const { message, loves, id_post, isLove, type } = action.payload;
      console.log(action.payload);
      if (message) {
        if (type === 'reel') {
          const index = state.reels.findIndex((post) => post.id_post == id_post);
          if (index != -1) {
            state.reels[index].loves = loves;
            state.reels[index].isLove = isLove;
          }
        } else {
          const index = state.posts.findIndex((post) => post.id_post == id_post);
          if (index != -1) {
            state.posts[index].loves = loves;
            state.posts[index].isLove = isLove;
          }
        }
      }
    });
    builder.addCase(updateSaveThunk.fulfilled, (state, action) => {
      const { message, loves, id_post, isSave, type } = action.payload;
      if (message) {
        if (type === 'reel') {
          const index = state.reels.findIndex((post) => post.id_post == id_post);
          if (index != -1) {
            state.reels[index].loves = loves;
            state.reels[index].isSave = isSave;
          }
        } else {
          const index = state.posts.findIndex((post) => post.id_post == id_post);
          if (index != -1) {
            state.posts[index].loves = loves;
            state.posts[index].isSave = isSave;
          }
        }
      }
    });
    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      const { message, id_post, type } = action.payload;
      if (message) {
        if (type === 'reel') {
          const index = state.reels.findIndex((post) => post.id_post == id_post);
          if (index != -1) {
            state.reels[index].commentLength = state.reels[index].commentLength - 1;
          }
        } else {
          const index = state.posts.findIndex((post) => post.id_post == id_post);
          if (index != -1) {
            state.posts[index].commentLength = state.posts[index].commentLength - 1;
          }
        }
      }
    });
    builder.addCase(sendCommentThunk.fulfilled, (state, action) => {
      const { newComment, type } = action.payload;
      if (type === 'reel') {
        if (newComment) {
          const index = state.reels.findIndex((post) => post.id_post == newComment.id_post);
          if (index != -1) {
            state.reels[index].commentLength++;
          }
        }
      } else if (newComment) {
        const index = state.posts.findIndex((post) => post.id_post == newComment.id_post);
        if (index != -1) {
          state.posts[index].commentLength++;
        }
      }
    });
    builder.addCase(logout, (state) => {
      state.posts = initialState.posts;
      state.reels = initialState.reels;
    });
  }
});

const { reducer, actions } = postSlice;
export const { clearPost, clearReels } = actions;
export default reducer;
