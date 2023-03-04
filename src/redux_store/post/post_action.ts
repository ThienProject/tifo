import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from 'src/clients/http/post_api';
import { IPayloadCreatePost } from 'src/types/post';
import { toastMessage } from 'src/utils/toast';

export const createPostThunk = createAsyncThunk<any, FormData>('post/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await postApi.create(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});

export const getPostsThunk = createAsyncThunk<any, IPayloadCreatePost>(
  'post/getPosts',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await postApi.getPosts(payload.id_user || '');
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
