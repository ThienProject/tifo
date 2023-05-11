import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, Typography, Divider, MenuItem, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IPayloadCreatePost } from 'src/types/post';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { FormInput } from 'src/components/hooks_form/form_input';
import { FormSelect } from 'src/components/hooks_form/form_select';
import { createPostThunk } from 'src/redux_store/post/post_action';
import { toastMessage } from 'src/utils/toast';
import { objectToFormData, schemaCreatePost } from 'src/functions';
import { useIsRequestPending } from 'src/hooks/use_status';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import Media from 'src/components/hooks_form/form_media';
import ModalLoadingCreate from '../components/ModalLoadingCreate';
import { sendMessage } from 'src/clients/http/chatGPT_api';
import { LoadingButton } from '@mui/lab';
import Scrollbars from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import { t } from 'i18next';
const initCreatePost: IPayloadCreatePost = {
  target: '',
  type: '',
  description: '',
  medias: []
};

const schemaCreate = schemaCreatePost('target', 'description', 'medias');

const Create = (props: { type: string }) => {
  const isLoading = useIsRequestPending('post', 'createPostThunk');
  const { t } = useTranslation();
  const [isLoadingSuggest, setIsLoadingSuggest] = useState(false);
  const { type } = props;
  const [suggest, setSuggest] = useState([]);
  const { me } = useAppSelector((state: any) => state.userSlice);
  const dispatch = useAppDispatch();
  const target = [
    {
      target: 'public',
      label: t('createPost.uploadTitle.type.public')
    },
    {
      target: 'private',
      label: t('createPost.uploadTitle.type.private')
    },
    {
      target: 'follower',
      label: t('createPost.uploadTitle.type.follower')
    }
  ];
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
        setSuggest([]);
        toastMessage.success(t('createPost.toast.createSuccess') || '');
      });
  };
  const handleSuggest = async () => {
    setIsLoadingSuggest(true);
    const status = await sendMessage(
      `tạo 5 status 20 từ bằng tiếng việt, với từ khóa : ${getValues('description') || 'ngẫu nhiên'}`
    );

    const newArr = status
      .replaceAll(/[0-9\n]/g, '')
      .split(/[.;?]/)
      .filter((item: any) => item && item.trim() !== '');
    setSuggest(newArr);
    setIsLoadingSuggest(false);
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
            <Typography> {t('createPost.description')} </Typography>
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
            />
          </Box>
          <Box width={'fitContent'} boxShadow={2} sx={{ mb: 3, p: 2 }}>
            <LoadingButton variant='outlined' onClick={handleSuggest} loading={isLoadingSuggest}>
              <PsychologyAltOutlinedIcon />
              {t('createPost.suggest')}
            </LoadingButton>
            {suggest.length > 0 && (
              <Box height={200}>
                <Scrollbars>
                  <MenuList>
                    {suggest.map((item, index) => {
                      if (index < suggest.length - 1)
                        return (
                          <MenuItem
                            sx={{ m: 2, p: 1.5 }}
                            onClick={() => {
                              setValue('description', item);
                            }}
                            key={index}
                          >
                            <Box>{item}</Box>
                          </MenuItem>
                        );
                    })}
                  </MenuList>
                </Scrollbars>
              </Box>
            )}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography> {t('createPost.target')} </Typography>
            <FormSelect
              control={control}
              name='target'
              placeholder='-- select --'
              options={target}
              keyOption='target'
              labelOption='label'
            />
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
