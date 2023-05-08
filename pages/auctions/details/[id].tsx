import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ProductDetail from '@components/apps/ecommerce/productDetail';
import ProductCarousel from '@components/apps/ecommerce/productDetail/ProductCarousel';
import ProductDesc from '@components/apps/ecommerce/productDetail/ProductDesc';
import ProfileBanner from '@components/apps/userprofile/profile/ProfileBanner';
import PageContainer from '@components/container/PageContainer';
import ChildCard from '@components/shared/ChildCard';
import { IGallery } from '@models/gallery';
import { Grid } from '@mui/material';
import { fetchGallery } from '@store/gallery/GallerySlice';
import { useDispatch, useSelector } from '@store/Store';

const AuctionDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const getProductId: string | any = router.query.id;

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const product: IGallery = useSelector(
    (state) => state.galleryReducer.gallery[Number(getProductId) - 1]
  );

  if (!product) {
    return null;
  }

  return (
    <PageContainer>
      <Grid item sm={12}>
        <ProfileBanner />
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{ maxWidth: { lg: "1055px", xl: "1200px" } }}
      >
        <Grid item xs={12} sm={12} lg={12}>
          <ChildCard>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                <ProductCarousel productId={product.id} />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <ProductDetail productId={product.id} />
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <ProductDesc />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AuctionDetails;

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
