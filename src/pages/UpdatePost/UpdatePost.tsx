import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, Typography, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IPayloadUpdatePost, IPost } from 'src/types/post';
import Media from '../../components/hooks_form/form_media';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { FormInput } from 'src/components/hooks_form/form_input';
import { FormSelect } from 'src/components/hooks_form/form_select';
import {
  deleteMediasThunk,
  getPostByIDThunk,
  replaceMediasThunk,
  updatePostThunk
} from 'src/redux_store/post/post_action';
import { toastMessage } from 'src/utils/toast';
import { objectToFormData, schemaCreatePost } from 'src/functions';
import { useIsRequestError, useIsRequestPending } from 'src/hooks/use_status';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import { useLocation } from 'react-router';
import ModalLoadingCreate from '../components/ModalLoadingCreate';
const initUpdatePostPost: IPayloadUpdatePost = {
  target_update: '',
  type: '',
  description_update: '',
  medias_update: []
};
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
const schemaUpdatePost = schemaCreatePost('target_update', 'description_update', 'medias_update');

const UpdatePost = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoading = useIsRequestPending('post', 'updatePostThunk');
  const isError = useIsRequestError('post', 'updatePostThunk');
  const [post, setPost] = useState<IPost>();
  const [mediasReplace, setMediaReplace] = useState<any[]>([]);
  const [mediasDelete, setMediaDelete] = useState<{ id_media: string; media_link: string }[]>([]);

  const { me } = useAppSelector((state: any) => state.userSlice);
  const handleReplaceMedia = (id_media: string, media_link: string, value: File) => {
    setMediaReplace((prev: any[]) => {
      return [...prev, { old_media: { id_media, media_link }, media: value }];
    });
  };
  const handleDeleteMedia = (deletes: { id_media: string; media_link: any }[]) => {
    setMediaDelete((prev: any[]) => {
      return [...prev, ...deletes];
    });
  };
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initUpdatePostPost,
    resolver: yupResolver(schemaUpdatePost)
  });

  const handleSendMediasReplace = async () => {
    if (mediasReplace.length > 0) {
      const replaceForm = new FormData();
      const old_medias = [];
      for (let i = 0; i < mediasReplace.length; i++) {
        const mediaObj = mediasReplace[i];
        replaceForm.append(`medias`, mediaObj.media);
        old_medias.push(mediaObj.old_media);
      }
      replaceForm.append(`old_medias`, JSON.stringify(old_medias));
      // log form
      for (const [key, value] of mediasReplace.entries()) {
        console.log(key + ' : ', value);
      }
      const actionReplace = replaceMediasThunk(replaceForm);
      await dispatch(actionReplace)
        .unwrap()
        .then(() => {
          reset();
          // toastMessage.success('media post success !');
        });
    }
  };
  const handleSendMediasDelete = async () => {
    if (mediasDelete.length > 0) {
      const actionDelete = deleteMediasThunk({ medias: mediasDelete });
      await dispatch(actionDelete)
        .unwrap()
        .then(() => {
          reset();
        });
    }
  };
  const handleUpdatePost = async (data: IPayloadUpdatePost) => {
    const id_user = me?.id_user;
    const { target_update, description_update, medias_update } = data;
    const newMedias = medias_update?.filter((media) => {
      const index = mediasReplace.findIndex((item) => {
        return item.media.name === media.name;
      });
      if (index == -1) {
        return media;
      }
    });
    const payload = {
      id_post: post?.id_post,
      target: target_update,
      description: description_update,
      medias: newMedias,
      id_user
    };
    const actionForm = objectToFormData(payload);
    const actionUpdateForm = updatePostThunk(actionForm);
    await dispatch(actionUpdateForm)
      .unwrap()
      .then((data) => {
        const post = data.post;
        setPost(post);
        setMediaDelete([]);
        setMediaReplace([]);
        reset({
          medias_update: post?.medias,
          description_update: post?.description,
          target_update: post?.target,
          type: post?.type
        });
        toastMessage.success('update post success !');
      });
  };
  const handleOnSubmit = async (data: IPayloadUpdatePost) => {
    await handleSendMediasReplace();
    await handleSendMediasDelete();
    await handleUpdatePost(data);
  };

  useEffect(() => {
    if (isLoading) dispatch(openModal({ modalId: MODAL_IDS.loading, dialogComponent: <ModalLoadingCreate /> }));
    else {
      dispatch(closeModal({ modalId: MODAL_IDS.loading, dialogComponent: <ModalLoadingCreate /> }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  useEffect(() => {
    if (isError) {
      toastMessage.error('Network is slow, Please try again later !');
    }
  }, [isError]);
  useEffect(() => {
    const pathArray = location.pathname.split('/');
    const postId = pathArray[2];
    if (postId.startsWith('POST_')) {
      const action = getPostByIDThunk({ id_post: postId });
      dispatch(action)
        .unwrap()
        .then((data: any) => {
          const post: IPost = data.post;
          setPost(post);
          reset({
            medias_update: post?.medias,
            description_update: post?.description,
            target_update: post?.target,
            type: post?.type
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box component='form' m={2} onSubmit={handleSubmit(handleOnSubmit)}>
      <Typography fontWeight={600} fontSize={20} variant='h2'>
        UPDATE POST
      </Typography>
      <Divider sx={{ p: 0, mt: 0.2, mb: 2 }} />
      <Grid container>
        <Grid item lg={5}>
          <Paper variant='outlined' sx={{ mr: 2 }}>
            {
              <Media
                multiple={post?.type === 'post' ? true : false}
                accept={post?.type === 'post' ? 'video/*, image/*' : 'video/*'}
                sx={{ display: 'block', maxHeight: '85vh', overflowY: 'auto', p: 2 }}
                name='medias_update'
                control={control}
                handleReplaceMedia={handleReplaceMedia}
                handleDeleteMedia={handleDeleteMedia}
              />
            }
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
              name='description_update'
              control={control}
              type='text'
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography>Who can watch this video </Typography>
            <FormSelect
              control={control}
              name='target_update'
              // label='public'
              placeholder='-- select --'
              options={target}
              keyOption='target'
              labelOption='target'
            />
          </Box>
          <Button sx={{ color: 'common.white', mt: 2 }} variant='contained' type='submit'>
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdatePost;
