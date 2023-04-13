import { Box, Avatar, Typography, Card, styled, Divider } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { getSubTimeFromDayFNS } from 'src/functions';
import { useTranslation } from 'react-i18next';

import { CPath } from 'src/constants';
import { Socket } from 'socket.io-client';
import { createChat } from 'src/redux_store/group/group_slice';
import { useParams } from 'react-router';

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: ${3};
        text-transform: none;
        font-size: ${theme.typography.pxToRem(14)};
        color: ${theme.palette.grey[800]};
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
      max-width: 380px;
       font-size: ${theme.typography.pxToRem(14)};
      display: inline-flex;
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: rgba(34, 51, 84, 0.1);
      color: rgb(34, 51, 84);
      padding: ${theme.spacing(2)};
      border-radius: ${10};
      border-top-left-radius: ${3};
      font-size: ${theme.typography.pxToRem(14)};
      max-width: 380px;
      display: inline-flex;
`
);

function ChatContent({ socket }: { socket: Socket }) {
  const { me } = useAppSelector((state) => state.userSlice);
  const { id_group } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const scrollbarsRef = useRef<any>();
  const id_me = me.id_user;
  const chatDates = useAppSelector((state) => {
    if (id_group) return state.groupSlice.chats[id_group];
  });
  useEffect(() => {
    socket.on('new-chat', ({ chat, id_group, id_user, date }: any) => {
      const action = createChat({ chat, id_group, id_user, date });
      dispatch(action);
    });
    return () => {
      socket.off('new-chat');
    };
  }, []);
  useEffect(() => {
    scrollbarsRef.current?.scrollToBottom();
  }, [chatDates]);
  return (
    <Scrollbars ref={scrollbarsRef}>
      <Box p={3} bgcolor={'rgb(242, 245, 249)'}>
        <Box>
          {chatDates &&
            chatDates.map((chatDate) => {
              const date = Object.keys(chatDate)[0];
              const dateFormat = new Date(date);
              const chats = chatDate[date];

              return (
                <Box key={date}>
                  <DividerWrapper>{format(dateFormat, 'MMMM dd yyyy')}</DividerWrapper>
                  {chats.map((chat) => {
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
                            >
                              <CardWrapperPrimary>{chat.message}</CardWrapperPrimary>
                              <Typography
                                variant='subtitle1'
                                color={'rgba(34, 51, 84, 0.7)'}
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
                            >
                              <CardWrapperSecondary>{chat.message}</CardWrapperSecondary>
                              <Typography
                                color={'rgba(34, 51, 84, 0.7)'}
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
