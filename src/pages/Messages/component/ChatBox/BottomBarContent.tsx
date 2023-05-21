import { Avatar, Tooltip, IconButton, Box, Button, styled, useTheme, FormLabel } from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { IChat, IPayloadCreateChat } from 'src/types/room';
import { createChatThunk, createFirstChatThunk } from 'src/redux_store/room/room_action';
import { useNavigate, useParams } from 'react-router';
import { FormInput } from 'src/components/hooks_form/form_input';
import { CPath } from 'src/constants';
import { createChat } from 'src/redux_store/room/room_slice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { objectToFormData } from 'src/functions';

const Input = styled('input')({
  display: 'none'
});
// function convertImageToString(imageFile: File) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const imageString = reader.result;
//       resolve(imageString);
//     };

//     reader.onerror = () => {
//       reject(reader.error);
//     };

//     reader.readAsDataURL(imageFile);
//   });
// }
function BottomBarContent() {
  const theme = useTheme();
  const { me } = useAppSelector((state) => state.userSlice);
  const rooms = useAppSelector((state) => state.roomSlice.rooms);
  const { id_room, id_user } = useParams();
  const isFirstChat = !!id_user;
  const chatbot = rooms.find((item: any) => item.type === 'chatbot');
  const isChatbot = id_room && chatbot?.id_room === id_room;
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm({ defaultValues: { message: '', image: '' } });
  const [payload, setPayload] = useState<IPayloadCreateChat>({});
  useEffect(() => {
    const id_me = me?.id_user;
    const payload: IPayloadCreateChat = { id_user: id_me, id_room };
    if (chatbot && isChatbot) {
      payload.isChatbot = true;
    }
    if (id_user) {
      payload.id_friend = id_user;
    }
    setPayload(payload);
  }, []);
  useEffect(() => {
    if (payload?.message || payload?.image) {
      if (payload?.isChatbot) {
        handSendMessageWithChatbot(payload);
        reset();
      } else {
        const formData = objectToFormData(payload);
        const action: any = isFirstChat ? createFirstChatThunk(payload) : createChatThunk(formData);
        dispatch(action)
          .unwrap()
          .then((data: any) => {
            const { id_room, chat, id_user: idChatbot, date } = data;
            if (isChatbot) {
              const action = createChat({ chat, id_room, id_user: idChatbot, date });
              dispatch(action);
            }
            if (isFirstChat && id_room) {
              navigation(`/message/${id_room}`);
            }
            reset();
            setPayload((prev) => ({
              ...prev,
              message: '',
              image: ''
            }));
          });
      }
    }
  }, [payload]);
  const handleSendImage = (image: File) => {
    console.log(image);
    if (image) {
      setPayload((prev) => ({
        ...prev,
        image,
        type: 'image'
      }));
    }
    // if (base64String && base64String !== '') payload.image = base64String;
  };

  const handleOnSubmit = (data: any) => {
    const { message } = data;
    if (message !== '') {
      setPayload((prev) => ({ ...prev, message }));
    }
  };
  const handSendMessageWithChatbot = ({ message, id_user, id_room }: IPayloadCreateChat) => {
    const today = moment().format('YYYY-MM-DD');
    const currentDate = new Date();
    const datetime = currentDate.toISOString();
    const chat: IChat = { message, datetime, ...me, id_chat: datetime };
    const action = createChat({ chat, id_room, id_user, date: today });
    dispatch(action);
  };
  return (
    <Box
      sx={{
        background: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.grey[50],
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
        {/* <Tooltip arrow placement='top' title='Choose an emoji'>
          <EmojiPicker />
          <IconButton sx={{ fontSize: theme.typography.pxToRem(16) }} color='primary'>
            😀
          </IconButton>
        </Tooltip> */}
        <Input
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              handleSendImage(files[0]);
            }
          }}
          accept='image/*'
          id='messenger-upload-file'
          type='file'
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
