import { StateCreator } from "zustand";
import {
  FilterSlice,
  FilterType,
  IntialiseFilterValues,
  ProductsSlice,
  SetFilterValue,
} from "./types";
import { PRODUCT_PRICE_RANGE, PRODUCT_RATINGS } from "@/utils/constants";
import { getFilteredProducts } from "@/utils/product";

const createFilterSlice: StateCreator<
  FilterSlice & ProductsSlice,
  [],
  [],
  FilterSlice
> = (set) => {
  const intialiseFilterValues: IntialiseFilterValues = () => {
    const initialRatingValues = PRODUCT_RATINGS.map(({ value }) => value);
    const initialPriceValues = PRODUCT_PRICE_RANGE.map(({ value }) => value);

    set(() => ({
      filterValues: {
        [FilterType.CATEGORY]: "",
        [FilterType.RATING]: initialRatingValues,
        [FilterType.PRICE]: initialPriceValues,
      },
    }));
  };

  const setFilterValue: SetFilterValue = (filterType, value) => {
    set((state) => {
      const { products } = state;
      const filterValues = {
        ...state.filterValues,
        [filterType]: value,
      };

      // Filter products based on the selected filters
      const filteredProducts = getFilteredProducts(products, filterValues);

      return {
        filterValues,
        filteredProducts,
        productsCount: filteredProducts.length,
      };
    });
  };

  return {
    filterValues: {
      [FilterType.CATEGORY]: "",
      [FilterType.RATING]: [],
      [FilterType.PRICE]: [],
    },

    intialiseFilterValues,
    setFilterValue,
  };
};

export default createFilterSlice;
