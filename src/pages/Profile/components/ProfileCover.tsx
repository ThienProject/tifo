import { Box, Typography, Card, Avatar, CardMedia, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProtectBox from 'src/components/ProtectBox';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { IUser } from 'src/types/user';
import { CPath } from 'src/constants';
import images from 'src/assets/images';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { useTranslation } from 'react-i18next';
import { requestFollowThunk, unfollowThunk } from 'src/redux_store/user/user_action';
import { useEffect, useState } from 'react';
import { HowToRegOutlined } from '@mui/icons-material';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
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
  const dispatch = useAppDispatch();
  const [follow, setFollow] = useState<any>(null);
  useEffect(() => {
    setFollow(user.follow);
  }, [user]);
  const { t } = useTranslation();
  return (
    <>
      <CardCover>
        <CardMedia image={user.cover ? CPath.host_user + user.cover : images.coverDefault} />
        <CardCoverAction>
          <Input accept='image/*' id='change-cover' multiple type='file' />
          <label htmlFor='change-cover'>
            <Button startIcon={<UploadTwoToneIcon />} variant='contained' component='span'>
              Change cover
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar
          variant='rounded'
          alt={user.username}
          src={user.avatar ? CPath.host_user + user.avatar : images.avatar}
        />
        <ButtonUploadWrapper>
          <Input accept='image/*' id='icon-button-file' name='icon-button-file' type='file' />
          <label htmlFor='icon-button-file'>
            <IconButton component='span' color='primary'>
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2}>
        <Typography gutterBottom variant='h4' fontSize={18} mb={0}>
          {user.fullname}
        </Typography>
        <Typography variant='subtitle2'>{user.description}</Typography>
        <Typography sx={{ pb: 2 }} variant='subtitle2' color='text.primary'>
          {user.followings} followings | {user.followers} followers
        </Typography>
      </Box>
      <Box
        sx={{ position: 'relative', height: 40, top: -100, left: 160, marginTop: -5 }}
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
            </Box>
          )}
          <ProtectBox id_owner={user.id_user}>
            <IconButton color='primary' sx={{ p: 0.5 }}>
              <MoreHorizTwoToneIcon />
            </IconButton>
          </ProtectBox>
        </Box>
      </Box>
    </>
  );
};

export default ProfileCover;
