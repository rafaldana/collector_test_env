import { getSession } from 'next-auth/react';

import IntroCard from '@components/apps/userprofile/profile/IntroCard';
import ProfileBanner from '@components/apps/userprofile/profile/ProfileBanner';
import ProfileWizard from '@components/apps/userprofile/ProfileWizard';
import PageContainer from '@components/container/PageContainer';
import { Grid } from '@mui/material';

const UserProfile = () => {
  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>

        {/* intro and Photos Card */}
        <Grid item sm={12} lg={4} xs={12}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <IntroCard />
            </Grid>
          </Grid>
        </Grid>
        {/* Posts Card */}
        <Grid item sm={12} lg={8} xs={12}>
          <ProfileWizard />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
