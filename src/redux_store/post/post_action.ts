import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from 'src/clients/http/post_api';
import { IPayloadCreateComment, IPayloadEditComment, IPayloadGetPost } from 'src/types/post';
import { toastMessage } from 'src/utils/toast';

export const createPostThunk = createAsyncThunk<any, FormData>(
  'post/createPostThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.create(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
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

export const sendCommentThunk = createAsyncThunk<any, IPayloadCreateComment>(
  'post/sendCommentThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.sendComment(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
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
      // toastMessage.setErrors(error);
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
      toastMessage.setErrors(error);
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
      // toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
