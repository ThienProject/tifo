import { createSlice } from '@reduxjs/toolkit';

import { IModal, IModalState } from 'src/types/modal';

interface IModalPayload {
  payload: IModal;
}

const initialState = {} as IModalState;

const modalSlice = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    openModal: (state, action: IModalPayload) => {
      console.log("open modal")
      const { modalId, dialogComponent } = action.payload;
      state[modalId] = {
        open: true,
        dialogComponent
      };
    },

    closeModal: (state, action: IModalPayload) => {
      const { modalId } = action.payload;
      delete state[modalId as keyof IModalState];
    },

    resetModal: () => initialState
  }
});

export const { openModal, closeModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
