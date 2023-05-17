import { Grid, Container } from '@mui/material';
import PostsWrapper from './PostsWrapper';
function ApplicationsUsers() {
  return (
    <>
      <Container maxWidth='lg'>
        <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
          <Grid item xs={12}>
            <PostsWrapper />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsUsers;
