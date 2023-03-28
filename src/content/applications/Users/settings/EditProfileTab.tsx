import { Grid, Typography, CardContent, Card, Box, Divider, Button } from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';

function EditProfileTab() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box p={3} display='flex' alignItems='center' justifyContent='space-between'>
            <Box>
              <Typography variant='h4' gutterBottom>
                Personal Details
              </Typography>
              <Typography variant='subtitle2'>Manage informations related to your personal details</Typography>
            </Box>
            <Button variant='text' startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant='subtitle2'>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color='black'>
                    <b>Craig Donin</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Date of birth:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color='black'>
                    <b>15 March 1977</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Address:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Typography color='black'>
                      1749 High Meadow Lane, SEQUOIA NATIONAL PARK, California, 93262
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box p={3} display='flex' alignItems='center' justifyContent='space-between'>
            <Box>
              <Typography variant='h4' gutterBottom>
                Account Settings
              </Typography>
              <Typography variant='subtitle2'>Manage details related to your account</Typography>
            </Box>
            <Button variant='text' startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant='subtitle2'>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Language:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color='black'>
                    <b>English (US)</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Timezone:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color='black'>
                    <b>GMT +2</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Account status:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color='success'>
                    <DoneTwoToneIcon fontSize='small' />
                    <b>Active</b>
                  </Typography>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box p={3} display='flex' alignItems='center' justifyContent='space-between'>
            <Box>
              <Typography variant='h4' gutterBottom>
                Email Addresses
              </Typography>
              <Typography variant='subtitle2'>Manage details related to your associated email addresses</Typography>
            </Box>
            <Button variant='text' startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant='subtitle2'>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color='black'>
                    <b>example@demo.com</b>
                  </Typography>
                  <Box pl={1} component='span'>
                    <Typography color='success'>Primary</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography color='black'>
                    <b>demo@example.com</b>
                  </Typography>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
