import Link from 'next/link';

import PageContainer from '@components/container/PageContainer';
import Logo from '@layouts/full/shared/logo/Logo';
import { Box, Grid, Stack, Typography } from '@mui/material';

import AuthLogin from '../authForms/AuthLogin';

const Login = () => (
  <PageContainer>
    <Grid
      container
      spacing={0}
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Box position="relative">
          <Box px={3}>
            <Logo />
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={"calc(100vh - 75px)"}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            <img
              src={"/images/backgrounds/login-bg.svg"}
              alt="bg"
              style={{
                width: "100%",
                maxWidth: "500px",
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={4}>
          <AuthLogin
            title="Welcome to Collector"
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  You are new here?
                </Typography>
                <Typography
                  component={Link}
                  href="/auth/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

Login.layout = "Blank";
export default Login;
