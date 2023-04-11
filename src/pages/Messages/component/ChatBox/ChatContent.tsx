import { Box, Avatar, Typography, Card, styled, Divider } from '@mui/material';

import { format } from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { IChatDates } from 'src/types/group';
import { useAppSelector } from 'src/redux_store';

import { getSubTimeFromDayFNS } from 'src/functions';
import { useTranslation } from 'react-i18next';

import { CPath } from 'src/constants';

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
      padding: ${theme.spacing(2)};
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

function ChatContent({ chatDates }: { chatDates: IChatDates[] }) {
  const { me } = useAppSelector((state) => state.userSlice);
  const { t } = useTranslation();
  const id_me = me.id_user;

  return (
    <Box p={3} bgcolor={'rgb(242, 245, 249)'}>
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
                      <Box display='flex' alignItems='flex-start' justifyContent='flex-end' py={3}>
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
                          variant='rounded'
                          sx={{
                            width: 50,
                            height: 50
                          }}
                          alt={me.fullname}
                          src={CPath.host_public + me.avatar}
                        />
                      </Box>
                    ) : (
                      <Box display='flex' key={chat.id_chat} alignItems='flex-start' justifyContent='flex-start' py={3}>
                        <Avatar
                          variant='rounded'
                          sx={{
                            width: 50,
                            height: 50
                          }}
                          alt='Zain Baptista'
                          src='/static/images/avatars/2.jpg'
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
  );
}

export default ChatContent;
