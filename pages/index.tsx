import type { NextPage } from 'next';
import React, { useEffect } from 'react';

import { useStore } from '@/store';
import ProductsFilter from '@/components/ProductsListing/ProductsFilter/ProductsFilter';
import Products from '@/components/ProductsListing/Products/Products';

const classes = {
  wrapper: 'py-8',
  header: 'flex align-middle px-4 mb-4',
  title: 'text-2xl',
  content: 'relative w-full flex px-4',
}

const HomePage: NextPage<{}> = () => {
  const { productsCount, fetchCategories, isLoadingCategories } = useStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoadingCategories) {
    return <div>Loading...</div>;
  }

  return (
    <div id="HomePage" className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.title} data-testid='title'>Products ({productsCount})</h1>
      </div>

      <div className={classes.content}>
        <ProductsFilter />
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
