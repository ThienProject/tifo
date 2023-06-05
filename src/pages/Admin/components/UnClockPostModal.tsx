import { Box, Button, Divider, Typography } from '@mui/material';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { unLockPostThunk } from 'src/redux_store/admin/admin_action';
import { useAppDispatch } from 'src/redux_store';
import { toastMessage } from 'src/utils/toast';
import { IPostAdmin } from 'src/types/post';
import CustomTypography from 'src/components/CustomTypography';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
const UnlockPostModal = ({ post }: { post: IPostAdmin }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm({ defaultValues: { reason: '' } });
  const handleOnSubmit = () => {
    const action = unLockPostThunk({ id_post: post.id_post! });
    dispatch(action)
      .unwrap()
      .then(() => {
        toastMessage.success(t('toast.unlockSuccess'));
        dispatch(closeModal({ modalId: MODAL_IDS.unLockPost }));
      });
  };
  return (
    <ModalWrapper maxWidth={300} minWidth={300} modalId={MODAL_IDS.unLockPost}>
      <Box padding={1} sx={{ maxHeight: 350 }}>
        <Box onSubmit={handleSubmit(handleOnSubmit)} component={'form'}>
          <Box>
            <Typography fontSize={16} my={1} variant='h4'>
              {t('admin.users.unLockPost')}
            </Typography>
            <Divider />
            <Typography my={2} fontWeight={'500'} fontSize={14} variant='h4'>
              {post?.id_post}
            </Typography>
            {post?.description && <CustomTypography max={100} text={post.description} />}
          </Box>

          <Button type='submit' sx={{ color: '#fff', mt: 2 }} variant='contained'>
            {t('button.confirm')}
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default UnlockPostModal;
