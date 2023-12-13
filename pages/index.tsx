import type { NextPage } from 'next';
import Head from 'next/head'
import React, { useEffect } from 'react';

import { useStore } from '@/store';
import ProductsFilter from '@/components/ProductsListing/ProductsFilter/ProductsFilter';
import Products from '@/components/ProductsListing/Products/Products';

const classes = {
  wrapper: 'py-8',
  header: 'flex align-middle px-4 mb-4',
  title: 'text-2xl',
  content: 'relative w-full flex px-4 justify-center',
}

const HomePage: NextPage<{}> = () => {
  const { productsCount, fetchCategories, categories, isLoadingCategories } = useStore();

  useEffect(() => {
    if (categories.length < 1) fetchCategories()
  }, [fetchCategories, categories]);

  if (isLoadingCategories) return null

  return (
    <>
      <Head>
        <title>Home - SecretLab</title>
      </Head>
      <div id="HomePage" className={classes.wrapper}>
        <div className={classes.header}>
          <h1 className={classes.title} data-testid='title'>Products ({productsCount})</h1>
        </div>

        <div className={classes.content}>
          <ProductsFilter />
          <Products />
        </div>
      </div>
    </>
  );
};

export default HomePage;
