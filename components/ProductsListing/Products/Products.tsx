import React, { useEffect } from "react";

import { FilterType } from "@/store/types";
import { useStore } from "@/store";
import ProductCard from "./ProductCard";

interface ProductsProps {}

const classes = {
  productsWrapper: 'px-0 grid grid-flow-row gap-x-4 gap-y-8 grid-cols-2',
  productsWrapperDesktop: 'md:w-screen md:px-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
  loaderWrapper: 'w-full flex justify-center mt-40',
}

const Products: React.FC<ProductsProps> = () => {
  const { filterValues, fetchProducts, filteredProducts, isLoadingProducts } = useStore();
  const category = filterValues[FilterType.CATEGORY];

  useEffect(() => {
    fetchProducts({ category });
  }, [category]);

  /**
   * Renders the products based on the filter values
   * @returns void
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
          discountPercentage={product.discountPercentage}
        />
      );
    });
  };

  if (isLoadingProducts) {
    return (
      <div className={classes.loaderWrapper}>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className={classes.loaderWrapper}>
        <h2>No Products Found</h2>
      </div>
    )
  }

  return (
    <div className={`${classes.productsWrapper} ${classes.productsWrapperDesktop}`}>
      { renderProducts()}
    </div>
  )
};

export default Products;