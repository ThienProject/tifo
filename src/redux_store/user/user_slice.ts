import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from './user_action';

const authLocalStorage: any = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;

const { me, accessToken, refreshToken } = authLocalStorage || { me: '', accessToken: '', refreshToken: '' };

const initialState = {
  me,
  accessToken,
  refreshToken
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.me = null;
      state.refreshToken = null;
      state.accessToken = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.me = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem('auth', JSON.stringify({ me: user, accessToken, refreshToken }));
    });
  }
});

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer;
