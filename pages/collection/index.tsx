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
