import {
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';

import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { userStatisticsAgeThunk, userStatisticsThunk } from 'src/redux_store/admin/admin_action';
import { useAppDispatch } from 'src/redux_store';
import { useTranslation } from 'react-i18next';
import images from 'src/assets/images';

interface IUserStatisticsAge {
  percentage_13_17: string;
  percentage_18_24: string;
  percentage_25_44: string;
  percentage_45_above: string;
}
const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.palette.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.shadows[10]};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${theme.palette.mode === 'dark' ? theme.palette.grey[50] : alpha(theme.palette.grey[900], 0.07)};

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

function AccountStatistics() {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Number(val).toFixed(2) + '%';
      },
      style: {
        colors: [theme.palette.grey[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.palette.grey[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.palette.grey[700],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.palette.grey[800],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: [
      t('admin.age', { about: '13-17' }),
      t('admin.age', { about: '18-24' }),
      t('admin.age', { about: '25-44' }),
      '>' + t('admin.age', { about: '45' })
    ],
    legend: {
      labels: {
        colors: theme.palette.grey[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const [chartSeries, setChartSeries] = useState<any[]>([]);
  const [userStatistics, setUserStatistics] = useState<{ total: number; increaseMonth: number }>();
  const [userStatisticsAge, setUserStatisticsAge] = useState<IUserStatisticsAge>();

  useEffect(() => {
    const action = userStatisticsThunk();
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { total, increaseMonth } = data;
        setUserStatistics({ total, increaseMonth });
      });
    const actionAge = userStatisticsAgeThunk();
    dispatch(actionAge)
      .unwrap()
      .then((data) => {
        const { statistics } = data;
        setUserStatisticsAge(statistics);
      });
  }, []);
  useEffect(() => {
    if (userStatisticsAge) {
      console.log({ userStatisticsAge });
      console.log('Object.values(userStatisticsAge)', Object.values(userStatisticsAge));

      setChartSeries(Object.values(userStatisticsAge).map((item) => Number(item)));
    }
  }, [userStatisticsAge]);
  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={4}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3,
                fontWeight: 600,
                fontSize: 18
              }}
              variant='h4'
            >
              {t('admin.accountStatistics')}
            </Typography>
            <Box>
              {userStatistics && (
                <Typography fontWeight={700} fontSize={20} variant='h1' gutterBottom>
                  {t('admin.totalUsers')}: {userStatistics.total}
                </Typography>
              )}

              <Box
                display='flex'
                sx={{
                  py: 4
                }}
                alignItems='center'
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant='rounded'
                >
                  <TrendingUp fontSize='large' />
                </AvatarSuccess>
                <Box>
                  {userStatistics && <Typography variant='h4'>+ {userStatistics.increaseMonth}</Typography>}
                  <Typography variant='subtitle2' noWrap>
                    {t('admin.thisMonth')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display='flex'
          alignItems='center'
          item
          xs={12}
          md={8}
        >
          <Box
            component='span'
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation='vertical' />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={5} item display='flex' justifyContent='center' alignItems='center'>
                <Chart height={250} options={chartOptions} series={chartSeries} type='donut' />
              </Grid>
              <Grid xs={12} sm={7} item display='flex' alignItems='center'>
                <List
                  disablePadding
                  sx={{
                    width: '100%'
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img alt='BTC' src={images.age13} />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary={t('admin.age', { about: '13-17' })}
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align='right' variant='h4' noWrap>
                        {Number(userStatisticsAge?.percentage_13_17).toFixed(2) + '%'}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img alt='XRP' src={images.age18} />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary={t('admin.age', { about: '18-24' })}
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align='right' variant='h4' noWrap>
                        {Number(userStatisticsAge?.percentage_18_24)?.toFixed(2) + '%'}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img alt='ADA' src={images.age25} />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary={t('admin.age', { about: ' 25 - 44' })}
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align='right' variant='h4' noWrap>
                        {Number(userStatisticsAge?.percentage_25_44).toFixed(2) + '%'}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img alt='45' src={images.age45} />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary={'>' + t('admin.age', { about: ' 45' })}
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align='right' variant='h4' noWrap>
                        {Number(userStatisticsAge?.percentage_45_above).toFixed(2) + '%'}
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountStatistics;
