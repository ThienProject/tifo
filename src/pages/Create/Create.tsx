import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, Typography, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IPayloadCreatePost } from 'src/types/post';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { FormInput } from 'src/components/hooks_form/form_input';
import { FormSelect } from 'src/components/hooks_form/form_select';
import { createPostThunk, getDescriptionAutoThunk } from 'src/redux_store/post/post_action';
import { toastMessage } from 'src/utils/toast';
import { objectToFormData, schemaCreatePost } from 'src/functions';
import { useIsRequestPending } from 'src/hooks/use_status';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import Media from 'src/components/hooks_form/form_media';
import ModalLoadingCreate from '../components/ModalLoadingCreate';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
const initCreatePost: IPayloadCreatePost = {
  target: 'public',
  type: '',
  description: '',
  medias: []
};

const Create = (props: { type: string }) => {
  const isLoading = useIsRequestPending('post', 'createPostThunk');
  const { t } = useTranslation();
  const [isLoadingSuggest, setIsLoadingSuggest] = useState(false);
  const { type } = props;
  const [suggest, setSuggest] = useState('');
  const { me } = useAppSelector((state: any) => state.userSlice);
  const dispatch = useAppDispatch();
  const target = [
    {
      target: 'public',
      label: t('createPost.type.public')
    },
    {
      target: 'private',
      label: t('createPost.type.private')
    },
    {
      target: 'follower',
      label: t('createPost.type.follower')
    }
  ];
  const schemaCreate = schemaCreatePost('target', 'description', 'medias');

  const { control, handleSubmit, reset, setValue, getValues } = useForm({
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
      type: type === 'reels' ? 'reel' : 'post'
    };
    const formData = objectToFormData(payload);
    const action = createPostThunk(formData);
    await dispatch(action)
      .unwrap()
      .then(() => {
        reset();
        setSuggest('');
        toastMessage.success(t('createPost.toast.createSuccess') || '');
      });
  };
  const handleSuggest = async () => {
    const value = getValues('description');
    if (value) {
      setIsLoadingSuggest(true);
      const status = `tạo 1 status độ dài 30 từ với từ khóa : ${value}`;
      const action = getDescriptionAutoThunk({ prompt: status });
      dispatch(action)
        .unwrap()
        .then((data) => {
          const { description } = data;
          if (description) {
            setSuggest(description.replace(/\n/g, ''));
          } else {
            toastMessage.error('Hệ thống gợi ý với AI đang bận!');
          }
          setIsLoadingSuggest(false);
        })
        .catch(() => {
          setIsLoadingSuggest(false);
        });
    } else {
      toastMessage.error('Vui lòng nhập mô tả trước');
    }
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
        {t('createPost.uploadTitle')}
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
            <FormInput
              sx={{
                fontSize: 2,
                color: 'red',
                '& label': {
                  fontSize: 14
                }
              }}
              placeholder={t('createPost.description') || ''}
              name='description'
              control={control}
              type='text'
              required
              multiline
              maxRows={4}
              minRows={4}
            />
          </Box>
          <Box width={'fitContent'} boxShadow={2} sx={{ mb: 3, p: 2 }}>
            <LoadingButton variant='outlined' onClick={handleSuggest} loading={isLoadingSuggest}>
              <PsychologyAltOutlinedIcon />
              {t('createPost.suggest')}
            </LoadingButton>
            {suggest && (
              <Box mt={1} height={55}>
                <Typography
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                  onClick={() => {
                    setValue('description', suggest);
                  }}
                >
                  {suggest}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography> {t('createPost.target')} </Typography>
            <FormSelect control={control} name='target' options={target} keyOption='target' labelOption='label' />
          </Box>
          <Button sx={{ color: 'common.white', mt: 2 }} variant='contained' type='submit'>
            {t('createPost.upload')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Create;
