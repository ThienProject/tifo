import { createSlice } from '@reduxjs/toolkit';

// const authLocalStorage: any = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;

// const { me, accessToken, refreshToken } = authLocalStorage || { me: '', accessToken: '', refreshToken: '' };

// const initialState = {
//   me,
//   accessToken,
//   refreshToken
// };

const postSlice = createSlice({
  name: 'post',
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

const { reducer } = postSlice;
// export const { logout } = actions;
export default reducer;
