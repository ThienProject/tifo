import React from 'react';
import ConfirmationDialog from 'src/components/model/confirmation_dialog';
import ModalLoading from 'src/components/model/ModalLoading';
import MODAL_IDS from 'src/constants/modal';
import { IconButton } from '@mui/material';
import { useAppDispatch } from 'src/redux_store';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import CloseIcon from '@mui/icons-material/Close';
const ModalLoadingCreate = () => {
  const dispatch = useAppDispatch();
  const ConfirmContent = () => (
    <IconButton
      sx={{ position: 'fixed', top: 10, right: 10 }}
      onClick={() => {
        dispatch(
          openModal({
            modalId: MODAL_IDS.confirmCancelPost,
            dialogComponent: (
              <ConfirmationDialog
                describe={'Do you want to cancel create post ?'}
                sliceName={'post'}
                functionName={'createPostThunk'}
                modalId={MODAL_IDS.confirmCancelPost}
                callback={() => {
                  dispatch(
                    closeModal({
                      modalId: MODAL_IDS.confirmCancelPost
                    })
                  );
                  dispatch(
                    closeModal({
                      modalId: MODAL_IDS.loading
                    })
                  );
                }}
              />
            )
          })
        );
      }}
    >
      {<CloseIcon />}
    </IconButton>
  );
  return <ModalLoading ConfirmForm={<ConfirmContent />} />;
};

export default ModalLoadingCreate;
