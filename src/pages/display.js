import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { Details } from 'src/sections/display/details';
import { useRouter } from 'next/router';


const DisplayPage = () => {

  const router = useRouter();
  const company = JSON.parse(router.query.companyData || '{}'); // Retrieve and parse the company data


  return (
    <>
      <Head>
        <title>
          รายละเอียดโพสต์
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                รายละเอียดโพสต์
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >

                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <Details detail={company} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

DisplayPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default DisplayPage;
