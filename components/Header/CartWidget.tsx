import React, { useEffect } from 'react';
import Link from 'next/link';

import { useStore } from '@/store';

interface CartWidgetProps {}

const classes = {
  cart: 'ml-6 relative',
  cartItemCount:
    'absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-4 h-4 text-center text-white',
};

const CartWidget: React.FC<CartWidgetProps> = ({}) => {
  const { initCart, getCartItemCount } = useStore();
  const currentCount = getCartItemCount();

  useEffect(() => initCart(), [initCart]);

  return (
    <div className={classes.cart}>
      <Link href="/cart" data-testid="cart-link">
        <span className="material-symbols-outlined">shopping_cart</span>

        {currentCount > 0 && (
          <span className={classes.cartItemCount}>{currentCount}</span>
        )}
      </Link>
    </div>
  );
};

export default CartWidget;
