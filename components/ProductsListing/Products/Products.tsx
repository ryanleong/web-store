import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import { FilterType } from '@/store/types';
import { useStore } from '@/store';
import ProductCard from './ProductCard';
import Loader from '@/components/Common/Loader';

interface ProductsProps {}

const classes = {
  productsWrapper: 'px-0 grid grid-flow-row gap-x-4 gap-y-8 grid-cols-2',
  productsWrapperDesktop:
    'md:px-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
  noDataWrapper: 'w-full flex justify-center mt-40',
};

const Products: React.FC<ProductsProps> = () => {
  const { filterValues, fetchProducts, filteredProducts, isLoadingProducts } =
    useStore();
  const category = filterValues[FilterType.CATEGORY];

  useEffect(() => {
    fetchProducts({ category });
  }, [fetchProducts, category]);

  /**
   * Renders the products based on the filter values
   * @returns
   */
  const renderProducts = () => {
    return filteredProducts.map((product) => {
      return (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          brand={product.brand}
          image={product.image}
          price={product.price}
          discountedPrice={product.discountedPrice}
          rating={product.rating}
        />
      );
    });
  };

  /**
   * Renders the no products found message
   * @returns
   */
  const renderNoProducts = () => {
    return (
      <div className={classes.noDataWrapper} data-testid="empty">
        <h2>No Products Found</h2>
      </div>
    );
  };

  return (
    <Loader isLoading={isLoadingProducts}>
      {filteredProducts.length === 0 ? (
        renderNoProducts()
      ) : (
        <motion.main
          className={`${classes.productsWrapper} ${classes.productsWrapperDesktop}`}
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
          }}
        >
          {renderProducts()}
        </motion.main>
      )}
    </Loader>
  );
};

export default Products;
