import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { toastMessage } from 'src/utils/toast';

const ProtectBox = ({
  children,
  id_owner,
  toLogin,
  idCloseModel
}: {
  children: React.ReactNode;
  id_owner?: string;
  toLogin?: boolean;
  idCloseModel?: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { me } = useAppSelector((state) => state.userSlice);
  if (id_owner) return <>{me?.id_user === id_owner && children}</>;
  else {
    if (toLogin && !me?.id_user) {
      return (
        <Box
          m={0}
          p={0}
          onClick={() => {
            toastMessage.error(t('toast.requestLogin'));
            if (idCloseModel) {
              const action = closeModal({ modalId: idCloseModel });
              dispatch(action);
            }
            navigate('/auth/login');
          }}
        >
          {children}
        </Box>
      );
    } else {
      return <>{me?.id_user && children}</>;
    }
  }
};

export default ProtectBox;
