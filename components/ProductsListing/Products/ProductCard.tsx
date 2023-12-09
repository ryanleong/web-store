import React from "react";
import Image from "next/image";
import Link from "next/link";
import { calculateDiscountedPrice } from "@/utils/product";

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  discountPercentage: number;
}

const classes = {
  wrapper: 'flex flex-col',
  image: 'relative w-full h-44 sm:h-52 md:h-72 aspect-video',
  title: 'text-xl font-medium',
  brand: 'text-sm text-gray-500',
  price: 'flex align-middle',
  pricePrimary: 'text-md text-rose-800',
  priceSecondary: 'ml-2 text-md text-gray-700 line-through',
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { id, name, brand, price, image, discountPercentage } = props;

  const renderPrice = () => {
    if (discountPercentage > 0) {
      const discountdedPrice = calculateDiscountedPrice(price, discountPercentage);

      return (
        <p className={classes.price}>
          <span className={`${classes.pricePrimary}`}>${discountdedPrice}</span>
          <span className={`${classes.priceSecondary}`}>${price}</span>
        </p>
      )
    }

    return (
      <p className={classes.price}>
        <span className={`${classes.pricePrimary}`}>${price}</span>
      </p>
    )
  }
  return (
    <Link className={classes.wrapper} href={`/products/${id}`}>
      <div className={classes.image}>
        <Image
          src={image}
          alt={name}
          sizes="300px"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <h3 className={classes.title}>{name}</h3>
      <span className={`${classes.brand}`}>{brand}</span>
      { renderPrice() }
    </Link>
  );
};

export default ProductCard;
