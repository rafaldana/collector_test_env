import React, { FC } from 'react';

import ProductCarousel from '@components/apps/ecommerce/productDetail/ProductCarousel';
import ChildCard from '@components/shared/ChildCard';
import DashboardCard from '@components/shared/DashboardCard';
import { IGallery } from '@models/gallery';
import {
    Avatar, Box, Button, Dialog, DialogActions, DialogContent, Grid, Stack, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    IconBellDollar, IconCalendarTime, IconCurrencyDollar, IconRulerMeasure, IconUser
} from '@tabler/icons-react';

type ResponsiveDialogProps = {
  product: IGallery;
  handlerClose: Function;
};

const ResponsiveDialog: FC<ResponsiveDialogProps> = ({
  product,
  handlerClose,
}) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // chart color

  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;

  const stats = [
    {
      title: "Author",
      value: product.autor,
      icon: <IconUser width={20} />,
    },
    {
      title: "Size",
      value: product.size,
      icon: <IconRulerMeasure width={20} />,
    },
    {
      title: "Estimate price form",
      value: product.estimateFrom,
      icon: <IconCurrencyDollar width={20} />,
    },
    {
      title: "Estimate price to",
      value: product.estimateTo,
      icon: <IconCurrencyDollar width={20} />,
    },
    {
      title: "Price start",
      value: product.priceStart,
      icon: <IconBellDollar width={20} />,
    },
    {
      title: "Year",
      value: product.year || undefined,
      icon: <IconCalendarTime width={20} />,
    },
  ];

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="lg"
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <Box p={2}>
          <>
            <Grid item xs={12} sm={12} lg={12}>
              <ChildCard>
                <Grid container spacing={3} alignItems={"center"}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={6}
                    sx={{ position: "relative", height: "100%" }}
                  >
                    <ProductCarousel productId={product.id} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={6}
                    alignSelf={"stretch"}
                    justifySelf={"center"}
                  >
                    <DashboardCard title={product.title} isFullHeight>
                      <>
                        <Stack spacing={3} mt={5} sx={{ minHeight: "100%" }}>
                          {stats.map((stat, i) => (
                            <Stack
                              direction="row"
                              spacing={3}
                              justifyContent="space-between"
                              alignItems="center"
                              key={i}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    bgcolor: primarylight,
                                    color: primary,
                                    width: 40,
                                    height: 40,
                                  }}
                                >
                                  {stat.icon}
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" mb="4px">
                                    {stat.title}
                                  </Typography>
                                </Box>
                              </Stack>

                              {stat.value && (
                                <Typography
                                  variant="subtitle2"
                                  color="textSecondary"
                                >
                                  {stat.value}
                                </Typography>
                              )}
                            </Stack>
                          ))}
                        </Stack>
                      </>
                    </DashboardCard>
                  </Grid>
                </Grid>
              </ChildCard>
            </Grid>
          </>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={(event) => handlerClose(event)} sx={{ my: 3, mx: 4 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponsiveDialog;
