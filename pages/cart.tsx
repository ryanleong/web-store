import CartItems from "@/components/Cart/CartItems";
import type { NextPage } from "next";
import React, { useEffect } from "react";

const classes = {
  wrapper: "container mx-auto px-4 py-8",
  title: 'text-2xl mb-4',
  content: 'flex gap-4',
  items: 'grow',
  breakDown: '2xl:basis-[450px] grow-0 shrink-0',
}

const CartPage: NextPage<{}> = () => {

  return (
    <div id="cartPage" className={classes.wrapper}>
      <h1 className={classes.title}>Shopping Cart</h1>

      <div className={classes.content}>
        <div className={classes.items}>
          <CartItems />
        </div>

        <div className={classes.breakDown}>
          Cost breakdown
        </div>
      </div>
    </div>
  );
};

export default CartPage;
