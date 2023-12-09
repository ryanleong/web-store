import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const classes = {
  wrapper: 'flex flex-col',
  image: 'relative w-full h-80 aspect-video',
  title: 'text-xl font-medium',
  subtext: 'text-md',
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { id, name, brand, price, image } = props;

  return (
    <Link className={classes.wrapper} href={`/products/${id}`}>
      <div className={classes.image}>
        <Image
          src={image}
          alt="Product Name"
          sizes="300px"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <h3 className={classes.title}>{name}</h3>
      <span className={`${classes.subtext} text-gray-500`}>{brand}</span>
      <span className={`${classes.subtext} text-rose-800`}>${price}</span>
    </Link>
  );
};

export default ProductCard;
