import { Card, Box, Typography, Avatar, Grid, alpha, useTheme, styled } from '@mui/material';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux_store';
import { postStatisticsThunk } from 'src/redux_store/admin/admin_action';
import { useTranslation } from 'react-i18next';
interface IPostStatistical {
  totals: number;
  total_posts: number;
  total_reels: number;
  reels: number[];
  posts: number[];
}

function WatchListColumn() {
  const theme = useTheme();
  const { t } = useTranslation();
  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    colors: [theme.palette.primary.main, theme.palette.success.main],
    dataLabels: {
      enabled: false
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      colors: [theme.palette.primary.main, theme.palette.success.main],
      width: 3
    },
    legend: {
      show: false
    },
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false,
      tickAmount: 5
    },
    tooltip: {
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return 'Total: ';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  const [statistics, setStatistics] = useState<IPostStatistical>();
  const [chartData, setChartData] = useState<{ name: string; data: number[] }[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const action = postStatisticsThunk();
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { statistics } = data;
        if (statistics) {
          setStatistics(statistics);
        }
      });
  }, []);
  useEffect(() => {
    if (statistics) {
      setChartData([
        {
          name: 'Posts',
          data: statistics.posts
        },
        {
          name: 'Reels',
          data: statistics.reels
        }
      ]);
    }
  }, [statistics]);
  return (
    <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
      <Grid item md={12} xs={12}>
        <Card
          sx={{
            overflow: 'visible'
          }}
        >
          <Box
            sx={{
              p: 3
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                pt: 3
              }}
            >
              <Typography
                variant='h2'
                fontWeight={700}
                fontSize={32}
                sx={{
                  pr: 1,
                  mb: 1
                }}
              >
                {t('admin.total')}: {statistics?.totals}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography color='success.main'>{statistics?.total_reels} reels</Typography>
              <Typography
                color='primary.main'
                sx={{
                  pl: 1
                }}
              >
                {statistics?.total_posts} posts
              </Typography>
            </Box>
          </Box>
          <Chart options={chartOptions} series={chartData} type='area' height={200} />
        </Card>
      </Grid>
    </Grid>
  );
}

export default WatchListColumn;
