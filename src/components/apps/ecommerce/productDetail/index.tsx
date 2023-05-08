import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// MUI Elements
import {
    Box, Button, Chip, Divider, Fab, Grid, Rating, Stack, Typography, useTheme
} from '@mui/material';
import { addToCart, fetchProducts } from '@store/apps/eCommerce/ECommerceSlice';
import { AppState, useDispatch, useSelector } from '@store/Store';

import { ProductType } from '../../../../types/apps/eCommerce';
import AlertCart from '../productCart/AlertCart';

const ProductDetail = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const getTitle: string | any = router.query.id;
  console.log(getTitle);
  // Get Product
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(getTitle);

  // Get Products
  const product: ProductType | any = useSelector(
    (state: AppState) => state.ecommerceReducer.products[getTitle - 1]
  );

  //set qty
  const [count, setCount] = useState(1);

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
            {/* ------------------------------------------- */}
            {/* Badge and category */}
            {/* ------------------------------------------- */}
            <Box mb={5}>
              <Chip label="Auction" color="success" size="small" />

              <Typography
                color="textSecondary"
                variant="caption"
                ml={1}
                textTransform="capitalize"
              >
                {product?.category}
              </Typography>
            </Box>
          </Box>
          {/* ------------------------------------------- */}
          {/* Title and description */}
          {/* ------------------------------------------- */}
          <Box mb={5}>
            <Typography fontWeight="600" variant="h4" mt={1}>
              {product?.title}
            </Typography>
            <Typography
              variant="subtitle2"
              mt={1}
              color={theme.palette.text.secondary}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex
              arcu, tincidunt bibendum felis.
            </Typography>

            <Typography mt={2} variant="h5" fontWeight={600}>
              Start Price: 2000
            </Typography>
          </Box>
          <Divider />
          <Box mb={2}>
            {/* ------------------------------------------- */}
            {/* Price */}
            {/* ------------------------------------------- */}
            <Typography my={5} variant="h2" fontWeight={600}>
              Currnent Price: ${product.price}
            </Typography>
          </Box>
          <Divider />
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
                onClick={() => dispatch(addToCart(product)) && handleClick()}
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
