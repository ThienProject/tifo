import { Paper, Box, Typography, Button } from '@mui/material';
import React from 'react';
import { FormInput } from 'src/components/hooks_form/form_input';
import { useForm } from 'react-hook-form';
import { IPayloadRegister } from 'src/types/auth';
import { useNavigate } from 'react-router';
import images from 'src/assets/images';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'src/redux_store';
import { registerThunk } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';

const initRegisterForm: IPayloadRegister = {
  email: '',
  password: '',
  fullname: '',
  username: ''
};

const schemaRegister = yup.object().shape({
  email: yup.string().email('Email is not invalid').required("Email can't not empty."),
  password: yup.string().required('Please enter password.').min(8),
  fullname: yup.string().required('Please enter fullname'),
  username: yup.string().required('Please enter fullname'),
  confirmPassword: yup
    .string()
    .required('Password can not empty.')
    .min(8, 'Password must be at least 8 characters')
    .when('password', (password, field: any) => {
      return password
        ? field.required('Password incorrect.').oneOf([yup.ref('password')], 'Password incorrect.')
        : field;
    })
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: initRegisterForm,
    resolver: yupResolver(schemaRegister)
  });
  const handleOnSubmit = (data: IPayloadRegister) => {
    const { email, password, fullname, username } = data;

    dispatch(
      registerThunk({
        email,
        password,
        fullname,
        username
      })
    )
      .unwrap()
      .then((data) => {
        toastMessage.success(data.message ? data.message : 'Register success!');
        navigate('/auth/login');
      });
  };
  return (
    <Box component='form' sx={{ width: 350 }}>
      <Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 4 }}>
          <Box>
            <Box
              sx={{
                '& input': {
                  fontSize: 13,
                  color: 'text.primary'
                }
              }}
              gap={1}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <img style={{ width: '240px' }} alt='tifo logo' src={images.full_Logo_white} />
              <FormInput
                label='Email'
                sx={{
                  fontSize: 2,
                  color: 'red',
                  '& label': {
                    fontSize: 14
                  }
                }}
                placeholder='Email'
                name='email'
                control={control}
                type='text'
                required
              />
              <FormInput
                control={control}
                label='Username'
                placeholder='Username'
                sx={{
                  fontSize: 2,
                  color: 'red',
                  '& label': {
                    fontSize: 14
                  }
                }}
                type='text'
                name='username'
                required
              />
              <FormInput
                sx={{
                  fontSize: 2,
                  color: 'red',
                  '& label': {
                    fontSize: 14
                  }
                }}
                label='Fullname'
                placeholder='Fullname'
                type='text'
                name='fullname'
                required
                control={control}
              />
              <FormInput
                sx={{
                  fontSize: 2,
                  color: 'red',
                  '& label': {
                    fontSize: 14
                  },
                  '& svg': {
                    fontSize: 18
                  }
                }}
                label='Password'
                placeholder='Password'
                type='password'
                name='password'
                required
                control={control}
              />
              <FormInput
                sx={{
                  fontSize: 2,
                  color: 'red',
                  '& label': {
                    fontSize: 14
                  },
                  '& svg': {
                    fontSize: 18
                  }
                }}
                label='Confirm Password'
                placeholder='Confirm Password'
                type='password'
                name='confirmPassword'
                required
                control={control}
              />
              <Button
                onClick={handleSubmit(handleOnSubmit)}
                fullWidth
                sx={{ color: 'common.white' }}
                variant='contained'
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <Typography fontWeight={100} fontSize={13}>
            {'Do you have an account?'}{' '}
            <Button
              onClick={() => {
                navigate('/auth/login');
              }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
