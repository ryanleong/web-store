import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { CART_NOTIFICATION_DURATION } from '@/config/constants';
import { useStore } from '@/store';

interface CartWidgetProps {}

const classes = {
  cart: 'ml-6 relative',
  cartItemCount:
    'absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-4 h-4 text-center text-white',
  cartNotification:
    'w-80 p-5 bg-white absolute top-16 right-0 rounded-md shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)] transition-all pointer-events-none opacity-0',
  cartNotificationShow: 'opacity-100',
  cartNotificationTitle: 'flex align-center gap-1',
  closeButton: 'absolute top-2 right-2',
};

const CartWidget: React.FC<CartWidgetProps> = ({}) => {
  const { initCart, getCartItemCount } = useStore();
  const [hasInit, setHasInit] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [prevItemCount, setPrevItemCount] = useState<number>(0);
  const currentCount = getCartItemCount();

  useEffect(() => {
    initCart();
    setHasInit(true);
  }, [initCart]);

  // Trigger notifcation when item is added to cart
  // Would do this differently if there's a sitewide notification system
  useEffect(() => {
    if (hasInit && currentCount > prevItemCount) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), CART_NOTIFICATION_DURATION);
    }

    setPrevItemCount(currentCount);
  }, [hasInit, prevItemCount, currentCount]);

  return (
    <div className={classes.cart}>
      <Link href="/cart" data-testid="cart-link">
        <span className="material-symbols-outlined">shopping_cart</span>

        {currentCount > 0 && (
          <span className={classes.cartItemCount}>{currentCount}</span>
        )}
      </Link>

      <div
        className={`${classes.cartNotification} ${
          showNotification ? classes.cartNotificationShow : ''
        }`}
        data-testid="notification"
        hidden={!showNotification}
      >
        <h4 className={classes.cartNotificationTitle}>
          <span className="material-symbols-outlined text-green-600">
            check_circle
          </span>
          <span>Your item has been added to cart</span>
        </h4>
      </div>
    </div>
  );
};

export default CartWidget;
