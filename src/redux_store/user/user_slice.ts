import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './user_action';

const getLocal: any = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;

const initialState = {
  auth: getLocal
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setName: (state, action) => {
    //   console.log('test');
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.auth = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    });
  }
});

const { reducer } = userSlice;
// export const { setName } = actions;
// export actions;
export default reducer;
