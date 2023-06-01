import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'src/components/hooks_form/form_input';
import { useForm } from 'react-hook-form';
import FormRadio from 'src/components/hooks_form/form_radio';
import { FormDatePicker } from 'src/components/hooks_form/form_datepicker';
import { IUser } from 'src/types/user';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { updateInfoThunk } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';
import moment from 'moment';

const EditProfile = () => {
  const { t } = useTranslation();
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    fullname: yup.string().required(t('rule.required')!),
    username: yup.string().required(t('rule.required')!),
    email: yup.string().required(t('rule.required')!)
  });
  const profileDefault: IUser = {
    fullname: me?.fullname,
    username: me?.username,
    description: me?.description || '',
    phone: me?.phone || '',
    email: me?.email || '',
    birthday: me?.birthday || '',
    gender: me?.gender || ''
  };
  const { control, handleSubmit, setError } = useForm({
    defaultValues: profileDefault,
    resolver: yupResolver(schema)
  });
  const handleOnSubmit = (data: IUser) => {
    if (me?.id_user) {
      const payload: IUser = {
        ...data,
        id_user: me?.id_user
      };
      if (payload.birthday) {
        payload.birthday = moment(data.birthday).format('YYYY-MM-DD HH:mm:ss');
      }
      const action = updateInfoThunk(payload);
      dispatch(action)
        .unwrap()
        .then((data) => {
          const { rules, message } = data;
          if (message === 'duplicate') {
            for (let i = 0; i < rules.length; i++) {
              setError(rules[i], { message: t('rule.duplicate', { object: rules[i] })! });
            }
          } else {
            toastMessage.success(t('toast.update'));
          }
        });
      console.log(data);
    }
  };
  return (
    <Box component={'form'}>
      <FormInput label={t('profile.fullname')!} control={control} name={'fullname'} />
      <FormInput sx={{ mt: 2 }} label={t('profile.username')!} control={control} name={'username'} />
      <FormInput sx={{ mt: 2 }} label={t('profile.email')!} control={control} type='text' name={'email'} />
      <FormInput sx={{ mt: 2 }} label={t('profile.description')!} control={control} type='text' name={'description'} />
      <FormInput sx={{ mt: 2 }} label={t('profile.phone')!} control={control} type='text' name={'phone'} />
      <FormDatePicker
        control={control}
        label={t('profile.birthday')!}
        name='birthday'
        maxDate={new Date()}
        disableFuture={false}
        required
      />
      <FormRadio
        control={control}
        label={t('profile.gender')!}
        row
        name='gender'
        keyOption='value'
        labelOption='label'
        options={[
          {
            value: 'male',
            label: t('editProfile.gender.male')
          },
          {
            value: 'female',
            label: t('editProfile.gender.female')
          },
          {
            value: 'other',
            label: t('editProfile.gender.other')
          }
        ]}
      />
      <Button sx={{ color: 'white', mt: 2 }} onClick={handleSubmit(handleOnSubmit)} type='submit' variant='contained'>
        {t('button.submit')}
      </Button>
    </Box>
  );
};

export default EditProfile;
