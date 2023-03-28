import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

function PopularTags() {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title='Popular Tags' />
      <Divider />
      <ListWrapper disablePadding>
        <ListItem
          sx={{
            color: `${theme.palette.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary='#HTML' />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.palette.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary='#software_development' />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.palette.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary='#TrendingInfuencers' />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.palette.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary='#investorsWatch2022' />
        </ListItem>
        <Divider />
        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant='h4' color='text.primary'>
            Groups
          </Typography>
        </ListSubheader>
        <Divider />
        <ListItem button>
          <ListItemAvatar>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                background: `${theme.colors.info.main}`,
                color: `${theme.palette.info.contrastText}`
              }}
            >
              WD
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
              color: `${theme.palette.grey[900]}`
            }}
            primary='Web Designers Lounge'
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemAvatar>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                background: `${theme.palette.grey[900]}`,
                color: `${theme.palette.common.white}`
              }}
            >
              D
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
              color: `${theme.palette.grey[900]}`
            }}
            primary='Writer’s Digest Daily'
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemAvatar>
            <Avatar sx={{ width: 38, height: 38 }} src='/static/images/logo/google.svg' />
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
              color: `${theme.palette.grey[900]}`
            }}
            primary='Google Developers'
          />
        </ListItem>
      </ListWrapper>
    </Card>
  );
}

export default PopularTags;
