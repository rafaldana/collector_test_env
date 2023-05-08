import { format } from 'date-fns';
import React, { use, useEffect, useState } from 'react';

import BlankCard from '@components/shared/BlankCard';
import ResponsiveDialog from '@components/ui-components/dialog/ResponsiveDialog';
import {
    Box, CardMedia, Chip, Grid, IconButton, InputAdornment, Skeleton, Stack, TextField, Typography
} from '@mui/material';
import { fetchGallery } from '@store/gallery/GallerySlice';
import { useDispatch, useSelector } from '@store/Store';
import { IconCircleArrowRight } from '@tabler/icons-react';

const GalleryCard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const openDetailsModal = (index: number) => {
    setCurrentProduct(gallery[index - 1]);
    setIsModalOpen(true);
  };

  const closeDetailsModal = (event) => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const gallery = useSelector((state) => state.galleryReducer.gallery);

  console.log("gallery", gallery);

  // skeleton
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems={"center"} mt={2}>
            <Box>
              <Typography variant="h3">
                Pre-auction exhibition &nbsp;
                <Chip label={gallery.length} color="secondary" size="small" />
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {gallery.map((item, index) => {
          return (
            <Grid item xs={12} lg={4} key={item.id}>
              <BlankCard className="hoverCard">
                {isLoading ? (
                  <>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width="100%"
                      height={500}
                    ></Skeleton>
                  </>
                ) : (
                  <CardMedia
                    component={"img"}
                    height="500"
                    alt={item.title}
                    src={`/images/paints/${item.photo}`}
                    sx={{ cursor: "pointer" }}
                    onClick={() => openDetailsModal(item.id)}
                  />
                )}
                <Box p={3}>
                  <Stack
                    direction="row"
                    gap={1}
                    sx={{
                      "&:hover": { cursor: "pointer" },
                      minHeight: "100px;",
                    }}
                    alignItems={"center"}
                    onClick={() => openDetailsModal(item.id)}
                  >
                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="caption">{item.autor}</Typography>
                    </Box>
                    <Box ml={"auto"}>
                      <IconButton>
                        <IconCircleArrowRight size="24" />
                      </IconButton>
                    </Box>
                  </Stack>
                </Box>
              </BlankCard>
            </Grid>
          );
        })}
      </Grid>
      {isModalOpen && (
        <ResponsiveDialog
          product={currentProduct}
          handlerClose={closeDetailsModal}
        />
      )}
    </>
  );
};

export default GalleryCard;
