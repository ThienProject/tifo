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
import { formatDistance, subMinutes } from 'date-fns';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import images from 'src/assets/images';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import CreateGroup from '../CreateGroup';
import { IUser } from 'src/types/user';
import { toggleMenu } from 'src/redux_store/group/group_slice';
import { useParams } from 'react-router';
import { CPath } from 'src/constants';
const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
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

function TopBarContent({ user }: { user?: IUser }) {
  const { t } = useTranslation();
  const mobileOpen = useAppSelector((state) => state.groupSlice).isOpenMenu;
  const groups = useAppSelector((state) => state.groupSlice.groups);

  const { id_group } = useParams();
  const group = groups.find((item: any) => item.id_group === id_group);

  const { me } = useAppSelector((state) => state.userSlice);

  const isChatFriend = group?.users?.length === 2;
  let avatar = group?.avatar ? CPath.host_user + group.avatar : images.groupDefault;
  let chatName = group?.name;
  let friend: IUser = {};
  if (isChatFriend && group.users) {
    const me_id = me.id_user;
    friend = group.users.find((us) => us.id_user != me_id) || {};
    if (friend.avatar) {
      avatar = CPath.host_user + friend.avatar;
    }
    chatName = friend.fullname;
  }
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    dispatch(toggleMenu());
  };

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
            <Typography fontSize={14} color={'text.secondary'} variant='subtitle1'>
              {formatDistance(subMinutes(new Date(), 8), new Date(), {
                addSuffix: true
              })}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' }
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
            <IconButton color='primary' onClick={handleDrawerToggle}>
              <InfoTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </RootWrapper>
      <Drawer
        sx={{
          display: { xs: 'none', md: 'flex' }
        }}
        variant='temporary'
        anchor={theme.direction === 'rtl' ? 'left' : 'right'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        elevation={9}
      >
        <Box
          sx={{
            minWidth: 360
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
              src='/static/images/avatars/1.jpg'
            />
            <Typography fontWeight={700} fontSize={16} variant='h4'>
              Zain Baptista
            </Typography>
            <Typography variant='subtitle2'>
              Active
              {formatDistance(subMinutes(new Date(), 7), new Date(), {
                addSuffix: true
              })}
            </Typography>
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
                <ListItem button>
                  <ListItemIconWrapper>
                    <NotificationsOffTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary={t('message.privacy.notification')}
                    primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                  />
                </ListItem>
                {user && Object.keys(user).length !== 0 && (
                  <ListItem button>
                    <ListItemIconWrapper>
                      <GroupAddIcon />
                    </ListItemIconWrapper>
                    <ListItemText
                      sx={{ fontSize: 14 }}
                      primary={t('button.group')}
                      onClick={() => {
                        const action = openModal({
                          modalId: MODAL_IDS.createGroup,
                          dialogComponent: <CreateGroup user={user} />
                        });
                        console.log('open modal');
                        dispatch(action);
                      }}
                      primaryTypographyProps={{ variant: 'h5', fontSize: 14, color: 'rgb(136, 150, 255)' }}
                    />
                  </ListItem>
                )}

                <ListItem button>
                  <ListItemIconWrapper>
                    <CancelTwoToneIcon />
                  </ListItemIconWrapper>
                  <ListItemText
                    sx={{ fontSize: 14 }}
                    primary={t('message.privacy.ignore')}
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
