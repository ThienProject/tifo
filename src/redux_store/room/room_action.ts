import { createAsyncThunk } from '@reduxjs/toolkit';
import { messageApi } from 'src/clients/http/room_api';
import {
  IPayloadChats,
  IPayloadCreateChat,
  IPayloadCreateRoom,
  IPayloadDleChats,
  IPayloadRooms,
  ISearchRoom
} from 'src/types/room';

export const createChatThunk = createAsyncThunk<any, IPayloadCreateChat>(
  'rooms/createChatThunk',
  async (payload: IPayloadCreateChat, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.createChat(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createFirstChatThunk = createAsyncThunk<any, IPayloadCreateChat>(
  'rooms/createFirstChatThunk',
  async (payload: IPayloadCreateChat, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.createFirstChat(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const clearChatsThunk = createAsyncThunk<any, IPayloadDleChats>(
  'rooms/clearChatsThunk',
  async (payload: IPayloadDleChats, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.deleteChats(payload);
      return { ...data, ...payload };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const searchRoomOrUserThunk = createAsyncThunk<any, ISearchRoom>(
  'rooms/searchRoomOrUserThunk',
  async (payload: ISearchRoom, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.searchRoomOrUser(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getRoomsThunk = createAsyncThunk<any, IPayloadRooms>(
  'rooms/getRoomsThunk',
  async (payload: IPayloadRooms, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.getRooms(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createRoomThunk = createAsyncThunk<any, IPayloadCreateRoom>(
  'rooms/createRoomThunk',
  async (payload: IPayloadCreateRoom, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.createRoom(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getChatsByIDroomThunk = createAsyncThunk<any, IPayloadChats>(
  'rooms/getChatsByIDroom',
  async (payload: IPayloadChats, { rejectWithValue }) => {
    try {
      const { data } = await messageApi.getChatsByIDroom(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
