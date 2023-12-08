import { useEffect } from "react";
import type { NextPage } from "next";
import { useProductsStore } from "@/store/products";
import ProductCard from "@/components/ProductCard";

const Products: NextPage<{}> = () => {
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
    <div id="productsPage">
      <div className="flex border-b-2 p-4">{/* TODO: filter */}</div>

      <div className="p-4 grid grid-flow-row gap-x-4 gap-y-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5">
        { renderProducts() }
      </div>
    </div>
  );
};

export default Products;
