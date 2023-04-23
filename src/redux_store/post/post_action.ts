import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from 'src/clients/http/post_api';
import { IPayloadCreateComment, IPayloadEditComment, IPayloadGetPost, IUpdateLove } from 'src/types/post';

export const createPostThunk = createAsyncThunk<any, FormData>(
  'post/createPostThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.create(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updatePostThunk = createAsyncThunk<any, FormData>(
  'post/updatePostThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.update(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const updateLoveThunk = createAsyncThunk<any, IUpdateLove>(
  'post/updateLoveThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.updateLove(payload);
      return { ...data, ...payload };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const deletePostThunk = createAsyncThunk<any, { id_post: string }>(
  'post/deletePostThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.deletePost(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const deleteMediasThunk = createAsyncThunk<any, any>(
  'post/deleteMediasThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.deleteMedias(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const replaceMediasThunk = createAsyncThunk<any, FormData>(
  'post/replaceMediasThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.replaceMedias(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getPostsThunk = createAsyncThunk<any, IPayloadGetPost>(
  'post/getPostsThunk',
  async (payload: IPayloadGetPost, { rejectWithValue }) => {
    try {
      const { data } = await postApi.getPosts(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getPostByIDThunk = createAsyncThunk<any, { id_post: string }>(
  'post/getPostByIDThunk',
  async (payload: { id_post: string }, { rejectWithValue }) => {
    try {
      const { data } = await postApi.getPostByID(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const sendCommentThunk = createAsyncThunk<any, IPayloadCreateComment>(
  'post/sendCommentThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.sendComment(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getCommentsThunk = createAsyncThunk<any, string>(
  'get/getCommentsThunk',
  async (payload: string, { rejectWithValue }) => {
    try {
      const { data } = await postApi.getComments(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const editCommentThunk = createAsyncThunk<any, IPayloadEditComment>(
  'comment/editCommentThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.editComment(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const deleteCommentThunk = createAsyncThunk<any, any>(
  'comment/deleteCommentThunk',
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await postApi.deleteComment(payload);
      return { ...data, ...payload };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
