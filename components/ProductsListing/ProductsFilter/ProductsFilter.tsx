import React, { useState } from "react";

import { useProductsStore } from "@/store/products";
import { FilterType } from "./types";
import { PRODUCT_MAX_PRICE, PRODUCT_RATINGS } from "@/utils/constants";
import ProductsFilterCheckbox from "./ProductsFilterCheckbox";
import ProductsFilterPrice from "./ProductsFilterPrice";

interface ProductsFilterProps {}

const classes = {
  wrapper: "lg:basis-56 grow-0 shrink-0",
  content:
    "w-screen fixed left-0 z-20 px-4 py-6 bg-white transition-all shadow-[0_-3px_16px_-2px_rgba(0,0,0,0.68)] h-screen flex flex-col",
  contentDesktop: "lg:w-auto lg:relative lg:px-0 lg:py-0 lg:shadow-none lg:h-auto",
  title: "text-2xl mb-4",
  filterWrapper: 'overflow-y-auto',
  mobileButtons: "flex gap-4 mt-auto",
  clearButton: "w-full h-10 border-2 rounded-full",
  doneButton:
    "w-full h-10 border-2 rounded-full border-black bg-black text-white lg:hidden",
  mobileExpander: 'block w-full fixed bottom-0 left-0 bg-neutral-950 text-white p-4 text-lg z-10 lg:hidden'
};

const ProductsFilter: React.FC<ProductsFilterProps> = () => {
  const { categories } = useProductsStore();
  const [mobileFilterActive, setIsMobileFilterActive] = useState(false);

  const activeMobileFilterClass = mobileFilterActive
    ? "bottom-0 lg:bottom-auto"
    : "-bottom-full lg:bottom-auto";

  return (
    <div className={classes.wrapper}>
      <div
        className={`${classes.content} ${classes.contentDesktop} ${activeMobileFilterClass}`}
      >
        <h3 className={classes.title}>Filter</h3>

        <div className={classes.filterWrapper}>
          <ProductsFilterCheckbox
            filterType={FilterType.CATEGORY}
            items={categories}
          />

          <ProductsFilterCheckbox
            filterType={FilterType.RATING}
            items={PRODUCT_RATINGS}
          />

          <ProductsFilterPrice
            filterType={FilterType.PRICE}
            items={PRODUCT_MAX_PRICE}
          />
        </div>

        <div className={classes.mobileButtons}>
          <button className={classes.clearButton}>Reset</button>
          <button
            className={classes.doneButton}
            onClick={() => setIsMobileFilterActive(false)}
          >
            Done
          </button>
        </div>
      </div>

      <button
        className={classes.mobileExpander}
        onClick={() => setIsMobileFilterActive(!mobileFilterActive)}
      >
        Filter
      </button>
    </div>
  );
};

export default ProductsFilter;
