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

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { id, name, brand, price, image } = props;

  return (
    <Link className="flex flex-col" href={`/products/${id}`}>
      <div className="relative w-full h-96 aspect-video">
        <Image
          src={image}
          alt="Product Name"
          sizes="500px"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      <h3 className="text-xl font-medium">{name}</h3>
      <span className="text-md text-gray-500">{brand}</span>
      <span className="text-md text-rose-800">${price}</span>
    </Link>
  );
};

export default ProductCard;
