import {
  MAX_PURCHASE_QUANTITY,
  MIN_PURCHASE_QUANTITY,
} from "@/utils/constants";
import React, { useState } from "react";

interface ProductCtaProps {}

const classes = {
  wrapper: "mt-10 lg:mt-20",
  quantityWrapper: "flex",
  labelQuanity: "text-xl font-semibold",
  stepper: "ml-auto mb-6 border-2",
  stepperDownButon: "px-3 border-r-2",
  stepperUpButton: "px-3 border-l-2",
  stepperUpValue: "px-0 w-8 text-center",
  ctaButton: "w-full h-12 bg-red-800 text-white rounded-full",
};

const ProductCta: React.FC<ProductCtaProps> = (props) => {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (value: number) => {
    const newQuantity = quantity + value;

    if (newQuantity < MIN_PURCHASE_QUANTITY) {
      setQuantity(MIN_PURCHASE_QUANTITY);
    } else if (newQuantity > MAX_PURCHASE_QUANTITY) {
      setQuantity(MAX_PURCHASE_QUANTITY);
    } else {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.quantityWrapper}>
        <h4 className={classes.labelQuanity}>Quantity</h4>

        <div className={classes.stepper}>
          <button
            className={classes.stepperDownButon}
            onClick={() => updateQuantity(-1)}
          >
            -
          </button>
          <input
            type="number"
            className={classes.stepperUpValue}
            value={quantity}
          />
          <button
            className={classes.stepperUpButton}
            onClick={() => updateQuantity(1)}
          >
            +
          </button>
        </div>
      </div>

      <button className={classes.ctaButton}>Add to cart</button>
    </div>
  );
};

export default ProductCta;
