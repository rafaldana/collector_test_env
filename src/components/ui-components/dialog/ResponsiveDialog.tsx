import React, { FC } from 'react';

import ProductCarousel from '@components/apps/ecommerce/productDetail/ProductCarousel';
import ChildCard from '@components/shared/ChildCard';
import { IGallery } from '@models/gallery';
import {
    Box, Button, Chip, Dialog, DialogActions, DialogContent, Grid, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <Box p={2}>
          {product ? (
            <>
              <Grid item xs={12} sm={12} lg={12}>
                <ChildCard>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} lg={6}>
                      <ProductCarousel productId={product.id} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                      <Box mb={5}>
                        <Typography fontWeight="600" variant="h4" mt={1}>
                          {product?.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          mt={1}
                          color={theme.palette.text.secondary}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed ex arcu, tincidunt bibendum felis.
                        </Typography>

                        <Typography mt={2} variant="h5" fontWeight={600}>
                          Start Price: 2000
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </ChildCard>
              </Grid>
            </>
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={(event) => handlerClose(event)} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponsiveDialog;
