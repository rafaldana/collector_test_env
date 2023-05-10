import Link from 'next/link';
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

const ResponsiveDialog2: FC<ResponsiveDialogProps> = ({
  product,
  handlerClose,
}) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // chart color
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
              <Typography>Die Auktiom beginnt um 17:35 Uhr. </Typography>
              <Typography>
                Um teilzunehmen, melde dich in der MS Teams NAWA Gruppe an.
              </Typography>
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

export default ResponsiveDialog2;
