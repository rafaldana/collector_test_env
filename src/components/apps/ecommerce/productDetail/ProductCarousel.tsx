import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
//Carousel slider for product
import Slider from 'react-slick';

import { Box } from '@mui/material';
//fetch product
import { fetchProducts } from '@store/apps/eCommerce/ECommerceSlice';
import { useDispatch, useSelector } from '@store/Store';

import { ProductType } from '../../../../types/apps/eCommerce';
//Carousel slider data
import SliderData from './SliderData';

const ProductCarousel = () => {
  const slider1 = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const getTitle: string | any = router.query.id;

  // Get Product
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get Products
  const product: ProductType = useSelector(
    (state) => state.ecommerceReducer.products[getTitle - 1]
  );
  const getProductImage = product ? product.photo : "";

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 5,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: true,
    className: "centerThumb",
    speed: 500,
  };

  return (
    <Box>
      <Slider ref={(slider: any) => (slider1.current = slider)}>
        <Box>
          <img
            src={getProductImage}
            alt={getProductImage}
            width="100%"
            style={{ borderRadius: "5px" }}
          />
        </Box>
        {SliderData.map((step) => (
          <Box key={step.id}>
            <img
              src={step.imgPath}
              alt={step.imgPath}
              width="100%"
              style={{ borderRadius: "5px" }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
