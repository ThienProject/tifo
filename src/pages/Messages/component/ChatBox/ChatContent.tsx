import { Box, Avatar, Typography, Card, styled, Divider } from '@mui/material';

import { formatDistance, format, subDays, subHours, subMinutes } from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import { IChat, IChatDates, IGroup } from 'src/types/group';
import { useAppSelector } from 'src/redux_store';
import { useEffect } from 'react';
import { getSubTimeFromDayFNS } from 'src/functions';
import { useTranslation } from 'react-i18next';

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
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

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
                const chatDatetime = new Date(chat.datetime);
                console.log('chatDatetime', chatDatetime);
                console.log('chatDatetime', chatDatetime.getTime());
                if (chat.id_user === id_me) {
                  return (
                    <Box key={chat.id_chat} display='flex' alignItems='flex-start' justifyContent='flex-end' py={3}>
                      <Box display='flex' alignItems='flex-end' flexDirection='column' justifyContent='flex-end' mr={2}>
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
                        alt={user.name}
                        src={user.avatar}
                      />
                    </Box>
                  );
                } else {
                  return (
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
                  );
                }
              })}
            </Box>
          );
        })}
      {/* <DividerWrapper>{format(subDays(new Date(), 3), 'MMMM dd yyyy')}</DividerWrapper>

      <Box display='flex' alignItems='flex-start' justifyContent='flex-start' py={3}>
        <Avatar
          variant='rounded'
          sx={{
            width: 50,
            height: 50
          }}
          alt='Zain Baptista'
          src='/static/images/avatars/2.jpg'
        />
        <Box display='flex' alignItems='flex-start' flexDirection='column' justifyContent='flex-start' ml={2}>
          <CardWrapperSecondary>Hi. Can you send me the missing invoices asap?</CardWrapperSecondary>
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
            {formatDistance(subHours(new Date(), 115), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
      </Box>

      <Box display='flex' alignItems='flex-start' justifyContent='flex-end' py={3}>
        <Box display='flex' alignItems='flex-end' flexDirection='column' justifyContent='flex-end' mr={2}>
          <CardWrapperPrimary>
            Yes, I will email them right now. I will let you know once the remaining invoices are done.
          </CardWrapperPrimary>
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
            {formatDistance(subHours(new Date(), 125), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        <Avatar
          variant='rounded'
          sx={{
            width: 50,
            height: 50
          }}
          alt={user.name}
          src={user.avatar}
        />
      </Box>

      <Box display='flex' alignItems='flex-start' justifyContent='flex-end' py={3}>
        <Box display='flex' alignItems='flex-end' flexDirection='column' justifyContent='flex-end' mr={2}>
          <CardWrapperPrimary>Hey! Are you there?</CardWrapperPrimary>
          <CardWrapperPrimary
            sx={{
              mt: 2
            }}
          >
            Heeeelloooo????
          </CardWrapperPrimary>
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
            {formatDistance(subHours(new Date(), 60), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        <Avatar
          variant='rounded'
          sx={{
            width: 50,
            height: 50
          }}
          alt={user.name}
          src={user.avatar}
        />
      </Box>
      <DividerWrapper>Today</DividerWrapper>
      <Box display='flex' alignItems='flex-start' justifyContent='flex-start' py={3}>
        <Avatar
          variant='rounded'
          sx={{
            width: 50,
            height: 50
          }}
          alt='Zain Baptista'
          src='/static/images/avatars/2.jpg'
        />
        <Box display='flex' alignItems='flex-start' flexDirection='column' justifyContent='flex-start' ml={2}>
          <CardWrapperSecondary>Hey there!</CardWrapperSecondary>
          <CardWrapperSecondary
            sx={{
              mt: 1
            }}
          >
            How are you? Is it ok if I call you?
          </CardWrapperSecondary>
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
            {formatDistance(subMinutes(new Date(), 6), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
      </Box>
      <Box display='flex' alignItems='flex-start' justifyContent='flex-end' py={3}>
        <Box display='flex' alignItems='flex-end' flexDirection='column' justifyContent='flex-end' mr={2}>
          <CardWrapperPrimary>
            Hello, I just got my Amazon order shipped and I’m very happy about that.
          </CardWrapperPrimary>
          <CardWrapperPrimary
            sx={{
              mt: 1
            }}
          >
            Can you confirm?
          </CardWrapperPrimary>
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
            {formatDistance(subMinutes(new Date(), 8), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        <Avatar
          variant='rounded'
          sx={{
            width: 50,
            height: 50
          }}
          alt={user.name}
          src={user.avatar}
        />
      </Box> */}
    </Box>
  );
}

export default ChatContent;
