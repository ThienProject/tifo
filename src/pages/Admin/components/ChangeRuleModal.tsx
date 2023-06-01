import { Box, Button, Divider, Typography } from '@mui/material';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import UserItem from 'src/components/items/UserItem';
import { IUserAdmin } from 'src/types/user';
import { useAppDispatch } from 'src/redux_store';
import { toastMessage } from 'src/utils/toast';
import { changeRoleUserThunk } from 'src/redux_store/admin/admin_action';
import { FormSelect } from 'src/components/hooks_form/form_select';
const roles = [
  { label: 'Admin', role: 1 },
  { label: 'User', role: 2 }
];
const ChangeRoleModal = ({ user }: { user: IUserAdmin }) => {
  console.log(user);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({ defaultValues: { role: user.id_role } });
  const handleOnSubmit = (data: any) => {
    const { role } = data;
    console.log({ role });
    if (role) {
      const action = changeRoleUserThunk({ id_user: user.id_user!, id_role: role });
      dispatch(action)
        .unwrap()
        .then((data) => {
          toastMessage.success(t('toast.changeRoleUserSuccess'));
          console.log(data);
        });
    }
  };
  return (
    <ModalWrapper maxWidth={400} minWidth={400} modalId={MODAL_IDS.changeRuleUser}>
      <Box padding={1} sx={{ maxHeight: 550 }}>
        <Box onSubmit={handleSubmit(handleOnSubmit)} component={'form'}>
          <Box>
            <Typography fontSize={16} my={1} variant='h4'>
              {t('admin.users.changeRole')}
            </Typography>
            <Divider />
            <UserItem size='small' isFullname user={user} />
          </Box>
          <FormSelect options={roles} labelOption='label' keyOption='role' name='role' control={control} />
          <Button type='submit' sx={{ color: '#fff', mt: 2 }} variant='contained'>
            {t('button.confirm')}
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default ChangeRoleModal;
