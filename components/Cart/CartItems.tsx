import React from 'react';
import { useStore } from '@/store';
import CartItem from './CartItem';

interface CartItemsProps {}

const classes = {
  wrapper: 'w-full',
  productCols: 'hidden sm:flex justify-end gap-4',
  productCol: 'basis-28 grow-0 shrink-0 text-center',
};

const CartItems: React.FC<CartItemsProps> = () => {
  const { cartItems } = useStore();

  const renderItems = () => {
    return cartItems.map((item) => {
      return (
        <CartItem key={item.product.id} item={item} />
      );
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.productCols}>
        {/* <span className={classes.productCol}>Price</span> */}
        <span className={classes.productCol}>Quantity</span>
        <span className={classes.productCol}>Price</span>
      </div>

      {renderItems()}
    </div>
  );
};

export default CartItems;
