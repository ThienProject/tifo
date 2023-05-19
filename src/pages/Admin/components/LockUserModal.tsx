import { Box, Button, Divider, Typography } from '@mui/material';
import { FormInput } from 'src/components/hooks_form/form_input';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import UserItem from 'src/components/items/UserItem';
import { IUserAdmin } from 'src/types/user';
import { lockUserThunk } from 'src/redux_store/admin/admin_action';
import { useAppDispatch } from 'src/redux_store';
import { toastMessage } from 'src/utils/toast';
const LockUserModal = ({ user }: { user: IUserAdmin }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({ defaultValues: { reason: '' } });
  const handleOnSubmit = (data: any) => {
    const action = lockUserThunk({ id_user: user.id_user!, reason: data.reason });
    dispatch(action)
      .unwrap()
      .then((data) => {
        toastMessage.success(t('toast.lockSuccess'));
        console.log(data);
      });
    console.log(data);
  };
  return (
    <ModalWrapper isFullHeight maxWidth={500} minWidth={500} modalId={MODAL_IDS.lockUser}>
      <Box padding={1} sx={{ overflowY: 'scroll', maxHeight: '100%' }}>
        <Box onSubmit={handleSubmit(handleOnSubmit)} component={'form'}>
          <Box>
            <Typography fontSize={16} my={1} variant='h4'>
              {t('admin.lock_user')}
            </Typography>
            <Divider />
            <UserItem size='small' isFullname user={user} />
          </Box>

          <FormInput
            sx={{
              fontSize: 2,
              color: 'red',
              '& label': {
                fontSize: 14
              }
            }}
            name='reason'
            placeholder='Enter reason banned ...'
            control={control}
            type='text'
            required
            multiline
            minRows={14}
          />
          <Button type='submit' sx={{ color: '#fff' }} variant='contained'>
            {t('button.submit')}
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default LockUserModal;
