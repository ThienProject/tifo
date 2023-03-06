import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from 'src/clients/http/post_api';
import { IPayloadCreatePost, IPayloadGetPost } from 'src/types/post';
import { toastMessage } from 'src/utils/toast';

export const createPostThunk = createAsyncThunk<any, FormData>(
  'post/createPostThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.create(payload);
      return data;
    } catch (error: any) {
      console.log('error post thunk ', error);
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getPostsThunk = createAsyncThunk<any, IPayloadCreatePost>(
  'post/getPostsThunk',
  async (payload: IPayloadGetPost, { rejectWithValue }) => {
    try {
      const { data } = await postApi.getPosts(payload);
      return data;
    } catch (error: any) {
      // toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
