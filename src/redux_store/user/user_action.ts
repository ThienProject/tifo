import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'src/clients/http/user_api';
import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { IPayloadGetPost } from 'src/types/post';
import { toastMessage } from 'src/utils/toast';

export const loginThunk = createAsyncThunk<any, IPayloadLogin>(
  'user/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.login(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getNotifications = createAsyncThunk<any, { id_user: string }>(
  'user/getNotifications',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getNotifications(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getUserThunk = createAsyncThunk<any, { id_user: string }>(
  'user/getUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getUser(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const registerThunk = createAsyncThunk<any, IPayloadRegister>(
  'user/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data }: any = await userApi.register(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getPostsThunk = createAsyncThunk<any, IPayloadGetPost>(
  'user/getPostsThunk',
  async (payload: IPayloadGetPost, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getPosts(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getReelsThunk = createAsyncThunk<any, IPayloadGetPost>(
  'user/getReelsThunk',
  async (payload: IPayloadGetPost, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getReels(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getSavesThunk = createAsyncThunk<any, IPayloadGetPost>(
  'user/getSavesThunk',
  async (payload: IPayloadGetPost, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getSaves(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getUsersThunk = createAsyncThunk<any, { q: string }>(
  'user/getUsersThunk',
  async (payload: { q: string }, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getUsers(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
