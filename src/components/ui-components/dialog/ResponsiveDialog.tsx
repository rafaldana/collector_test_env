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
    IconBellDollar, IconCalendarTime, IconCurrencyDollar, IconFrame, IconHome2, IconRulerMeasure,
    IconUser
} from '@tabler/icons-react';

type ResponsiveDialogProps = {
  product?: IGallery;
  handlerClose?: Function;
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
      title: "LOT",
      value: product.id,
      icon: <IconHome2 width={20} />,
    },
    {
      title: "Titel",
      value: product.title,
      icon: <IconHome2 width={20} />,
    },
    {
      title: "Autor",
      value: product.autor,
      icon: <IconUser width={20} />,
    },
    {
      title: "Maße",
      value: product.size,
      icon: <IconRulerMeasure width={20} />,
    },
    {
      title: "Einschätzung",
      value: `von  ${new Intl.NumberFormat().format(
        product.estimateFrom
      )}  bis  ${new Intl.NumberFormat().format(product.estimateTo)}`,
      icon: <IconCurrencyDollar width={20} />,
    },
    {
      title: "Technik",
      value: product.media,
      icon: <IconFrame width={20} />,
    },
    {
      title: "Jahr",
      value: product.year,
      icon: <IconCalendarTime width={20} />,
    },
    {
      title: "Provenienz",
      value: product.owner,
      icon: <IconHome2 width={20} />,
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
                    <DashboardCard isFullHeight>
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
                                <Box>
                                  <Typography variant="body1" mb="4px">
                                    {stat.title}
                                  </Typography>
                                </Box>
                              </Stack>

                              {stat.value && (
                                <Typography
                                  variant="subtitle2"
                                  color="textSecondary"
                                  fontWeight={"bold"}
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
