import React, { ReactNode } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, DialogTitle, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useIsRequestPending } from 'src/hooks/use_status';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';

import { useStyles } from './styles';
import { useAppDispatch } from 'src/redux_store';
import ModalWrapper from '../ModelWrapper';

interface IConfirmationDialog {
  modalId: string;
  describe: ReactNode;
  cancelLabel?: string;
  okLabel?: string;
  icon?: ReactNode;
  sliceName: string;
  functionName: string;
  children?: ReactNode;
  callback: () => any;
  prevClose?: () => void;
}

function ConfirmationDialog(props: IConfirmationDialog) {
  const {
    modalId,
    describe,
    icon,
    sliceName,
    functionName,
    cancelLabel = 'Cancel',
    okLabel = 'Confirm',
    children,
    callback,
    prevClose
  } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending(sliceName, functionName);

  const handleClose = () => {
    dispatch(closeModal({ modalId }));
    if (prevClose) {
      prevClose();
    }
  };

  return (
    <ModalWrapper modalId={modalId} prevClose={prevClose}>
      <Box className={classes.dialog}>
        <Box className={classes.icon}>{icon ? icon : <Delete fontSize='large' color='error' />}</Box>
        <DialogTitle className={classes.dialogTitle}>{describe}</DialogTitle>
        {children}
        <Box className={classes.actionButton}>
          <Button color='primary' onClick={handleClose}>
            {cancelLabel}
          </Button>
          <LoadingButton variant='contained' onClick={callback} loading={isLoading}>
            {okLabel}
          </LoadingButton>
        </Box>
      </Box>
    </ModalWrapper>
  );
}

export default ConfirmationDialog;
