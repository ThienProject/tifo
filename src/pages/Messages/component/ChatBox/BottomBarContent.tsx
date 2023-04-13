import { Avatar, Tooltip, IconButton, Box, Button, styled, InputBase, useTheme, FormLabel } from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { IPayloadCreateChat } from 'src/types/group';
import { createChatThunk } from 'src/redux_store/group/group_action';
import { useParams } from 'react-router';
import { FormInput } from 'src/components/hooks_form/form_input';

const Input = styled('input')({
  display: 'none'
});

function BottomBarContent() {
  const theme = useTheme();
  const { me } = useAppSelector((state) => state.userSlice);
  const { id_group } = useParams();
  const dispatch = useAppDispatch();
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const { control, handleSubmit, reset } = useForm({ defaultValues: { message: '', image: '' } });
  const handleOnSubmit = (data: any) => {
    const id_user = me.id_user;
    const { image, message } = data;
    let base64String = '';
    if (id_user) {
      if (image) {
        const fileReader = new FileReader();
        fileReader.onload = function (event: Event) {
          const target = event.target as EventTarget;
          let contents = '';
          if (Object.prototype.hasOwnProperty.call(target, 'result')) {
            contents = (target as any).result;
          }
          base64String = contents.split(',')[1];
        };
        fileReader.readAsText(image);
      }
    }

    const payload: IPayloadCreateChat = { message, id_user, id_group };
    if (base64String && base64String !== '') payload.image = base64String;
    // const formData = objectToFormData(payload);
    if (message !== '' || image !== '') {
      const action = createChatThunk(payload);
      dispatch(action)
        .unwrap()
        .then(() => {
          reset();
        });
    }
  };

  return (
    <Box
      sx={{
        background: theme.palette.grey[50],
        display: 'flex',
        alignItems: 'center',
        p: 2
      }}
      component='form'
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Box flexGrow={1} display='flex' alignItems='center'>
        <Avatar sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} alt={user.name} src={user.avatar} />
        <FormInput
          type='text'
          variant='standard'
          placeholder='Write your message here...'
          name='message'
          control={control}
          inputBase
        />
      </Box>
      <Box>
        <Tooltip arrow placement='top' title='Choose an emoji'>
          <IconButton sx={{ fontSize: theme.typography.pxToRem(16) }} color='primary'>
            😀
          </IconButton>
        </Tooltip>
        <Controller
          control={control}
          name='image'
          render={({ field: { value, onChange } }) => {
            return (
              <Input
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    onChange(files[0]);
                  }
                }}
                accept='image/*'
                id='messenger-upload-file'
                type='file'
              />
            );
          }}
        />

        <Tooltip arrow placement='top' title='Attach a file'>
          <FormLabel htmlFor='messenger-upload-file'>
            <IconButton sx={{ mx: 1 }} color='primary' component='span'>
              <AttachFileTwoToneIcon fontSize='small' />
            </IconButton>
          </FormLabel>
        </Tooltip>
        <Button type='submit' sx={{ color: '#fff' }} startIcon={<SendTwoToneIcon />} variant='contained'>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default BottomBarContent;
