import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Grid, Paper, Typography, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IPayloadCreatePost } from 'src/types/post';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { FormInput } from 'src/components/hooks_form/form_input';
import { FormSelect } from 'src/components/hooks_form/form_select';
import { createPostThunk } from 'src/redux_store/post/post_action';
import { toastMessage } from 'src/utils/toast';
import { objectToFormData, schemaCreatePost } from 'src/functions';
import { useIsRequestError, useIsRequestPending } from 'src/hooks/use_status';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';

import Media from 'src/components/hooks_form/form_media';
import ModalLoadingCreate from '../components/ModalLoadingCreate';
import { sendMessage } from 'src/clients/http/chatGPT_api';
const initCreatePost: IPayloadCreatePost = {
  target: '',
  type: '',
  description: '',
  medias: []
};
// const fileSchema = yup.object().shape({
//   name: yup.string(),
//   type: yup.string(),
//   size: yup.number().max(1000000, 'File size must not exceed 1MB')
// });
const target = [
  {
    target: 'public'
  },
  {
    target: 'private'
  },
  {
    target: 'follower'
  }
];
const schemaCreate = schemaCreatePost('target', 'description', 'medias');

const Create = (props: { type: string }) => {
  const isLoading = useIsRequestPending('post', 'createPostThunk');
  const Error = useIsRequestError('post', 'createPostThunk');
  const { type } = props;
  const [suggest, setSuggest] = useState('');
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
      target: target,
      description,
      medias,
      id_user,
      type: 'post' || 'reel'
    };
    const formData = objectToFormData(payload);
    const action = createPostThunk(formData);
    await dispatch(action)
      .unwrap()
      .then(() => {
        reset();
        toastMessage.success('Create post success !');
      });
  };

  useEffect(() => {
    if (isLoading) dispatch(openModal({ modalId: MODAL_IDS.loading, dialogComponent: <ModalLoadingCreate /> }));
    else {
      dispatch(closeModal({ modalId: MODAL_IDS.loading, dialogComponent: <ModalLoadingCreate /> }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Box component='form' m={2} onSubmit={handleSubmit(handleOnSubmit)}>
      <Typography fontWeight={600} fontSize={20} variant='h2'>
        Upload {type}
      </Typography>
      <Divider sx={{ p: 0, mt: 0.2, mb: 2 }} />
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
            <Button
              onClick={async () => {
                const status = await sendMessage(
                  'tạo một status 20 từ bằng tiếng việt, phong cách của nhà thơ xuân diệu với từ khóa : mưa'
                );
                setSuggest(status);
              }}
            >
              Suggest
            </Button>
            <Typography>{suggest && suggest}</Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography>Who can watch this video </Typography>
            <FormSelect
              control={control}
              name='target'
              // label='public'
              placeholder='-- select --'
              options={target}
              keyOption='target'
              labelOption='target'
            />
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
