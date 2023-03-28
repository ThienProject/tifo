import { ChangeEvent, useState } from 'react';
import {
  Box,
  Grid,
  Radio,
  FormControlLabel,
  Typography,
  Card,
  CardHeader,
  Divider,
  lighten,
  CardActionArea,
  CardContent,
  Tooltip,
  IconButton,
  Avatar,
  styled
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.palette.grey[500]};
        color: ${theme.palette.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled('img')(
  ({ theme }) => `
      border: 1px solid ${theme.colors.alpha.black[30]};
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin-right: ${theme.spacing(2)};
      background: ${theme.palette.common.white};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.palette.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.palette.primary.main};
        box-shadow: none;
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.palette.grey[900]};
        }
`
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.palette.error.light};
     color: ${theme.palette.error.main};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${lighten(theme.palette.error.light, 0.4)};
     }
`
);

const CardCc = styled(Card)(
  ({ theme }) => `
     border: 1px solid ${theme.colors.alpha.black[30]};
     background: ${theme.palette.grey[500]};
     box-shadow: none;
`
);

function MyCards() {
  const data = {
    savedCards: 7
  };

  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleDelete = () => {};

  return (
    <Card>
      <CardHeader subheader={data.savedCards + ' saved cards'} title='Cards' />
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
              <Box display='flex' alignItems='center'>
                <CardLogo src='/static/images/placeholders/logo/visa.png' alt='Visa' />
                <Box>
                  <Typography variant='h3' fontWeight='normal'>
                    •••• 6879
                  </Typography>
                  <Typography variant='subtitle2'>
                    Expires:{' '}
                    <Typography component='span' color='text.primary'>
                      12/24
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Box pt={3} display='flex' alignItems='center' justifyContent='space-between'>
                <FormControlLabel
                  value='a'
                  control={
                    <Radio
                      checked={selectedValue === 'a'}
                      onChange={handleChange}
                      value='a'
                      color='primary'
                      name='primary-card'
                    />
                  }
                  label='Primary'
                />
                <Tooltip arrow title='Remove this card'>
                  <IconButtonError onClick={() => handleDelete()}>
                    <DeleteTwoToneIcon fontSize='small' />
                  </IconButtonError>
                </Tooltip>
              </Box>
            </CardCc>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
              <Box display='flex' alignItems='center'>
                <CardLogo src='/static/images/placeholders/logo/mastercard.png' alt='Visa' />
                <Box>
                  <Typography variant='h3' fontWeight='normal'>
                    •••• 4634
                  </Typography>
                  <Typography variant='subtitle2'>
                    Expires:{' '}
                    <Typography component='span' color='text.primary'>
                      6/22
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Box pt={3} display='flex' alignItems='center' justifyContent='space-between'>
                <FormControlLabel
                  value='b'
                  control={
                    <Radio
                      checked={selectedValue === 'b'}
                      onChange={handleChange}
                      value='b'
                      color='primary'
                      name='primary-card'
                    />
                  }
                  label='Primary'
                />
                <Tooltip arrow title='Remove this card'>
                  <IconButtonError onClick={() => handleDelete()}>
                    <DeleteTwoToneIcon fontSize='small' />
                  </IconButtonError>
                </Tooltip>
              </Box>
            </CardCc>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip arrow title='Click to add a new card'>
              <CardAddAction>
                <CardActionArea sx={{ px: 1 }}>
                  <CardContent>
                    <AvatarAddWrapper>
                      <AddTwoToneIcon fontSize='large' />
                    </AvatarAddWrapper>
                  </CardContent>
                </CardActionArea>
              </CardAddAction>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default MyCards;
