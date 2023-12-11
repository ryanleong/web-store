import React from 'react';
import { Product } from '@/store/types';
import { normalizePrice, snakeToText } from '@/utils/string';
import ProductCta from './ProductCta';
import Rating from '../Common/Rating';

interface ProductContentProps {
  product: Product;
}

const classes = {
  wrapper: 'mb-6',
  title: 'text-4xl font-semibold mb-2',
  brand: '',
  rating: 'mb-2',
  priceWrapper: 'flex gap-2 align-middle',
  pricePrimary: 'text-2xl text-red-700',
  priceSecondary: 'text-lg text-gray-700 line-through',
};

const ProductContent: React.FC<ProductContentProps> = (props) => {
  const { product } = props;
  const { name, brand, price, discountedPrice, rating, description } = product;

  const renderPrice = () => {
    if (discountedPrice > 0) {
      return (
        <>
          <span className={classes.pricePrimary} data-testid='discountedPrice'>
            ${normalizePrice(discountedPrice)}
          </span>
          <span className={classes.priceSecondary} data-testid='priceWDiscount'>${price}</span>
        </>
      );
    }

    return <span className={classes.pricePrimary} data-testid='price'>${price}</span>;
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>{name}</h1>
        <p className={classes.brand}>{snakeToText(brand)}</p>
        <Rating rating={rating} styleOverride={classes.rating} />

        <p className={classes.priceWrapper}>{renderPrice()}</p>
      </div>

      <p>{description}</p>

      <ProductCta product={product} />
    </>
  );
};

export default ProductContent;
