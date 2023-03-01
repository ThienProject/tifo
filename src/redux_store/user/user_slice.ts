import { createSlice } from '@reduxjs/toolkit';
import { toastMessage } from 'src/utils/toast';
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
      console.log('có');
      localStorage.clear();
      toastMessage.success('Bye bye, See you again !');
      state.me = null;
      state.refreshToken = null;
      state.accessToken = null;
    }
    // setName: (state, action) => {
    //   console.log('test');
    // }
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
