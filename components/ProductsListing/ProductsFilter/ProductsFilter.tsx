import React, { useEffect, useState } from 'react';

import { FilterType } from '@/store/types';
import { PRODUCT_PRICE_RANGE, PRODUCT_RATINGS } from '@/config/constants';
import { useStore } from '@/store';
import ProductsFilterCheckbox from './ProductsFilterCheckbox';
import ProductsFilterPrice from './ProductsFilterPrice';
import ProductsFilterToggle from './ProductsFilterToggle';

interface ProductsFilterProps {}

const classes = {
  wrapper: 'md:basis-56 grow-0 shrink-0',
  content:
    'w-screen fixed left-0 z-40 px-4 py-6 bg-white transition-all h-[75vh] flex flex-col shadow-[0_-3px_16px_-2px_rgba(0,0,0,0.3)]',
  contentDesktop: 'md:w-auto md:relative md:z-0 md:px-0 md:py-0 md:h-auto md:shadow-none',
  title: 'text-2xl mb-4',
  filterWrapper: 'overflow-y-auto sm:flex md:block',
  mobileButtons: 'flex gap-4 mt-auto pt-4 md:pt-0',
  clearButton: 'w-full h-10 border-2 rounded-full',
  doneButton:
    'w-full h-10 border-2 rounded-full border-black bg-black text-white md:hidden',
  mobileExpander:
    'w-full p-4 fixed bottom-0 left-0 bg-white z-10 md:hidden shadow-[0_-3px_16px_-2px_rgba(0,0,0,0.3)]',
  mobileExpanderButton:
    'w-full h-12 bg-red-700 text-white text-md rounded-full',
};

const ProductsFilter: React.FC<ProductsFilterProps> = () => {
  const { categories, intialiseFilterValues, hasBeenInitialized } = useStore();
  const [mobileFilterActive, setIsMobileFilterActive] = useState(false);

  useEffect(() => {
    if (!hasBeenInitialized && categories.length > 1) {
      intialiseFilterValues();
    }
  }, [hasBeenInitialized, categories, intialiseFilterValues]);

  const reset = () => {
    intialiseFilterValues();
  };

  const activeMobileFilterClass = mobileFilterActive
    ? 'bottom-0 md:bottom-auto'
    : '-bottom-[150%] md:bottom-auto';

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
            items={PRODUCT_PRICE_RANGE}
          />
        </div>

        <div className={classes.mobileButtons}>
          <button
            className={classes.clearButton}
            onClick={reset}
            data-testid="reset-btn"
          >
            Reset
          </button>
          <button
            className={classes.doneButton}
            onClick={() => setIsMobileFilterActive(false)}
            data-testid="done-btn"
          >
            Done
          </button>
        </div>
      </div>

      <div className={classes.mobileExpander}>
        <button
          className={classes.mobileExpanderButton}
          onClick={() => setIsMobileFilterActive(!mobileFilterActive)}
          data-testid="filter-btn"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default ProductsFilter;
