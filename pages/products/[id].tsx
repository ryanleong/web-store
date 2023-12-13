import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { useStore } from '@/store';
import useApi from '@/api/useApi';
import { Product } from '@/store/types';
import { productResponseToProduct } from '@/utils/product';
import ProductImage from '@/components/ProductDetails/ProductImage';
import ProductContent from '@/components/ProductDetails/ProductContent';
import Loader from '@/components/Common/Loader';

const classes = {
  wrapper: 'container mx-auto px-4 py-8',
  wrapperDesktop: 'lg:gap-4 lg:flex',
  imageContainer: 'mb-6',
  imageContainerDesktop:
    'md:basis-[500px] xl:basis-[700px] 2xl:basis-[900px] grow-0 shrink-0 lg:mb-0',
  contentContainer: 'px-4 w-full',
  noProduct: 'w-full flex justify-center mt-40',
};

const ProductDetails: NextPage<{}> = () => {
  const { query } = useRouter();
  const productId = query?.id;
  const { getProductById } = useStore();
  const { fetchProduct } = useApi();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (productId) init();
  }, [productId]);

  const init = async () => {
    try {
      setIsLoading(true);
      let product = getProductById(productId as string);
      if (!product) {
        const response = await fetchProduct(productId as string);
        product = productResponseToProduct(response);
      }
      setProduct(product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderNoProduct = () => {
    return (
      <div className={classes.noProduct} data-testid="empty">
        <h2>No Product Found</h2>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>{ product?.name } - SecretLab</title>
      </Head>

      <Loader isLoading={isLoading}>
        {product?.id ? (
          <motion.main
            className={`${classes.wrapper} ${classes.wrapperDesktop}`}
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1 },
            }}
          >
            <div
              className={`${classes.imageContainer} ${classes.imageContainerDesktop}`}
            >
              <ProductImage images={product.images} altText={product.name} />
            </div>
            <div className={classes.contentContainer}>
              <ProductContent product={product} />
            </div>
          </motion.main>
        ) : (
          renderNoProduct()
        )}
      </Loader>
    </>
  );
};

export default ProductDetails;
