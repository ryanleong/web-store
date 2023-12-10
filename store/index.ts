import { create } from 'zustand';

import { CartSlice, FilterSlice, ProductsSlice } from './types';
import createFilterSlice from './filterSlice';
import createProductsSlice from './productsSlice';
import createCartSlice from './cartSlice';

export const useStore = create<FilterSlice & ProductsSlice & CartSlice>(
  (...args) => {
    return {
      ...createProductsSlice(...args),
      ...createFilterSlice(...args),
      ...createCartSlice(...args),
    };
  }
);
