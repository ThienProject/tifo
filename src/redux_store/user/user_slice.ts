import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from './user_action';

const authLocalStorage: any = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;

const { me, socket, accessToken, refreshToken } = authLocalStorage || {
  me: '',
  socket: null,
  accessToken: '',
  refreshToken: ''
};

const initialState = {
  me,
  socket,
  accessToken,
  refreshToken
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      const socket = action.payload;
      state.socket = socket;
    },
    removeSocket: (state) => {
      state.socket = initialState.socket;
    },
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
export const { logout, setSocket, removeSocket } = actions;
export default reducer;
