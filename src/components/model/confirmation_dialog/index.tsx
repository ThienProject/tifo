import React, { ReactNode } from 'react';
import { InfoTwoTone } from '@mui/icons-material';
import { Button, DialogTitle, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useIsRequestPending } from 'src/hooks/use_status';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';

import { useStyles } from './styles';
import { useAppDispatch } from 'src/redux_store';
import ModalWrapper from '../ModelWrapper';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const {
    modalId,
    describe,
    icon,
    sliceName,
    functionName,
    cancelLabel = t('button.cancel'),
    okLabel = t('button.confirm'),
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
        <Box className={classes.icon}>{icon ? icon : <InfoTwoTone fontSize='large' color='error' />}</Box>
        <DialogTitle sx={{ marginTop: '10px' }} className={classes.dialogTitle}>
          {describe}
        </DialogTitle>
        {children}
        <Box className={classes.actionButton}>
          <Button color='primary' onClick={handleClose}>
            {cancelLabel}
          </Button>
          <LoadingButton
            sx={{ color: '#fff' }}
            variant='contained'
            onClick={() => {
              callback && callback();
            }}
            loading={isLoading}
          >
            {okLabel}
          </LoadingButton>
        </Box>
      </Box>
    </ModalWrapper>
  );
}

export default ConfirmationDialog;
