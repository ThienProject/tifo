import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: ''
};

const userSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {}
});

const { reducer } = userSlice;
// export const { } = actions;
export default reducer;
