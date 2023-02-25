import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './user_action';

const getLocal: any = localStorage.getItem('user_account')
  ? JSON.parse(localStorage.getItem('user_account') || '')
  : null;

const initialState = {
  me: getLocal,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      console.log('test');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log('lot');
      state.me = action.payload;
      localStorage.setItem('user_account', JSON.stringify(action.payload));
    });
  },
});

const { actions, reducer } = userSlice;
export const {} = actions;
export default reducer;
