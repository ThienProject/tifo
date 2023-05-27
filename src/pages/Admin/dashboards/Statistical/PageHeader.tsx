import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { t } from 'i18next';
import { CPath } from 'src/constants';
import { useAppSelector } from 'src/redux_store';

function PageHeader() {
  const { me } = useAppSelector((state) => state.userSlice);
  const user = {
    name: me?.username,
    avatar: CPath.host_user + me?.avatar
  };
  const theme = useTheme();

  return (
    <Grid container alignItems='center'>
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant='rounded'
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography fontSize={23} variant='h3' component='h3' gutterBottom>
          {t('admin.welcome')}, {user.name}!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
