import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
//Carousel slider for product
import Slider from 'react-slick';

import { Box } from '@mui/material';
//fetch product
import { fetchProducts } from '@store/apps/eCommerce/ECommerceSlice';
import { useDispatch, useSelector } from '@store/Store';

import { ProductType } from '../../../../types/apps/eCommerce';

type ProductCarouselProps = {
  productId?: number;
};

const ProductCarousel: FC<ProductCarouselProps> = ({ productId }) => {
  const slider1 = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const getTitle: string | any = router.query.id;

  // Get Products
  const product: ProductType = useSelector(
    (state) => state.galleryReducer.gallery[productId - 1]
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
        <Box key={productId}>
          <img
            src={`/images/paints/${product.photo}`}
            alt={`pictures-${productId}`}
            width="100%"
            style={{ borderRadius: "5px" }}
          />
        </Box>
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
