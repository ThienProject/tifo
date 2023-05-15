import { Box, Typography, Card, Avatar, CardMedia, Button, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProtectBox from 'src/components/ProtectBox';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { IUser } from 'src/types/user';
import { CPath } from 'src/constants';
import images from 'src/assets/images';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { useTranslation } from 'react-i18next';
import {
  getFollowersThunk,
  getFollowingsThunk,
  requestFollowThunk,
  unfollowThunk,
  updateImageThunk
} from 'src/redux_store/user/user_action';
import { useEffect, useState } from 'react';
import { HowToRegOutlined, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { toastMessage } from 'src/utils/toast';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import ModalFollower from 'src/pages/components/ModalFollower';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    border-radius: 50%;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.palette.primary};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${2};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        opacity: 0.5
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user }: { user: IUser }) => {
  const { me } = useAppSelector((state) => state.userSlice);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [follow, setFollow] = useState<any>(null);
  const isMe = user.id_user === me.id_user;

  useEffect(() => {
    setFollow(user.follow);
  }, [user]);
  const { t } = useTranslation();
  const handleChangeImage = (file: File, type: string) => {
    const formData = new FormData();
    formData.append('image_user', file);
    formData.append('type', type);
    formData.append('id_user', me.id_user);
    const action = updateImageThunk(formData);
    dispatch(action)
      .unwrap()
      .then(() => {
        toastMessage.success(t('toast.update'));
      });
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <CardCover>
        <CardMedia
          image={
            isMe
              ? me.cover
                ? CPath.host_user + me.cover
                : images.coverDefault
              : user.cover
              ? CPath.host_user + user.cover
              : images.coverDefault
          }
        />
        <ProtectBox id_owner={user.id_user}>
          <CardCoverAction>
            <Input
              onChange={(e) => {
                const file = e.target?.files && e.target?.files[0];
                if (file) handleChangeImage(file, 'cover');
              }}
              accept='image/*'
              id='change-cover'
              type='file'
            />
            <label htmlFor='change-cover'>
              <Button sx={{ color: '#ffff' }} startIcon={<UploadTwoToneIcon />} variant='contained' component='span'>
                Change cover
              </Button>
            </label>
          </CardCoverAction>
        </ProtectBox>
      </CardCover>
      <AvatarWrapper>
        <label htmlFor='icon-button-file'>
          <Avatar
            variant='circular'
            alt={user.username}
            src={
              isMe
                ? me.avatar
                  ? CPath.host_user + me.avatar
                  : images.avatar
                : user.avatar
                ? CPath.host_user + user.avatar
                : images.avatar
            }
          />
        </label>
        <ProtectBox id_owner={user.id_user}>
          <ButtonUploadWrapper>
            <Input
              onChange={(e) => {
                const file = e.target?.files && e.target?.files[0];
                if (file) handleChangeImage(file, 'avatar');
              }}
              accept='image/*'
              id='icon-button-file'
              name='icon-button-file'
              type='file'
            />
          </ButtonUploadWrapper>
        </ProtectBox>
      </AvatarWrapper>
      <Box py={2} pl={2}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography gutterBottom variant='h4' fontSize={18} mb={0}>
            {user.fullname}
          </Typography>
          <ProtectBox id_owner={user.id_user}>
            <IconButton
              onClick={() => {
                navigation('/setting');
              }}
              size='small'
              sx={{ ml: 2, p: 0.5, color: '#777' }}
            >
              <Settings />
              <Typography sx={{ ml: 1 }}>{t('sidebar.setting')}</Typography>
            </IconButton>
          </ProtectBox>
        </Stack>

        <Typography variant='subtitle2'>{user.description}</Typography>
        <Stack direction={'row'} alignItems={'center'}>
          <Button
            onClick={() => {
              const action = getFollowingsThunk({ id_user: user.id_user });
              dispatch(action)
                .unwrap()
                .then((data) => {
                  const { users } = data;
                  dispatch(
                    openModal({
                      modalId: MODAL_IDS.followers,
                      dialogComponent: (
                        <ModalFollower
                          type='followings'
                          id_owner={user.id_user!}
                          title={t('common.followings')}
                          users={users}
                        />
                      )
                    })
                  );
                });
            }}
            sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'lowercase' }}
            variant='text'
          >
            {user.followings || 0} {t('common.followings')}
          </Button>
          |
          <Button
            onClick={() => {
              const action = getFollowersThunk({ id_user: user.id_user });
              dispatch(action)
                .unwrap()
                .then((data) => {
                  const { users } = data;
                  dispatch(
                    openModal({
                      modalId: MODAL_IDS.followers,
                      dialogComponent: (
                        <ModalFollower
                          type='followers'
                          id_owner={user.id_user!}
                          title={t('common.followers')}
                          users={users}
                        />
                      )
                    })
                  );
                });
            }}
            sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'lowercase' }}
            variant='text'
          >
            {user.followers || 0} {t('common.followers')}
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{ position: 'absolute', height: 40, top: 222, left: 160 }}
        display={{ xs: 'block', md: 'flex' }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Box>
          {me?.id_user && user.id_user !== me?.id_user && (
            <Box>
              {follow === 'waiting' ? (
                <Button
                  sx={{ textTransform: 'capitalize' }}
                  size='small'
                  variant='outlined'
                  onClick={() => {
                    const id_follower = me?.id_user;
                    if (id_follower) {
                      const action = unfollowThunk({ id_follower, id_user: user.id_user });
                      dispatch(action)
                        .unwrap()
                        .then(() => {
                          setFollow(null);
                        });
                    }
                  }}
                >
                  {t('button.requested')}
                </Button>
              ) : follow === 'accept' ? (
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => {
                    const id_follower = me?.id_user;
                    if (id_follower) {
                      const action = unfollowThunk({ id_follower, id_user: user.id_user });
                      dispatch(action)
                        .unwrap()
                        .then(() => {
                          setFollow(null);
                        });
                    }
                  }}
                >
                  <HowToRegOutlined />
                </Button>
              ) : (
                <Button
                  sx={{ color: 'common.white' }}
                  size='small'
                  variant='contained'
                  onClick={() => {
                    const id_follower = me?.id_user;
                    if (id_follower) {
                      const action = requestFollowThunk({ id_follower, id_user: user.id_user });
                      dispatch(action)
                        .unwrap()
                        .then(() => {
                          setFollow('waiting');
                        });
                    }
                  }}
                >
                  {t('button.follow')}
                </Button>
              )}

              <Button size='small' sx={{ textTransform: 'capitalize', mx: 1 }} variant='outlined'>
                {t('button.chat')}
              </Button>
              <IconButton color='primary' sx={{ p: 0.5 }}>
                <MoreHorizTwoToneIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCover;
