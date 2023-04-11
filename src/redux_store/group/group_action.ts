import { createAsyncThunk } from '@reduxjs/toolkit';
import { messageApi } from 'src/clients/http/group_api';
import { IPayloadChats, IPayloadCreateChat, IPayloadGroups } from 'src/types/group';

export const createChatThunk = createAsyncThunk<any, IPayloadCreateChat>(
  'groups/createChatThunk',
  async (payload: IPayloadCreateChat, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.createChat(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getGroupsThunk = createAsyncThunk<any, IPayloadGroups>(
  'groups/getGroupsThunk',
  async (payload: IPayloadGroups, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.getGroups(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getChatsByIDGroupThunk = createAsyncThunk<any, IPayloadChats>(
  'groups/getChatsByIDGroup',
  async (payload: IPayloadChats, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.getChatsByIDGroup(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
