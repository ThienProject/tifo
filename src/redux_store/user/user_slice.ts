import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, updateImageThunk, updateInfoThunk, updateInvisible } from './user_action';
import * as io from 'socket.io-client';
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
      localStorage.removeItem('auth');
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
      if (state.socket) {
        state.socket.disconnect();
        const socket = io.connect('ws://localhost:8000', {
          query: {
            id_user: user?.id_user
          }
        });
        state.socket = socket;
      }
    });
    builder.addCase(updateInvisible.fulfilled, (state, action) => {
      const { invisible } = action.payload;
      state.me.invisible = invisible;
    });
    builder.addCase(updateInfoThunk.fulfilled, (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      if (user) {
        state.me = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        localStorage.setItem('auth', JSON.stringify({ me: user, accessToken, refreshToken }));
      }
    });
    builder.addCase(updateImageThunk.fulfilled, (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      if (user) {
        state.me = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        localStorage.setItem('auth', JSON.stringify({ me: user, accessToken, refreshToken }));
      }
    });
  }
});

const { reducer, actions } = userSlice;
export const { logout, setSocket, removeSocket } = actions;
export default reducer;
