import { create } from "zustand";

import { FilterSlice, ProductsSlice } from "./types";
import createFilterSlice from "./filterSlice";
import createProductsSlice from "./productsSlice";

export const useStore = create<FilterSlice & ProductsSlice>((...args) => {
  return {
    ...createProductsSlice(...args),
    ...createFilterSlice(...args),
  };
});
