import { useState, SyntheticEvent } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  styled,
  useTheme
} from '@mui/material';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { PeopleOutline, GroupAddOutlined, ExitToAppOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material';
import images from 'src/assets/images';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';

import { IUser } from 'src/types/user';
import { useNavigate, useParams } from 'react-router';
import { CPath } from 'src/constants';
import { IRoom } from 'src/types/room';
import CreateRoom from '../CreateRoom';
import { getSubTimeFromDayFNS } from 'src/functions';
import ConfirmationDialog from 'src/components/model/confirmation_dialog';
import { deleteRoomThunk, deleteUserThunk } from 'src/redux_store/room/room_action';
import { toastMessage } from 'src/utils/toast';
import Member from '../Member';
const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
       @media (min-width: ${theme.breakpoints.values.xs}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex:1
      }

`
);

const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.palette.text.primary};
`
);

const AccordionSummaryWrapper = styled(AccordionSummary)(
  ({ theme }) => `
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${theme.transitions.create(['color'])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${theme.spacing(0.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: rgba(34, 51, 84, 0.1);

            .MuiSvgIcon-root {
              color: ${theme.palette.primary.main};
            }
          }
        }
`
);

function TopBarContent() {
  const { t } = useTranslation();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const rooms: IRoom[] = useAppSelector((state) => state.roomSlice.rooms);
  const { me } = useAppSelector((state) => state.userSlice);
  const newUserChat = useAppSelector((state) => state.roomSlice.newUserChat);
  const { id_room } = useParams();
  const navigation = useNavigate();
  const room = rooms.find((item: any) => item.id_room === id_room);
  const isChatFriend = room && room.type === 'friend';
  const isChatbot = room && room.type === 'chatbot';
  const isChatGroup = room && room.type === 'group';
  let avatar = room?.avatar ? CPath.host_user + room.avatar : images.roomDefault;
  let chatName = room?.name;
  let friend: IUser | null = null;
  const isOwner = isChatGroup && room?.users?.find((u) => u.role === 1 && u.id_user === me?.id_user);
  if ((isChatFriend || isChatbot) && room.users) {
    friend = room.users[0];
  }
  if (newUserChat && Object.keys(newUserChat).length > 0) {
    friend = newUserChat;
  }
  if (friend) {
    avatar = CPath.host_user + friend.avatar;
    chatName = friend.fullname;
  }
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<string | false>('section1');

  const handleChange = (section: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? section : false);
  };

  return (
    <>
      <RootWrapper>
        <Box display='flex' alignItems='center'>
          <Avatar
            variant='rounded'
            sx={{
              width: 48,
              height: 48
            }}
            alt={chatName}
            src={avatar}
          />
          <Box ml={1}>
            <Typography variant='h4' fontSize={16} fontWeight={'700'}>
              {chatName}
            </Typography>
            {friend?.status === 'offline' && (
              <Typography fontSize={14} color={'text.secondary'} variant='subtitle1'>
                {friend?.off_time && getSubTimeFromDayFNS(friend.off_time, t('language'))}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', lg: 'flex' }
          }}
        >
          <Tooltip placement='bottom' title='Start a voice call'>
            <IconButton color='primary'>
              <CallTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement='bottom' title='Start a video call'>
            <IconButton color='primary'>
              <VideoCameraFrontTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement='bottom' title='Conversation information'>
            <IconButton
              color='primary'
              onClick={() => {
                setIsOpenSetting((prev) => !prev);
              }}
            >
              <InfoTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </RootWrapper>
      <Drawer
        variant='temporary'
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        open={isOpenSetting}
        onClose={() => {
          setIsOpenSetting(false);
        }}
        elevation={9}
      >
        <Box
          sx={{
            maxWidth: 360,
            overflowX: 'hidden',
            overflowY: 'scroll'
          }}
          p={2}
        >
          <Box
            sx={{
              textAlign: 'center'
            }}
          >
            <Avatar
              sx={{
                mx: 'auto',
                my: 2,
                width: theme.spacing(12),
                height: theme.spacing(12)
              }}
              variant='rounded'
              alt='Zain Baptista'
              src={avatar}
            />
            <Typography fontWeight={700} fontSize={16} variant='h4'>
              {chatName}
            </Typography>

            {friend?.status === 'offline' && (
              <Typography fontSize={14} color={'text.secondary'} variant='subtitle1'>
                {friend?.off_time && getSubTimeFromDayFNS(friend.off_time, t('language'))}
              </Typography>
            )}
          </Box>
          <Divider
            sx={{
              my: 3
            }}
          />

          <Accordion expanded={expanded === 'section1'} onChange={handleChange('section1')}>
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography fontSize={14} variant='h5' color={'rgb(34, 51, 84)'}>
                {t('message.customize.title')}
              </Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails
              sx={{
                p: 0
              }}
            >
              <List component='nav'>
                <ListItem button>
                  <ListItemIconWrapper>
                    <SearchTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary={t('message.customize.search')}
                    primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <ColorLensTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary={t('message.customize.change_theme')}
                    primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <EmojiEmotionsTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary={t('message.customize.change_emoji')}
                    primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'section2'} onChange={handleChange('section2')}>
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography fontSize={14} variant='h5' color={'rgb(34, 51, 84)'}>
                {t('message.privacy.title')}
              </Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails
              sx={{
                p: 0
              }}
            >
              <List component='nav'>
                {isChatFriend && friend && (
                  <>
                    <ListItem button>
                      <ListItemIconWrapper>
                        <GroupAddOutlined />
                      </ListItemIconWrapper>
                      <ListItemText
                        sx={{ fontSize: 14 }}
                        primary={t('button.room')}
                        onClick={() => {
                          const action = openModal({
                            modalId: MODAL_IDS.createRoom,
                            dialogComponent: <CreateRoom user={friend!} />
                          });
                          dispatch(action);
                        }}
                        primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemIconWrapper>
                        <BlockTwoToneIcon />
                      </ListItemIconWrapper>
                      <ListItemText
                        sx={{ fontSize: 14 }}
                        primary={t('button.block')}
                        primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                      />
                    </ListItem>
                  </>
                )}

                {isChatGroup && (
                  <>
                    <ListItem
                      button
                      onClick={() => {
                        const action = openModal({
                          modalId: MODAL_IDS.memberManager,
                          dialogComponent: <Member id_room={room.id_room!} />
                        });
                        dispatch(action);
                      }}
                    >
                      <ListItemIconWrapper>
                        <PeopleOutline />
                      </ListItemIconWrapper>
                      <ListItemText
                        sx={{ fontSize: 14 }}
                        primary={t('message.privacy.members')}
                        primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                      />
                    </ListItem>
                    {isOwner ? (
                      <ListItem
                        button
                        onClick={() => {
                          dispatch(
                            openModal({
                              modalId: MODAL_IDS.confirmDeleteRoom,
                              dialogComponent: (
                                <ConfirmationDialog
                                  describe={t('confirm.deleteRoom')}
                                  sliceName={'rooms'}
                                  functionName={'deleteRoomThunk'}
                                  modalId={MODAL_IDS.confirmDeleteRoom}
                                  callback={() => {
                                    if (id_room) {
                                      const action = deleteRoomThunk({ id_room });
                                      dispatch(action)
                                        .unwrap()
                                        .then(() => {
                                          toastMessage.success(t('toast.deleteSuccess', { object: 'room' }));
                                          dispatch(closeModal({ modalId: MODAL_IDS.confirmDeleteRoom }));
                                          navigation('/message');
                                        });
                                    }
                                  }}
                                />
                              )
                            })
                          );
                        }}
                      >
                        <ListItemIconWrapper>
                          <RemoveCircleOutlineOutlined />
                        </ListItemIconWrapper>
                        <ListItemText
                          sx={{ fontSize: 14 }}
                          primary={t('message.privacy.remove')}
                          primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                        />
                      </ListItem>
                    ) : (
                      <ListItem
                        button
                        onClick={() => {
                          const action = openModal({
                            modalId: MODAL_IDS.confirmDeleteUser,
                            dialogComponent: (
                              <ConfirmationDialog
                                describe={t('confirm.leave')}
                                sliceName={'rooms'}
                                functionName={'deleteUserThunk'}
                                modalId={MODAL_IDS.confirmDeleteUser}
                                callback={() => {
                                  if (id_room) {
                                    const action = deleteUserThunk({
                                      id_user: me?.id_user,
                                      id_room: id_room
                                    });
                                    dispatch(action)
                                      .unwrap()
                                      .then(() => {
                                        toastMessage.success(t('toast.leaveGroup'));
                                        dispatch(closeModal({ modalId: MODAL_IDS.confirmDeleteUser }));
                                        navigation('/message');
                                        // dispatch(leaveRoom({ id_room: data.id_room }));
                                      });
                                  }
                                }}
                              />
                            )
                          });
                          dispatch(action);
                        }}
                      >
                        <ListItemIconWrapper>
                          <ExitToAppOutlined />
                        </ListItemIconWrapper>
                        <ListItemText
                          sx={{ fontSize: 14 }}
                          primary={t('message.privacy.leave')}
                          primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                        />
                      </ListItem>
                    )}
                  </>
                )}

                <ListItem button>
                  <ListItemIconWrapper>
                    <WarningTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary={t('message.privacy.report')}
                    primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                    secondary='Report the conversation and provide feedback'
                    secondaryTypographyProps={{ variant: 'subtitle1', color: 'rgba(34, 51, 84, 0.7)', fontSize: 14 }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'section3'} onChange={handleChange('section3')}>
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography fontSize={14} variant='h5' color={'rgb(34, 51, 84)'}>
                {t('message.share_file.title')}
              </Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails
              sx={{
                p: 0
              }}
            >
              <List component='nav'>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary='HolidayPictures.zip'
                    primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                    secondary='You opened in the past year'
                    secondaryTypographyProps={{ variant: 'subtitle1', color: 'rgba(34, 51, 84, 0.7)', fontSize: 14 }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary='2021Screenshot.jpg'
                    primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                    secondary='You edited this file yesterday'
                    secondaryTypographyProps={{ variant: 'subtitle1', color: 'rgba(34, 51, 84, 0.7)', fontSize: 14 }}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIconWrapper>
                    <DescriptionTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary='PresentationDeck.pdf'
                    primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                    secondary='Never opened'
                    secondaryTypographyProps={{ variant: 'subtitle1', color: 'rgba(34, 51, 84, 0.7)', fontSize: 14 }}
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  );
}

export default TopBarContent;
