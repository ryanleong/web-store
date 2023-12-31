import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';

import CartItems from '@/components/Cart/CartItems';
import CartSummary from '@/components/Cart/CartSummary';

const classes = {
  wrapper: 'container mx-auto px-4 py-8',
  title: 'text-2xl mb-4',
  content: 'lg:flex gap-4',
  items: 'grow mb-6 lg:mb-0',
  breakDown: 'lg:basis-[380px] xl:basis-[450px] grow-0 shrink-0',
};

const CartPage: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>Cart - SecretLab</title>
      </Head>

      <div id="cartPage" className={classes.wrapper}>
        <h1 className={classes.title} data-testid="title">
          Shopping Cart
        </h1>

        <div className={classes.content}>
          <div className={classes.items}>
            <CartItems />
          </div>

          <div className={classes.breakDown}>
            <CartSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
