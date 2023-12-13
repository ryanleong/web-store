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
      return <CartItem key={item.product.id} item={item} />;
    });
  };

  const renderCart = () => {
    return (
      <>
        <div className={classes.productCols}>
          <span className={classes.productCol}>Quantity</span>
          <span className={classes.productCol}>Price</span>
        </div>
        {renderItems()}
      </>
    )
  }

  const renderEmpty = () => {
    return (
      <div className="w-full flex justify-center my-40">
        <h2>No Items in cart</h2>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      {cartItems.length > 0 ? renderCart() : renderEmpty()}
    </div>
  );
};

export default CartItems;
