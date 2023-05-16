import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: ''
};

const userSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
});

const { reducer, actions } = userSlice;
// export const { } = actions;
export default reducer;
