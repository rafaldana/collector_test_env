import { getSession } from 'next-auth/react';

import ProfileBanner from '@components/apps/userprofile/profile/ProfileBanner';
import ProfileWizard from '@components/apps/userprofile/ProfileWizard';
import PageContainer from '@components/container/PageContainer';
import { Grid } from '@mui/material';

const Home = ({ session }) => {
  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>
        {/* intro and Photos Card */}
        <Grid item sm={12}>
          <ProfileWizard />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Home;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

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
