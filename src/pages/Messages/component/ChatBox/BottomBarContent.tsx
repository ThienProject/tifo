import { Avatar, Tooltip, IconButton, Box, Button, styled, useTheme, FormLabel } from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { IPayloadCreateChat } from 'src/types/room';
import { createChatThunk, createFirstChatThunk } from 'src/redux_store/room/room_action';
import { useNavigate, useParams } from 'react-router';
import { FormInput } from 'src/components/hooks_form/form_input';
import { createChat } from 'src/redux_store/room/room_slice';
import { CPath } from 'src/constants';

const Input = styled('input')({
  display: 'none'
});

function BottomBarContent() {
  const theme = useTheme();
  const { me } = useAppSelector((state) => state.userSlice);
  const { id_room, id_user } = useParams();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const { control, handleSubmit, reset } = useForm({ defaultValues: { message: '', image: '' } });
  const handleOnSubmit = (data: any) => {
    const id_me = me.id_user;
    const { image, message } = data;
    let base64String = '';
    if (id_me) {
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

    const payload: IPayloadCreateChat = { message, id_user: id_me, id_room };
    if (id_user) {
      payload.id_friend = id_user;
    }
    if (base64String && base64String !== '') payload.image = base64String;
    if (message !== '' || image !== '') {
      const action = id_user ? createFirstChatThunk(payload) : createChatThunk(payload);
      dispatch(action)
        .unwrap()
        .then((data) => {
          const { id_room } = data;
          if (id_user && id_room) {
            navigation(`/message/${id_room}`);
          }
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
        <Avatar
          sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}
          alt={me.username}
          src={CPath.host_user + me.avatar}
        />
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
          render={({ field: { onChange } }) => {
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
