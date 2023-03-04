import { createSlice } from '@reduxjs/toolkit';

// const authLocalStorage: any = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;

// const { me, accessToken, refreshToken } = authLocalStorage || { me: '', accessToken: '', refreshToken: '' };

// const initialState = {
//   me,
//   accessToken,
//   refreshToken
// };

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    // setName: (state, action) => {
    //   console.log('test');
    // }
  },
  extraReducers: () => {
    // builder.addCase(postThunk.fulfilled, (state, action) => {
    //   const { user, accessToken, refreshToken } = action.payload;
    //   state.me = user;
    //   state.accessToken = accessToken;
    //   state.refreshToken = refreshToken;
    //   localStorage.setItem('auth', JSON.stringify({ me: user, accessToken, refreshToken }));
    //   setClientToken(accessToken, refreshToken);
    // });
  }
});

const { reducer } = userSlice;
// export const { logout } = actions;
export default reducer;
