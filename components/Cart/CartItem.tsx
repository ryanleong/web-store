import React from "react";
import Image from "next/image";

import { CartItem as ICartItem } from "@/store/types";
import { MIN_PURCHASE_QUANTITY } from "@/utils/constants";
import { normalizePrice } from "@/utils/string";
import { useStore } from "@/store";
import InputStepper from "../Common/InputStepper";

interface CartItemProps {
  item: ICartItem;
}

const classes = {
  wrapper: "flex gap-6 border-b-2 py-4",
  productImage: "h-36 basis-36 grow-0 shrink-0 relative",
  details: "",
  productName: "text-xl mb-1",
  productCols: "basis-36 grow-0 shrink-0 flex justify-end gap-4 flex ml-auto",
  productCol: "basis-28 grow-0 shrink-0 text-center text-lg",
  removeButton: "text-sm",
};

const CartItem: React.FC<CartItemProps> = (props) => {
  const { updateCartItemQuantity, removeItemFromCart } = useStore();
  const { item } = props;
  const { product, quantity, subTotalPrice } = item;
  const { id, name, brand, image, discountedPrice, price } = product;

  const normalizedPrice = normalizePrice(discountedPrice || price);
  const normalizedSubtotal = normalizePrice(subTotalPrice);

  const updateItemQuantity = (qty: number) => {
    updateCartItemQuantity(id, qty)
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
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={classes.details}>
        <h3 className={classes.productName}>{name}</h3>
        <span>{brand}</span>
      </div>

      <div className={classes.productCols}>
        <span className={classes.productCol}>${normalizedPrice}</span>
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
        <span className={classes.productCol}>${normalizedSubtotal}</span>
      </div>
    </div>
  );
};

export default CartItem;
