import { Paper, Box, Typography, Button } from '@mui/material';
import React from 'react';
import { FormInput } from 'src/components/hooks_form/form_input';
import { useForm } from 'react-hook-form';
import { IPayloadLogin } from 'src/types/auth';
import { useNavigate } from 'react-router';
import images from 'src/assets/images';

const ForgetPassword = () => {
  const navigation = useNavigate();
  const initLoginForm: IPayloadLogin = {
    email: '',
    password: ''
  };
  const { control, handleSubmit } = useForm({
    defaultValues: initLoginForm
  });
  return (
    <Box sx={{ width: 350 }}>
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
                type='text'
                required
                control={control}
              />
              <FormInput
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
                control={control}
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
                name='confirm_password'
                required
                control={control}
              />
              <Button
                onClick={() => {
                  handleSubmit;
                }}
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
                navigation('/auth/login');
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

export default ForgetPassword;
