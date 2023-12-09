import { useProductsStore } from "@/store/products";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

interface ProductsProps {}

const classes = {
  productsWrapper: 'px-0 grid grid-flow-row gap-x-4 gap-y-8 grid-cols-2',
  productsWrapperDesktop: 'lg:w-screen lg:px-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3',
}

const Products: React.FC<ProductsProps> = () => {
  const { initProducts, products, isLoadingAll } = useProductsStore();

  useEffect(() => {
    initProducts();
  }, [initProducts]);

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          brand={product.brand}
          image={product.image}
          price={product.price}
        />
      );
    });
  };

  if (isLoadingAll) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${classes.productsWrapper} ${classes.productsWrapperDesktop}`}>
      { renderProducts() }
    </div>
  )
};

export default Products;