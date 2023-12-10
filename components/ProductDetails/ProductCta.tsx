import React, { useState } from "react";
import { MIN_PURCHASE_QUANTITY } from "@/utils/constants";
import { useStore } from "@/store";
import { Product } from "@/store/types";
import InputStepper from "../Common/InputStepper";

interface ProductCtaProps {
  product: Product;
}

const classes = {
  wrapper: "mt-10 lg:mt-20",
  quantityWrapper: "flex mb-6",
  quantity: "ml-auto",
  labelQuanity: "text-xl font-semibold",
  ctaButton: "w-full h-12 bg-red-700 text-white rounded-full",
};

const ProductCta: React.FC<ProductCtaProps> = (props) => {
  const { product } = props;
  const { addItemToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

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

      <button
        onClick={() => addItemToCart(product, quantity)}
        className={classes.ctaButton}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCta;
