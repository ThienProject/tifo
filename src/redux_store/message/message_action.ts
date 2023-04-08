import { createAsyncThunk } from '@reduxjs/toolkit';
import { messageApi } from 'src/clients/http/message_api';
import { IPayloadChats, IPayloadGroups } from 'src/types/message';
import { IPayloadCreateComment, IPayloadEditComment, IPayloadGetPost, IUpdateLove } from 'src/types/post';
import { toastMessage } from 'src/utils/toast';

export const getGroupsThunk = createAsyncThunk<any, IPayloadGetPost>(
  'post/getGroupsThunk',
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
  'post/getChatsByIDGroup',
  async (payload: IPayloadChats, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.getChatsByIDGroup(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);