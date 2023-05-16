import { Grid, Container } from '@mui/material';
import UsersWrapper from './UsersWrapper';
function ApplicationsUsers() {
  return (
    <>
      <Container maxWidth='lg'>
        <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
          <Grid item xs={12}>
            <UsersWrapper />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsUsers;
