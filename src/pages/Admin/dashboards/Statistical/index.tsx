// import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/admin/PageTitleWrapper';
import { Container, Grid } from '@mui/material';

import AccountStatistics from './AccountStatistics';
import Wallets from './Follows';
import WatchList from './PostList';

function DashboardCrypto() {
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth='lg'>
        <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={4}>
          <Grid item xs={12}>
            <AccountStatistics />
          </Grid>
          <Grid item lg={12} xs={12}>
            <Wallets />
          </Grid>

          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DashboardCrypto;
