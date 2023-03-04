import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { IPayloadCreatePost } from 'src/types/post';
import Media from './components/form_media';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { FormInput } from 'src/components/hooks_form/form_input';
import { FormSelect } from 'src/components/hooks_form/form_select';
import { createPostThunk } from 'src/redux_store/post/post_action';
import { toastMessage } from 'src/utils/toast';
import { objectToFormData } from 'src/functions';

const initCreatePost: IPayloadCreatePost = {
  target: '',
  type: '',
  description: '',
  medias: new DataTransfer().files
};

const target = [
  {
    id_target: '1',
    target: 'Public'
  },
  {
    id_target: '2',
    target: 'Private'
  },
  {
    id_target: '3',
    target: 'Follower'
  }
];
const schemaCreate = yup.object().shape({
  target: yup.string().required(),
  description: yup.string().required("Can't empty description! "),
  medias: yup.array().required("Can't empty media")
});

const Create = (props: { type: string }) => {
  const { type } = props;

  const { me } = useAppSelector((state: any) => state.userSlice);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initCreatePost,
    resolver: yupResolver(schemaCreate)
  });
  useEffect(() => {
    if (type === 'reels') reset();
  }, [type, reset]);
  const handleOnSubmit = async (data: IPayloadCreatePost) => {
    const id_user = me?.id_user;
    const { target, description, medias } = data;
    const payload = {
      id_target: target,
      description,
      medias,
      id_user,
      id_type: type === 'post' ? '1' : '2'
    };
    const formData = objectToFormData(payload);
    console.log(typeof formData);
    console.log(formData);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    await dispatch(createPostThunk(formData))
      .unwrap()
      .then(() => {
        reset();
        toastMessage.success('Create post success !');
      });
  };
  return (
    <>
      {
        <Box component='form' m={2} onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container>
            <Grid item lg={5}>
              <Paper variant='outlined' sx={{ mr: 2 }}>
                <Media
                  multiple={type === 'post' ? true : false}
                  accept={type === 'post' ? 'video/*, image/*' : 'video/*'}
                  sx={{ display: 'block', maxHeight: '85vh', overflowY: 'auto', p: 2 }}
                  name='medias'
                  control={control}
                />
              </Paper>
            </Grid>
            <Grid item lg={7}>
              <Box sx={{ mb: 3 }}>
                <Typography>Description </Typography>
                <FormInput
                  sx={{
                    fontSize: 2,
                    color: 'red',
                    '& label': {
                      fontSize: 14
                    }
                  }}
                  placeholder='Description'
                  name='description'
                  control={control}
                  type='text'
                  required
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography>Who can watch this video </Typography>
                <FormSelect
                  control={control}
                  name='target'
                  // label='public'
                  placeholder='-- select --'
                  options={target}
                  keyOption='id_target'
                  labelOption='target'
                />
              </Box>
              {/* <Box sx={{ mb: 3 }}>
            <Typography>Allow users to comment </Typography>
            <FormRadio keyOption='id_type' options={types} control={control} name='type' labelOption={'type'} />
          </Box> */}
              <Button sx={{ color: 'common.white', mt: 2 }} variant='contained' type='submit'>
                Upload
              </Button>
            </Grid>
          </Grid>
        </Box>
      }
    </>
  );
};

export default Create;
