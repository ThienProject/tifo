import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminApi } from 'src/clients/http/admin_api';
import { IPayloadGetPost } from 'src/types/post';
import { IPayloadGetUsers } from 'src/types/user';


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

// export const getPostsThunk = createAsyncThunk<any, IPayloadGetPost>(
//   'admin/getPostsThunk',
//   async (payload: IPayloadGetPost, { rejectWithValue }) => {
//     try {
//       const { data } = await postApi.getPostsByIDUser(payload);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const getUsersThunk = createAsyncThunk<any, { id_role: number, limit: number, offset: number }>(
  'admin/getUsersThunk',
  async (payload: { id_role: number, limit: number, offset: number }, { rejectWithValue }) => {
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
