import { Card, Grid, Box, CardContent, Typography, Avatar, alpha, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { followStatisticsThunk } from 'src/redux_store/admin/admin_action';
import { useAppDispatch } from 'src/redux_store';
import { IUser } from 'src/types/user';
import { CPath } from 'src/constants';
import images from 'src/assets/images';

const CoverWrapper = styled(Box)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 2px;
    height: ${theme.spacing(15)};
    width:  ${theme.spacing(28)};
    background: ${theme.palette.mode === 'dark' ? theme.palette.grey[50] : alpha(theme.palette.grey[900], 0.07)};
    position: absolute;
    left: -24px;
    top: -50px;
    img {
      background: ${theme.palette.grey[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: 2px;
      height: 100%;
      width: 100%;
    }
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${theme.palette.mode === 'dark' ? theme.palette.grey[50] : alpha(theme.palette.grey[900], 0.07)};
    position: absolute;
    bottom:-110px;
    img {
      background: ${theme.palette.grey[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function Follows() {
  const [users, setUsers] = useState<IUser[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = followStatisticsThunk();
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { users } = data;
        if (users) {
          setUsers(users);
        }
      });
  }, []);
  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          pb: 3
        }}
      >
        <Typography fontSize={28} variant='h3'>
          Follows
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {users.map((user) => {
          return (
            <Grid key={user.id_user} xs={12} sm={6} md={3} item>
              <Card
                sx={{
                  px: 1
                }}
              >
                <CardContent>
                  <Box sx={{ position: 'relative' }}>
                    <CoverWrapper>
                      <img
                        style={{ borderRadius: 10 }}
                        alt={user.username}
                        src={user.cover ? CPath.host_user + user.cover : images.coverDefault}
                      />
                    </CoverWrapper>
                    <AvatarWrapper>
                      <img alt={user.username} src={user.avatar ? CPath.host_user + user.avatar : images.account} />
                    </AvatarWrapper>
                  </Box>

                  <Typography mt={12} fontSize={18} variant='h5' noWrap>
                    {user.fullname}
                  </Typography>
                  <Typography variant='subtitle1' noWrap>
                    {user.username}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      pt: 1
                    }}
                  >
                    <Typography variant='h3' mr={0.5} fontSize={23} gutterBottom noWrap>
                      {user.followers}
                    </Typography>
                    <Typography variant='subtitle2' noWrap>
                      Follows
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Follows;
