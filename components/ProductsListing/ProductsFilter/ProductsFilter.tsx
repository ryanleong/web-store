import React, { useEffect, useState } from "react";

import { FilterType } from "@/store/types";
import { PRODUCT_MAX_PRICE, PRODUCT_RATINGS } from "@/utils/constants";
import { useStore } from "@/store";
import ProductsFilterCheckbox from "./ProductsFilterCheckbox";
import ProductsFilterPrice from "./ProductsFilterPrice";
import ProductsFilterToggle from "./ProductsFilterToggle";

interface ProductsFilterProps {}

const classes = {
  wrapper: "lg:basis-56 grow-0 shrink-0",
  content:
    "w-screen fixed left-0 z-20 px-4 py-6 bg-white transition-all shadow-[0_-3px_16px_-2px_rgba(0,0,0,0.68)] h-screen flex flex-col",
  contentDesktop:
    "lg:w-auto lg:relative lg:px-0 lg:py-0 lg:shadow-none lg:h-auto",
  title: "text-2xl mb-4",
  filterWrapper: "overflow-y-auto sm:flex lg:block",
  mobileButtons: "flex gap-4 mt-auto pt-4 lg:pt-0",
  clearButton: "w-full h-10 border-2 rounded-full",
  doneButton:
    "w-full h-10 border-2 rounded-full border-black bg-black text-white lg:hidden",
  mobileExpander:
    "block w-full fixed bottom-0 left-0 bg-neutral-950 text-white p-4 text-lg z-10 lg:hidden",
};

const ProductsFilter: React.FC<ProductsFilterProps> = () => {
  const { categories, intialiseFilterValues } = useStore();
  const [mobileFilterActive, setIsMobileFilterActive] = useState(false);

  useEffect(() => {
    if (categories.length > 1) {
      intialiseFilterValues();
    }
  }, [categories]);

  const reset = () => {
    intialiseFilterValues();
  };

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
          <ProductsFilterToggle
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
          <button className={classes.clearButton} onClick={reset}>
            Reset
          </button>
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
