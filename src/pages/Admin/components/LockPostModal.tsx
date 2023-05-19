import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/components/hooks_form/form_input';
import { IPostAdmin } from 'src/types/post';
import { useAppDispatch } from 'src/redux_store';
import { lockPostThunk } from 'src/redux_store/admin/admin_action';
import { toastMessage } from 'src/utils/toast';
const LockPostModal = ({ post }: { post: IPostAdmin }) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({ defaultValues: { reason: '' } });
  const dispatch = useAppDispatch();
  const handleOnSubmit = (data: any) => {
    const action = lockPostThunk({ id_post: post.id_post, id_user: post.id_user!, reason: data.reason });
    dispatch(action)
      .unwrap()
      .then(() => {
        toastMessage.success(t('toast.lockSuccess'));
      });
  };
  return (
    <ModalWrapper isFullHeight maxWidth={500} minWidth={500} modalId={MODAL_IDS.lockPost}>
      <Box padding={1} sx={{ overflowY: 'scroll', maxHeight: '100%' }}>
        <Box onSubmit={handleSubmit(handleOnSubmit)} component={'form'}>
          <Box>
            <Typography fontSize={16} my={1} variant='h4'>
              {t('admin.lock_post')}
            </Typography>
            <Divider />
            <Typography fontSize={16} my={1} variant='h4'>
              {post.id_post}
            </Typography>
          </Box>

          <FormInput
            sx={{
              fontSize: 2,
              color: 'red',
              '& label': {
                fontSize: 14
              }
            }}
            name='reason'
            placeholder='Enter reason banned ...'
            control={control}
            type='text'
            required
            multiline
            minRows={14}
          />
          <Button type='submit' sx={{ color: '#fff' }} variant='contained'>
            {t('button.submit')}
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default LockPostModal;
