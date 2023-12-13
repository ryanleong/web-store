import React from 'react';

import { normalizePrice } from '@/utils/string';
import { useStore } from '@/store';
import InputButton from '../Common/InputButton';

interface CartSummaryProps {}

const classes = {
  wrapper: 'w-full bg-neutral-200 px-4 py-6 rounded-lg',
  title: 'text-2xl mb-8',
  lineItem: 'flex gap-3 justify-between mb-2 text-neutral-800',
  total: 'mt-6 py-2 flex justify-between text-lg border-y-2 border-neutral-500',
  totalPrice: 'text-red-700',
  cta: 'mt-6',
};

const CartSummary: React.FC<CartSummaryProps> = () => {
  const { totalPrice } = useStore();
  const normalizedTotalPrice = normalizePrice(totalPrice);

  // Note: no shipping logic included as of now
  const total = normalizedTotalPrice;

  const onCheckoutClick = () => {
    // TODO: implement checkout
  };

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Summary</h2>

      <div className={classes.lineItem}>
        <span>Subtotal</span>
        <span data-testid="subtotalPrice">${normalizedTotalPrice}</span>
      </div>

      <div className={classes.lineItem}>
        <span>Estimated Delivery & Handling</span>
        <span>$0</span>
      </div>

      <div className={classes.total}>
        <span>Total</span>
        <span className={classes.totalPrice} data-testid="totalPrice">
          ${total}
        </span>
      </div>

      <div className={classes.cta}>
        <InputButton label="Checkout" onClick={onCheckoutClick} />
      </div>
    </div>
  );
};

export default CartSummary;
