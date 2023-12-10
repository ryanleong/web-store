import React from 'react';
import Image from 'next/image';

import { CartItem as ICartItem } from '@/store/types';
import { MIN_PURCHASE_QUANTITY } from '@/utils/constants';
import { normalizePrice } from '@/utils/string';
import { useStore } from '@/store';
import InputStepper from '../Common/InputStepper';

interface CartItemProps {
  item: ICartItem;
}

const classes = {
  wrapper: 'flex gap-4 border-b-2 py-4',
  productImage: 'h-20 sm:h-24 xl:h-36 basis-20 sm:basis-24 xl:basis-36 grow-0 shrink-0 relative',
  contentWrapper: 'grow flex gap-4 flex-wrap sm:flex-nowrap',
  details: 'grow w-full',
  productName: 'text-xl mb-1',
  productCol: 'sm:basis-28 grow-0 shrink-0 text-center text-lg',
  unitPrice: 'text-neutral-700',
  totalPrice: 'ml-auto text-red-700',
  removeButton: 'text-sm',
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const { updateCartItemQuantity, removeItemFromCart } = useStore();
  const { item } = props;
  const { product, quantity, subTotalPrice } = item;
  const { id, name, brand, image } = product;
  const normalizedSubtotal = normalizePrice(subTotalPrice);

  const updateItemQuantity = (qty: number) => {
    updateCartItemQuantity(id, qty);
  };

  const onRemoveClick = () => {
    removeItemFromCart(id);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.productImage}>
        <Image
          src={image}
          alt={image}
          sizes="200px"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className={classes.contentWrapper}>
        <div className={classes.details}>
          <h3 className={classes.productName}>{name}</h3>
          <span>{brand}</span>
        </div>

        <span className={classes.productCol}>
          <InputStepper
            quantity={quantity}
            setQuantity={updateItemQuantity}
            minimumQuantity={MIN_PURCHASE_QUANTITY}
          />
          <button className={classes.removeButton} onClick={onRemoveClick}>
            Remove
          </button>
        </span>
        <span className={`${classes.productCol} ${classes.totalPrice}`}>
          ${normalizedSubtotal}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
