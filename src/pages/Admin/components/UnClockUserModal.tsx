import { Box, Button, Divider, Typography } from '@mui/material';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import UserItem from 'src/components/items/UserItem';
import { IUserAdmin } from 'src/types/user';
import { unLockUserThunk } from 'src/redux_store/admin/admin_action';
import { useAppDispatch } from 'src/redux_store';
import { toastMessage } from 'src/utils/toast';
const UnlockUserModal = ({ user }: { user: IUserAdmin }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm({ defaultValues: { reason: '' } });
  const handleOnSubmit = () => {
    const action = unLockUserThunk({ id_user: user.id_user! });
    dispatch(action)
      .unwrap()
      .then(() => {
        toastMessage.success(t('toast.unlockSuccess'));
      });
  };
  return (
    <ModalWrapper maxWidth={300} minWidth={300} modalId={MODAL_IDS.unLockUser}>
      <Box padding={1} sx={{ maxHeight: 350 }}>
        <Box onSubmit={handleSubmit(handleOnSubmit)} component={'form'}>
          <Box>
            <Typography fontSize={16} my={1} variant='h4'>
              {t('admin.users.unLockUser')}
            </Typography>
            <Divider />
            <UserItem size='small' isFullname user={user} />
          </Box>

          <Button type='submit' sx={{ color: '#fff', mt: 2 }} variant='contained'>
            {t('button.confirm')}
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default UnlockUserModal;
