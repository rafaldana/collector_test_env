import { useSession } from 'next-auth/react';

import { Avatar, Box, CardMedia, Grid, styled, Typography } from '@mui/material';

import BlankCard from '../../../shared/BlankCard';
import ProfileTab from './ProfileTab';

const ProfileBanner = () => {
  const { data: session } = useSession();
  const ProfileImage = styled(Box)(() => ({
    backgroundImage: "linear-gradient(#50b2fc,#f44c66)",
    borderRadius: "50%",
    width: "110px",
    height: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  return (
    <>
      <BlankCard>
        <CardMedia
          component="img"
          image={"/images/backgrounds/profilebg.jpg"}
          alt={"profilecover"}
          width="100%"
        />
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* about profile */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: "1",
                sm: "1",
                lg: "2",
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: "-85px",
              }}
            >
              <Box>
                <ProfileImage>
                  <Avatar
                    src={
                      session && session.user.image
                        ? session.user.image
                        : "/images/profile/user-2.jpg"
                    }
                    alt="profileImage"
                    sx={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                      border: "4px solid #fff",
                    }}
                  />
                </ProfileImage>
                <Box mt={1} mb={2}>
                  <Typography fontWeight={600} variant="h5">
                    {session && session.user?.name ? session.user.name : ""}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  ></Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* friends following buttons */}
        </Grid>
        {/**TabbingPart**/}
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
