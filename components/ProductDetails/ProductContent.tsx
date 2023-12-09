import React, { useState } from "react";
import { Product } from "@/store/types";
import { snakeToText } from "@/utils/string";
import { calculateDiscountedPrice } from "@/utils/product";
import ProductCta from "./ProductCta";

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
  const { name, brand, price, discountPercentage, rating, description } = product;

  const renderPrice = () => {
    if (discountPercentage > 0) {
      const discountdedPrice = calculateDiscountedPrice(price, discountPercentage);

      return (
        <>
          <span className={classes.pricePrimary}>${ discountdedPrice }</span>
          <span className={classes.priceSecondary}>${ price }</span>
        </>
      )
    }

    return (<span className={classes.pricePrimary}>${ price }</span>)
  }

  const renderRating = () => {
    const roundedRating = Math.ceil(rating);
    const stars = Array(roundedRating).fill(0)

    return stars.map((_, idx) => (
      <span key={idx}>⭐</span>
    ))
  }

  return (
    <>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>{name}</h1>
        <p className={classes.brand}>{ snakeToText(brand) }</p>
        <p className={classes.rating}>{ renderRating() }</p>

        <p className={classes.priceWrapper}>
          { renderPrice() }
        </p>

      </div>

      <p>{description}</p>

      <ProductCta product={product}/>
    </>
  )
};

export default ProductContent;