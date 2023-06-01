import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminApi } from 'src/clients/http/admin_api';

export const getNotifications = createAsyncThunk<any, { id_user: string }>(
  'admin/getNotifications',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.getNotifications(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const lockUserThunk = createAsyncThunk<any, { id_user: string; reason: string }>(
  'admin/lockUserThunk',
  async (payload: { id_user: string; reason: string }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.lockUser(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const unLockUserThunk = createAsyncThunk<any, { id_user: string }>(
  'admin/unLockUserThunk',
  async (payload: { id_user: string }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.unLockUser(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const changeRoleUserThunk = createAsyncThunk<any, { id_user: string; id_role: number }>(
  'admin/changeRoleUserThunk',
  async (payload: { id_user: string; id_role: number }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.changeRoleUser(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const lockPostThunk = createAsyncThunk<any, { id_user: string; id_post: string; reason: string }>(
  'admin/lockPostThunk',
  async (payload: { id_user: string; id_post: string; reason: string }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.lockPost(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getPostsThunk = createAsyncThunk<any, { id_user: string; limit: number; offset: number }>(
  'admin/getPostsThunk',
  async (payload: { id_user: string; limit: number; offset: number }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.getPosts(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getUsersThunk = createAsyncThunk<any, { id_role: number; limit: number; offset: number }>(
  'admin/getUsersThunk',
  async (payload: { id_role: number; limit: number; offset: number }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.getUsers(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getUserThunk = createAsyncThunk<any, { id_user: string }>(
  'admin/getUserThunk',
  async (payload: { id_user: string }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.getUser(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getPostThunk = createAsyncThunk<any, { id_post: string }>(
  'admin/getPostThunk',
  async (payload: { id_post: string }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.getPost(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const userStatisticsThunk = createAsyncThunk<any>(
  'admin/userStatisticsThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.userStatistics();
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const userStatisticsAgeThunk = createAsyncThunk<any>(
  'admin/userStatisticsAgeThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.userStatisticsAge();
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const followStatisticsThunk = createAsyncThunk<any>(
  'admin/followStatisticsThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.followStatistics();
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const postStatisticsThunk = createAsyncThunk<any>(
  'admin/postStatisticsThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.postStatistics();
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
