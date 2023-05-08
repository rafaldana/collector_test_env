import React, { FC } from 'react';

import BlankCard from '@components/shared/BlankCard';
import Counter from '@components/shared/Counter/Counter';
// MUI Elements
import {
    Box, Button, CardContent, Chip, Divider, Fab, Grid, Rating, Stack, Typography, useTheme
} from '@mui/material';
import { AppState, useSelector } from '@store/Store';

import { ProductType } from '../../../../types/apps/eCommerce';
import AlertCart from '../productCart/AlertCart';

type ProductDetailProps = {
  productId?: string;
};

const ProductDetail: FC<ProductDetailProps> = ({ productId }) => {
  const theme = useTheme();
  // Get Products
  const product: ProductType | any = useSelector(
    (state: AppState) => state.galleryReducer.gallery[Number(productId) - 1]
  );

  // for alert when added something to cart
  const [cartalert, setCartalert] = React.useState(false);

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setCartalert(false);
  };

  return (
    <Box p={2}>
      {product ? (
        <>
          <Box display="flex" alignItems="center">
            <Box mb={5}>
              <Chip label="Auction" color="success" size="small" />
              <Stack direction="row" alignItems={"center"} mt={2}>
                <Typography
                  color="textSecondary"
                  variant="caption"
                  ml={1}
                  textTransform="capitalize"
                >
                  {product?.category}
                </Typography>
              </Stack>
            </Box>
          </Box>
          {/* ------------------------------------------- */}
          {/* Title and description */}
          {/* ------------------------------------------- */}
          <Box mb={5}>
            <Stack direction="row" alignItems={"center"} mt={2}>
              <Box>
                <Typography fontWeight="600" variant="h4" mt={1}>
                  {product?.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  mt={1}
                  color={theme.palette.text.secondary}
                >
                  {product.autor}
                </Typography>
              </Box>
              <Counter duration={10} handlerOnComplete={() => {}} />
            </Stack>
            <Typography mt={2} variant="h4" fontWeight={600}>
              Start Price: 2000
            </Typography>
          </Box>
          <Divider />
          <Box mb={2}>
            <Typography my={5} variant="h4" fontWeight={600}>
              Currnent Price: ${product.price}
            </Typography>
          </Box>

          <Box mb={2}>
            <Typography my={5} variant="h4" fontWeight={600}>
              offers list:
            </Typography>
          </Box>

          <Grid item xs={12}>
            <BlankCard>
              <CardContent>
                <Stack direction={"row"} gap={2} alignItems="center">
                  ikona
                  <Box>
                    <Typography variant="h6" textOverflow={"ellipsis"} noWrap>
                      nazwa
                    </Typography>
                  </Box>
                  <Box ml="auto">
                    <p>hajs</p>
                  </Box>
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>

          <Box mb={2}></Box>
          {/* ------------------------------------------- */}
          {/* Buttons */}
          {/* ------------------------------------------- */}
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12}>
              <Button
                color="error"
                size="large"
                fullWidth
                variant="contained"
                onClick={() => {}}
                sx={{ p: 2, borderRadius: "50px" }}
              >
                Bind
              </Button>
            </Grid>
          </Grid>
          {/* ------------------------------------------- */}
          {/* Alert When click on add to cart */}
          {/* ------------------------------------------- */}
          <AlertCart handleClose={handleClose} openCartAlert={cartalert} />
        </>
      ) : null}
    </Box>
  );
};

export default ProductDetail;
