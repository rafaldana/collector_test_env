import Image from 'next/image';
import { FC } from 'react';

//fetch product
import { useSelector } from '@store/Store';

import { ProductType } from '../../../../types/apps/eCommerce';

type ProductCarouselProps = {
  productId?: string;
};

const ProductCarousel: FC<ProductCarouselProps> = ({ productId }) => {
  // Get Products
  const product: ProductType = useSelector(
    (state) => state.galleryReducer.gallery[Number(productId) - 1]
  );

  if (!product) {
    return null;
  }

  return (
    <>
      <Image
        src={`/images/paints/${product.photo}`}
        alt={`pictures-${productId}`}
        width={500}
        height={600}
        style={{ width: "100%", height: "auto" }}
      />
    </>
  );
};

export default ProductCarousel;
