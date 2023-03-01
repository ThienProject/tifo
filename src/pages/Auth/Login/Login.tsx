import { Paper, Box, Typography, Button } from '@mui/material';
import React from 'react';
import { FormInput } from 'src/components/hooks_form/form_input';
import { useForm } from 'react-hook-form';
import { IPayloadLogin } from 'src/types/auth';
// import classNames from 'classnames/bind';
// import styles from './Login.module.scss';
import { useNavigate } from 'react-router';
import images from 'src/assets/images';
import * as yup from 'yup';
import { useAppDispatch } from 'src/redux_store';
import { loginThunk } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';
import { yupResolver } from '@hookform/resolvers/yup';

// const cx = classNames.bind(styles);
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const initLoginForm: IPayloadLogin = {
    email: '',
    password: ''
  };
  const schemaLogin = yup.object().shape({
    email: yup.string().email('Email is not invalid').required("Email can't not empty."),
    password: yup.string().required('Please enter password.').min(8)
  });
  const { control, handleSubmit } = useForm({
    defaultValues: initLoginForm,
    resolver: yupResolver(schemaLogin)
  });
  const handleOnSubmit = (data: IPayloadLogin) => {
    const { email, password } = data;
    dispatch(
      loginThunk({
        email,
        password
      })
    )
      .unwrap()
      .then((data) => {
        toastMessage.success(data.message ? data.message : 'Login success!');
        navigate('/');
      });
  };
  return (
    <Box component={'form'} sx={{ width: 350, mt: 1 }}>
      <Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
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
                label='Email'
                placeholder='Email'
                name='email'
                type='text'
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
              <Button
                onClick={handleSubmit(handleOnSubmit)}
                fullWidth
                sx={{ color: 'common.white' }}
                variant='contained'
              >
                Login
              </Button>
              <Typography sx={{ opacity: 0.6 }} fontWeight={100}>
                Or
              </Typography>
              <Button
                onClick={() => {
                  navigation('/auth/forget-password');
                }}
                sx={{ fontSize: 10 }}
              >
                Forget password
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <Typography fontWeight={100} fontSize={13}>
            {"Don't have an account?"}
            <Button
              onClick={() => {
                navigation('/auth/register');
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
