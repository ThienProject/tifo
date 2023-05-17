import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'src/components/hooks_form/form_input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { IPayloadPassword } from 'src/types/user';
import { updatePasswordThunk } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';

const EditPassword = () => {
  const { t } = useTranslation();
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    currentPassword: yup.string().required(t('rule.required')!),
    confirm: yup.string().required(t('rule.required')!),
    password: yup.string().required(t('rule.required')!)
  });
  const passDefault: IPayloadPassword = {
    currentPassword: '',
    confirm: '',
    password: ''
  };
  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: passDefault,
    resolver: yupResolver(schema)
  });
  const handleOnSubmit = (data: IPayloadPassword) => {
    if (me?.id_user) {
      const password = data.password;
      const payload: IPayloadPassword = { currentPassword: data.currentPassword, password, id_user: me?.id_user };
      const action = updatePasswordThunk(payload);
      dispatch(action)
        .unwrap()
        .then(() => {
          toastMessage.success(t('toast.update'));
          reset();
        })
        .catch((e) => {
          console.log(e);
          if (e.response.message === 'invalid') {
            setError('currentPassword', { message: t('rule.invalid')! });
          }
          reset();
        });
      console.log(data);
    }
  };
  return (
    <Box component={'form'}>
      <FormInput
        sx={{
          '& svg': {
            fontSize: 18
          }
        }}
        label={t('profile.currentPass')!}
        control={control}
        type='password'
        name={'currentPassword'}
      />
      <FormInput
        sx={{
          mt: 2,
          '& svg': {
            fontSize: 18
          }
        }}
        label={t('profile.confirmPass')!}
        control={control}
        type='password'
        name={'confirm'}
      />
      <FormInput
        sx={{
          mt: 2,
          '& svg': {
            fontSize: 18
          }
        }}
        label={t('profile.newPass')!}
        control={control}
        type='password'
        name={'password'}
      />
      <Button sx={{ color: 'white', mt: 2 }} onClick={handleSubmit(handleOnSubmit)} type='submit' variant='contained'>
        {t('button.submit')}
      </Button>
    </Box>
  );
};

export default EditPassword;
