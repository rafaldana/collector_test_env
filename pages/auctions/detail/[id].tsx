import ProductDetail from '@components/apps/ecommerce/productDetail';
import ProductCarousel from '@components/apps/ecommerce/productDetail/ProductCarousel';
import ProductDesc from '@components/apps/ecommerce/productDetail/ProductDesc';
import PageContainer from '@components/container/PageContainer';
import ChildCard from '@components/shared/ChildCard';
import Breadcrumb from '@layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Details",
  },
];

const EcommerceDetail = () => {
  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Auction Details" items={BCrumb} />
      <Grid
        container
        spacing={3}
        sx={{ maxWidth: { lg: "1055px", xl: "1200px" } }}
      >
        <Grid item xs={12} sm={12} lg={12}>
          <ChildCard>
            {/* ------------------------------------------- */}
            {/* Carousel */}
            {/* ------------------------------------------- */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                <ProductCarousel />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <ProductDetail />
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
        {/* ------------------------------------------- */}
        {/* Description */}
        {/* ------------------------------------------- */}
        <Grid item xs={12} sm={12} lg={12}>
          <ProductDesc />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EcommerceDetail;
