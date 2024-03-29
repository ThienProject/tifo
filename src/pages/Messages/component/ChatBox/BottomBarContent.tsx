import {
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  styled,
  useTheme,
  FormLabel,
  Typography,
  keyframes
} from '@mui/material';
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
import useChatItem from 'src/hooks/use_chatItem';
import { useIsRequestPending } from 'src/hooks/use_status';
import { useTranslation } from 'react-i18next';
import { toastMessage } from 'src/utils/toast';

const Input = styled('input')({
  display: 'none'
});

function BottomBarContent() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { me } = useAppSelector((state) => state.userSlice);
  const { rooms, currentRoom } = useAppSelector((state) => state.roomSlice);
  const { id_room, id_user } = useParams();
  const isFirstChat = !!id_user;
  const room = rooms.find((item: any) => item.id_room === id_room);
  const { type } = useChatItem(room || currentRoom);

  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm({ defaultValues: { message: '', image: '' } });
  const [payload, setPayload] = useState<IPayloadCreateChat>({});
  const isLoading = useIsRequestPending('rooms', 'createChatThunk');

  useEffect(() => {
    const id_me = me?.id_user;
    const isChatbot = id_room && type === 'chatbot';
    const payload: IPayloadCreateChat = { id_user: id_me, id_room };
    if (isChatbot) {
      payload.isChatbot = true;
    }
    if (id_user) {
      payload.id_friend = id_user;
    }
    setPayload(payload);
  }, [type]);
  useEffect(() => {
    if (payload?.message || payload?.image) {
      if (payload?.isChatbot) {
        handSendMessageWithChatbot(payload);
        reset();
      }
      const formData = objectToFormData(payload);
      const action: any = isFirstChat ? createFirstChatThunk(payload) : createChatThunk(formData);
      dispatch(action)
        .unwrap()
        .then((data: any) => {
          const { id_room, chat, id_user: idChatbot, date } = data;
          if (type === 'chatbot') {
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
            image: '',
            type: ''
          }));
        })
        .catch(() => {
          toastMessage.error('Tifo chatbot đang bận, vui lòng thử lại sau!');
        });
    }
  }, [payload]);
  const handleSendImage = (image: File) => {
    if (image) {
      setPayload((prev) => ({
        ...prev,
        image,
        type: 'image'
      }));
    }
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
    const chat: IChat = { message, ...me, id_chat: datetime, datetime };
    const action = createChat({ chat, id_room, id_user, date: today, isChatbot: true });
    dispatch(action);
  };
  const myKeyframe = keyframes`
    0 %  { transform: translateY(0); opacity: 0   },
    100% { transform: translateY(4px); opacity: 1  }
`;
  return (
    <Box position={'relative'}>
      {type === 'chatbot' && isLoading && (
        <Box sx={{ top: -22, left: 5, alignItems: 'center' }} display={'flex'} position={'absolute'}>
          <Typography>{t('message.chatting')}</Typography>
          <Box display={'flex'} ml={0.5}>
            <Typography
              display={'block'}
              ml={0.4}
              sx={{
                backgroundColor: '#777',
                opacity: 0,
                width: '5px',
                height: '5px',
                animation: `${myKeyframe} 0.6s infinite`,
                animationDelay: 0
              }}
              borderRadius={'50%'}
              component={'span'}
            />
            <Typography
              display={'block'}
              ml={0.4}
              sx={{
                backgroundColor: '#777',
                opacity: 0,
                width: '5px',
                height: '5px',
                animation: `${myKeyframe} 0.6s infinite`,
                animationDelay: '0.2s'
              }}
              borderRadius={'50%'}
              component={'span'}
            />
            <Typography
              display={'block'}
              ml={0.4}
              sx={{
                backgroundColor: '#777',
                opacity: 0,
                width: '5px',
                height: '5px',
                animation: `${myKeyframe} 0.4s infinite`,
                animationDelay: '0.3s'
              }}
              borderRadius={'50%'}
              component={'span'}
            />
          </Box>
        </Box>
      )}

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
            disabled={type ? false : true}
            type='text'
            variant='standard'
            placeholder={t('message.chatBottomInput')!}
            name='message'
            control={control}
            inputBase
          />
        </Box>
        <Box>
          <Input
            disabled={type ? false : true}
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
              <IconButton disabled={type ? false : true} sx={{ mx: 1 }} color='primary' component='span'>
                <AttachFileTwoToneIcon fontSize='small' />
              </IconButton>
            </FormLabel>
          </Tooltip>
          <Button
            disabled={type ? false : true}
            type='submit'
            sx={{ color: '#fff' }}
            startIcon={<SendTwoToneIcon />}
            variant='contained'
          >
            {t('button.submit')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default BottomBarContent;
