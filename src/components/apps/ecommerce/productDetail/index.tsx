import { sep } from 'path';
import React, { FC, useEffect, useState } from 'react';
import { useLocalSlice } from 'use-local-slice';

import BlankCard from '@components/shared/BlankCard';
import Counter from '@components/shared/Counter/Counter';
import config from '@config/index';
import { IGallery } from '@models/gallery';
// MUI Elements
import {
    Box, Button, CardContent, Chip, Divider, Fab, Grid, Rating, Stack, Typography, useTheme
} from '@mui/material';
import { AppState, useDispatch, useSelector } from '@store/Store';
import { decreaseAmount } from '@store/user/UserSlice';

import AlertCart from '../productCart/AlertCart';

type ProductDetailProps = {
  productId?: string;
};

const randRange = (data) => {
  var newTime = data[Math.floor(data.length * Math.random())];
  return newTime;
};

const ProductDetail: FC<ProductDetailProps> = ({ productId }) => {
  const theme = useTheme();
  let botTimer;
  const dispatch = useDispatch();
  const [isOver, setIsOver] = useState(false);

  const product: IGallery | any = useSelector(
    (state: AppState) => state.galleryReducer.gallery[Number(productId) - 1]
  );

  const [state, dispatchAction] = useLocalSlice({
    slice: "auctions", // optional - will be displayed in the debug tools
    initialState: {
      currentPrice: 0,
      nextPrice: 0,
      offers: [
        { name: "You", price: 0 },
        { name: "Gallery", price: 0 },
        { name: "Internet", price: 0 },
        { name: "Phone", price: 0 },
      ],
    },
    reducers: {
      updateCurrentPrice: (state, action: { payload: number }) => {
        state.currentPrice = action.payload;
      },
      upgradeNextPrice: (state, action: { payload: number }) => {
        state.nextPrice = action.payload;
      },
      calcNextPrice: (state) => {
        if (state.currentPrice < product.priceStart) {
          return;
        }

        const stepPrice =
          state.currentPrice <= config.higherBindLimit
            ? config.nextPriceBind
            : config.higherNextPriceBind;

        state.nextPrice = state.currentPrice + stepPrice;
      },
      increaseByBot: (state) => {
        const botName = ["Gallery", "Internet", "Phone"];
        const name = botName[Math.floor(Math.random() * botName.length)];

        state.currentPrice = state.nextPrice;
        state.offers = state.offers.map((offer) => {
          if (offer.name === name) {
            return {
              ...offer,
              price: state.nextPrice,
            };
          }
          return offer;
        });
      },
      increaseByUser: (state, action: { payload: number }) => {
        state.currentPrice = action.payload;
        state.offers = state.offers.map((offer) => {
          if (offer.name === "You") {
            return {
              ...offer,
              price: action.payload,
            };
          }
          return offer;
        });
      },
    },
  });

  const [cartalert, setCartalert] = React.useState(false);

  function botTrigger() {
    dispatchAction.calcNextPrice();
    dispatchAction.increaseByBot();
  }

  function botPriceUp() {
    const timeArray = new Array(2000, 3000, 5000);
    botTrigger();
    clearInterval(botTimer);
    botTimer = setInterval(botPriceUp, randRange(timeArray));
  }

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setCartalert(false);
  };

  const handleUserBind = () => {
    dispatchAction.increaseByUser(state.nextPrice);
    dispatchAction.calcNextPrice();
  };

  const handleSumUp = () => {
    // pobrać hajs
    // sprawdzić czy tutaj wyświetla się napis, jak to to wyświetlić
    // wysłać żadanie d bazy z infomacjami o aukcji.
    // jeżeli to inna niż 40 aukcja przekierować na następną

    if (product) {
    }
  };

  useEffect(() => {
    botTimer = setInterval(botPriceUp, 1000);
    return () => {
      clearInterval(botTimer);
    };
  }, []);

  useEffect(() => {
    dispatchAction.updateCurrentPrice(product.priceStart);
    dispatchAction.calcNextPrice();
  }, []);

  return (
    <Box p={2}>
      {product ? (
        <>
          <Box display="flex" alignItems="center" key={productId}>
            <Box>
              <Stack direction="row" alignItems={"center"} gap={2}>
                <Chip label="Auction" color="success" size="small" />
                <Chip
                  label={`AU-SKU-${product.photo.slice(0, -4)}`}
                  color="info"
                  size="small"
                />
              </Stack>
              <Stack direction="row" alignItems={"center"}>
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
          <Box mb={3}>
            <Stack
              direction="row"
              mt={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography fontWeight="600" variant="h4">
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
              <Counter
                size={100}
                duration={config.auctionTime}
                handlerOnComplete={handleSumUp}
              />
            </Stack>
            <Stack direction="row" mt={2} gap={2} alignItems={"center"}>
              <Typography mt={2} variant="body1" fontWeight={600}>
                Start Price:
              </Typography>
              <Typography mt={2} variant="h5" fontWeight={600}>
                {new Intl.NumberFormat().format(product.priceStart)}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box mb={1}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box>
                <Typography my={3} variant="h6" fontWeight={600}>
                  Current Price:
                </Typography>
              </Box>
              <Box>
                <Typography my={3} variant="h6" fontWeight={600}>
                  {new Intl.NumberFormat().format(state.currentPrice)}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Grid item xs={12}>
            {[...state.offers]
              .sort((a, b) => b.price - a.price)
              .map((item) => (
                <BlankCard sx={{ mb: 1, p: 1 }} key={item.name}>
                  <CardContent sx={{ my: 1 }}>
                    <Stack direction="row" gap={2} alignItems="center">
                      <Box>
                        <Typography
                          variant="h6"
                          textOverflow={"ellipsis"}
                          noWrap
                        >
                          {item.name}
                        </Typography>
                      </Box>
                      <Box ml="auto">
                        {new Intl.NumberFormat().format(item.price)}
                      </Box>
                    </Stack>
                  </CardContent>
                </BlankCard>
              ))}
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
                onClick={() => handleUserBind()}
                sx={{ p: 2, borderRadius: "50px" }}
              >
                Bind: {new Intl.NumberFormat().format(state.nextPrice)}
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
