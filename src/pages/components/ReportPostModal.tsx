import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/components/hooks_form/form_input';
import { IPost } from 'src/types/post';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { reportPostThunk } from 'src/redux_store/user/user_action';
import { toastMessage } from 'src/utils/toast';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
const ReportPostModal = ({ post }: { post: IPost }) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({ defaultValues: { reason: '' } });
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const handleOnSubmit = (data: any) => {
    const action = reportPostThunk({ id_post: post.id_post, id_user: me?.id_user, reason: data.reason });
    dispatch(action)
      .unwrap()
      .then(() => {
        toastMessage.success(t('toast.submit'));
        dispatch(closeModal({ modalId: MODAL_IDS.reportPost }));
      });
  };
  return (
    <ModalWrapper isFullHeight maxWidth={500} minWidth={500} modalId={MODAL_IDS.reportPost}>
      <Box padding={1} sx={{ overflowY: 'scroll', maxHeight: '100%' }}>
        <Box onSubmit={handleSubmit(handleOnSubmit)} component={'form'}>
          <Box>
            <Typography fontSize={16} my={1} variant='h4'>
              {t('postDetail.report')}
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
            placeholder='Enter reason report ...'
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

export default ReportPostModal;
