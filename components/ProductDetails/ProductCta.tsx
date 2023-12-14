import React, { useState } from 'react';
import { MIN_PURCHASE_QUANTITY } from '@/config/constants';
import { useStore } from '@/store';
import { Product } from '@/store/types';
import InputStepper from '../Common/InputStepper';
import InputButton from '../Common/InputButton';

interface ProductCtaProps {
  product: Product;
}

const classes = {
  wrapper: 'mt-10 lg:mt-20',
  quantityWrapper: 'flex mb-1',
  quantity: 'ml-auto',
  notice: 'text-sm text-gray-500 mb-6',
  labelQuanity: 'text-xl font-semibold',
};

const ProductCta: React.FC<ProductCtaProps> = (props) => {
  const { product } = props;
  const { addItemToCart, getCartItemQuantity } = useStore();
  const [quantity, setQuantity] = useState(1);
  const currentQuantity = getCartItemQuantity(product.id);

  return (
    <div className={classes.wrapper}>
      <div className={classes.quantityWrapper}>
        <h4 className={classes.labelQuanity}>Quantity</h4>

        <div className={classes.quantity}>
          <InputStepper
            quantity={quantity}
            setQuantity={setQuantity}
            minimumQuantity={MIN_PURCHASE_QUANTITY}
          />
        </div>
      </div>
      <p className={classes.notice}>You currently have {currentQuantity} in cart.</p>

      <InputButton
        label="Add to cart"
        onClick={() => addItemToCart(product, quantity)}
      />
    </div>
  );
};

export default ProductCta;
