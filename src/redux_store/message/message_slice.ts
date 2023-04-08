import { createSlice } from '@reduxjs/toolkit';
import { IPost } from 'src/types/post';
import {} from './message_action';

const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {}
});

const { reducer } = messageSlice;
export default reducer;
