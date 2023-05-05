import { Box, Avatar, Typography, Card, styled, Divider, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { getSubTimeFromDayFNS } from 'src/functions';
import { useTranslation } from 'react-i18next';

import { CPath } from 'src/constants';
import { Socket } from 'socket.io-client';
import { createChat, createFirstChat, createRoom } from 'src/redux_store/room/room_slice';
import { useParams } from 'react-router';
import { IUser } from 'src/types/user';
const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: ${3};
        text-transform: none;
        font-size: ${theme.typography.pxToRem(14)};
        color: ${theme.palette.mode === 'dark' ? '#c3c5c8' : theme.palette.grey[800]};
      }
`
);

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: ${theme.palette.primary.main};
      color: #fff;
      padding: 12px;
      border-radius: ${10};
      border-top-right-radius: ${3};
      max-width: 80%;
       font-size: ${theme.typography.pxToRem(14)};
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background:  rgba(34, 51, 84, 0.1);
      color: ${theme.palette.mode === 'dark' ? '#c3c5c8' : 'rgb(34, 51, 84)'};
      padding: 12px;
      border-radius: ${10};
      border-top-left-radius: ${3};
      font-size: ${theme.typography.pxToRem(14)};
      max-width: 80%;
      display: inline-flex;
`
);

function ChatContent({ socket }: { socket: Socket }) {
  const { me } = useAppSelector((state) => state.userSlice);
  const theme = useTheme();
  const { id_room } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const scrollbarsRef = useRef<any>();
  const id_me = me.id_user;
  const chatDates = useAppSelector((state) => {
    if (id_room) return state.roomSlice.chats[id_room];
  });
  useEffect(() => {
    socket.on('new-chat', ({ chat, id_room, id_user, date }: any) => {
      const action = createChat({ chat, id_room, id_user, date });
      dispatch(action);
    });
    socket.on('first-chat', ({ chat, users, date, id_room, avatar, type, name }: any) => {
      const user = users.find((item: IUser) => item.id_user != id_me);
      const action = createFirstChat({ chat, id_room, date, user, avatar, type, name });
      dispatch(action);
    });
    socket.on('create-room', ({ chat, users, date, id_room, avatar, type, name }: any) => {
      const action = createRoom({ chat, id_room, date, users, avatar, type, name });
      dispatch(action);
    });
    return () => {
      socket.off('new-chat');
      socket.off('first-chat');
      socket.off('create-room');
    };
  }, []);
  useEffect(() => {
    if (chatDates) scrollbarsRef.current?.scrollToBottom();
  }, [chatDates]);
  return (
    <Scrollbars ref={scrollbarsRef}>
      <Box p={3} bgcolor={theme.palette.mode === 'dark' ? theme.palette.common.white : 'rgb(242, 245, 249)'}>
        <Box>
          {chatDates &&
            chatDates.length > 0 &&
            chatDates.map((chatDate) => {
              const date = Object.keys(chatDate)[0];
              const dateFormat = new Date(date);
              const chats = chatDate[date];

              return (
                <Box key={date}>
                  <DividerWrapper>{format(dateFormat, 'MMMM dd yyyy')}</DividerWrapper>
                  {chats.map((chat, index) => {
                    return (
                      <Box key={chat.id_chat}>
                        {chat.id_user === id_me ? (
                          <Box display='flex' alignItems='flex-start' justifyContent='flex-end' py={1}>
                            <Box
                              display='flex'
                              alignItems='flex-end'
                              flexDirection='column'
                              justifyContent='flex-end'
                              mr={2}
                              width={'100%'}
                            >
                              <CardWrapperPrimary>
                                <Typography sx={{ overflowWrap: 'break-word', width: '100%' }}>
                                  {chat.message}
                                </Typography>
                              </CardWrapperPrimary>
                              {index === chats.length - 1 && (
                                <Typography
                                  variant='subtitle1'
                                  color={theme.palette.mode === 'dark' ? '#c3c5c8' : 'rgba(34, 51, 84, 0.7)'}
                                  sx={{
                                    pt: 1,
                                    fontSize: 13,
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <ScheduleTwoToneIcon
                                    sx={{
                                      mr: 0.5
                                    }}
                                    fontSize='small'
                                  />
                                  {chat.datetime && getSubTimeFromDayFNS(chat.datetime, t('language'))}
                                </Typography>
                              )}
                            </Box>
                            <Avatar
                              variant='circular'
                              sx={{
                                width: 40,
                                height: 40
                              }}
                              alt={me.fullname}
                              src={CPath.host_user + me.avatar}
                            />
                          </Box>
                        ) : (
                          <Box
                            display='flex'
                            key={chat.id_chat}
                            alignItems='flex-start'
                            justifyContent='flex-start'
                            py={1}
                          >
                            <Avatar
                              variant='circular'
                              sx={{
                                width: 40,
                                height: 40
                              }}
                              alt={chat.fullname}
                              src={CPath.host_user + chat.avatar}
                            />
                            <Box
                              display='flex'
                              alignItems='flex-start'
                              flexDirection='column'
                              justifyContent='flex-start'
                              ml={2}
                              width={'100%'}
                            >
                              <CardWrapperSecondary>
                                <Typography sx={{ overflowWrap: 'break-word', width: '100%' }}>
                                  {chat.message}
                                </Typography>
                              </CardWrapperSecondary>
                              {index === chats.length - 1 && (
                                <Typography
                                  color={theme.palette.mode === 'dark' ? '#c3c5c8' : 'rgba(34, 51, 84, 0.7)'}
                                  sx={{
                                    pt: 1,
                                    fontSize: 13,
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <ScheduleTwoToneIcon
                                    sx={{
                                      mr: 0.5
                                    }}
                                    fontSize='small'
                                  />
                                  {chat.datetime && getSubTimeFromDayFNS(chat.datetime, t('language'))}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
        </Box>
      </Box>
    </Scrollbars>
  );
}

export default ChatContent;
