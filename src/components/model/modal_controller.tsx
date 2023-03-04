import React from 'react';
import { Box } from '@mui/material';

import { IModalState } from 'src/types/modal';
import { useAppSelector } from 'src/redux_store';

function ModalController() {
  const modalState = useAppSelector(({ modalSlice }: { modalSlice: IModalState }) => modalSlice);

  const modalOutput = [];

  for (const modalId in modalState) {
    const modal = modalState[modalId];
    if (modal.open) {
      modalOutput.push(modal.dialogComponent);
    }
  }

  return (
    <Box>
      {modalOutput.length
        ? modalOutput.map((modal, index) => <React.Fragment key={index}>{modal}</React.Fragment>)
        : null}
    </Box>
  );
}

export default ModalController;
