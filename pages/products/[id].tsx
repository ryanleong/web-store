import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useStore } from '@/store';
import useApi from '@/api/useApi';
import { Product } from '@/store/types';
import { productResponseToProduct } from '@/utils/product';
import ProductImage from '@/components/ProductDetails/ProductImage';
import ProductContent from '@/components/ProductDetails/ProductContent';

const classes = {
  wrapper: 'container mx-auto px-4 py-8',
  wrapperDesktop: 'lg:gap-4 lg:flex',
  imageContainer: 'mb-6',
  imageContainerDesktop: 'md:basis-[500px] xl:basis-[700px] 2xl:basis-[900px] grow-0 shrink-0 lg:mb-0',
  contentContainer: 'px-4 w-full',
};

const ProductDetails: NextPage<{}> = () => {
  const { query } = useRouter();
  const productId = query?.id;
  const { getProductById } = useStore();
  const { fetchProduct } = useApi();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (productId) init();
  }, [productId]);

  const init = async () => {
    let product = getProductById(productId as string);

    if (!product) {
      const response = await fetchProduct(productId as string);
      product = productResponseToProduct(response);
    }

    setProduct(product);
  };

  if (!product) return <div data-testid="loading">Loading...</div>;

  return (
    <div className={`${classes.wrapper} ${classes.wrapperDesktop}`}>
      <div
        className={`${classes.imageContainer} ${classes.imageContainerDesktop}`}
      >
        <ProductImage images={product.images} altText={product.name} />
      </div>
      <div className={classes.contentContainer}>
        <ProductContent product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
