import { getSession } from 'next-auth/react';

import GalleryCard from '@components/apps/userprofile/gallery/GalleryCard';
import ProfileBanner from '@components/apps/userprofile/profile/ProfileBanner';
import PageContainer from '@components/container/PageContainer';
import { Grid } from '@mui/material';

const Gallery = () => {
  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>
        <Grid item sm={12}>
          <GalleryCard />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Gallery;

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
