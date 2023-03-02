import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { IPayloadCreatePost } from 'src/types/post';
import Media from './components/form_media';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { FormInput } from 'src/components/hooks_form/form_input';
import { FormSelect } from 'src/components/hooks_form/form_select';
import FormRadio from 'src/components/hooks_form/form_radio';

const initCreatePost: IPayloadCreatePost = {
  target: '',
  type: '',
  description: '',
  medias: new DataTransfer().files
};
const types = [
  {
    id_type: 1,
    type: 'Post'
  },
  {
    id_type: 2,
    type: 'Reel'
  }
];
const target = [
  {
    id_target: 1,
    target: 'Public'
  },
  {
    id_target: 2,
    target: 'Private'
  },
  {
    id_target: 3,
    target: 'Follower'
  }
];
const schemaCreate = yup.object().shape({
  target: yup.string().required(),
  type: yup.string().required(),
  description: yup.string().required("Can't empty description! "),
  medias: yup.array().required("Can't empty media")
});

const Create = () => {
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: initCreatePost,
    resolver: yupResolver(schemaCreate)
  });
  const handleOnSubmit = (data: IPayloadCreatePost) => {
    const id_user = me?.id_user;
    const { target, type, description, medias } = data;

    console.log(data);
  };
  return (
    <Box component='form' m={2} onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container>
        <Grid item lg={5}>
          <Paper variant='outlined' sx={{ mr: 2 }}>
            <Media
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
          <Box sx={{ mb: 3 }}>
            <Typography>Allow users to comment </Typography>
            <FormRadio keyOption='id_type' options={types} control={control} name='type' labelOption={'type'} />
          </Box>
          <Button sx={{ color: 'common.white', mt: 2 }} variant='contained' type='submit'>
            Upload
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Create;
