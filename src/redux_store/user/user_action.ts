import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from 'src/clients/http/post_api';
import { userApi } from 'src/clients/http/user_api';
import { IPayloadGetUser, IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { IPayloadGetPost } from 'src/types/post';
import { IPayloadSearchRoom } from 'src/types/room';
import { IPayloadFollow, IPayloadGetUsers, IPayloadInvisible, IPayloadPassword, IUser } from 'src/types/user';

export const loginThunk = createAsyncThunk<any, IPayloadLogin>(
  'user/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.login(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const reportPostThunk = createAsyncThunk<any, { id_user: string; id_post: string; reason: string }>(
  'user/reportPostThunk',
  async (payload: { id_user: string; id_post: string; reason: string }, { rejectWithValue }) => {
    try {
      const { data } = await userApi.reportPost(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const updateInfoThunk = createAsyncThunk<any, IUser>(
  'user/updateInfoThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateInfo(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const updateImageThunk = createAsyncThunk<any, FormData>(
  'user/updateImageThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateImage(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const updatePasswordThunk = createAsyncThunk<any, IPayloadPassword>(
  'user/updatePasswordThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updatePassword(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const updateInvisible = createAsyncThunk<any, IPayloadInvisible>(
  'user/updateInvisible',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateInvisible(payload);
      return data;
    } catch (error: any) {
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
      return rejectWithValue(error);
    }
  }
);
export const getUserThunk = createAsyncThunk<any, IPayloadGetUser>(
  'user/getUser',
  async (payload: IPayloadGetUser, { rejectWithValue }) => {
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
      return rejectWithValue(error);
    }
  }
);

export const getPostsThunk = createAsyncThunk<any, IPayloadGetPost>(
  'user/getPostsThunk',
  async (payload: IPayloadGetPost, { rejectWithValue }) => {
    try {
      const { data } = await postApi.getPostsByIDUser(payload);
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
      const { data } = await postApi.getReelsByIDUser(payload);
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
      const { data } = await postApi.getSavesByIDUser(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getUsersThunk = createAsyncThunk<any, IPayloadGetUsers>(
  'user/getUsersThunk',
  async (payload: IPayloadGetUsers, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getUsers(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getFollowingsThunk = createAsyncThunk<any, IPayloadGetUsers>(
  'user/getFollowingsThunk',
  async (payload: IPayloadGetUsers, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getFollowings(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getFollowersThunk = createAsyncThunk<any, IPayloadGetUsers>(
  'user/getFollowersThunk',
  async (payload: IPayloadGetUsers, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getFollowers(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getUserSuggestsThunk = createAsyncThunk<any, IPayloadGetUsers>(
  'user/getUserSuggestsThunk',
  async (payload: IPayloadGetUsers, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getSuggests(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const requestFollowThunk = createAsyncThunk<any, IPayloadFollow>(
  'user/requestFollowThunk',
  async (payload: IPayloadFollow, { rejectWithValue }) => {
    try {
      const { data } = await userApi.requestFollow(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const acceptFollowThunk = createAsyncThunk<any, IPayloadFollow>(
  'user/acceptFollowThunk',
  async (payload: IPayloadFollow, { rejectWithValue }) => {
    try {
      const { data } = await userApi.acceptFollow(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const rejectFollowThunk = createAsyncThunk<any, IPayloadFollow>(
  'user/rejectFollowThunk',
  async (payload: IPayloadFollow, { rejectWithValue }) => {
    try {
      const { data } = await userApi.rejectFollow(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const unfollowThunk = createAsyncThunk<any, IPayloadFollow>(
  'user/unfollowThunk',
  async (payload: IPayloadFollow, { rejectWithValue }) => {
    try {
      const { data } = await userApi.unfollow(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getUsersNotInRoomThunk = createAsyncThunk<any, IPayloadSearchRoom>(
  'rooms/getUsersNotInRoomThunk',
  async (payload: IPayloadSearchRoom, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getUsersNotInRoom(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
