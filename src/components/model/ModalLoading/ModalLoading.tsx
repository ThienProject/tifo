import React from 'react';
import MODAL_IDS from 'src/constants/modal';
import ModalWrapper from '../ModelWrapper';
import { Box, CircularProgress } from '@mui/material';
interface IProps {
  ConfirmForm: React.ReactNode;
}

const ModalLoading = (props: IProps) => {
  const { ConfirmForm } = props;
  return (
    <ModalWrapper
      isNotAutoClose={true}
      isBgContent={false}
      modalId={MODAL_IDS.loading}
      sx={{ display: 'flex', justifyContent: 'center' }}
      ConfirmForm={ConfirmForm}
    >
      <Box>
        <CircularProgress />
      </Box>
    </ModalWrapper>
  );
};

export default ModalLoading;
