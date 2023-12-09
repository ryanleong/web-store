import { create } from "zustand";

import { PRODUCT_MAX_PRICE, PRODUCT_RATINGS } from "@/utils/constants";
import { FilterType, FilterValues } from "./types";

type IntialiseFilterValues = () => void;
type SetFilterValue = (
  filterType: FilterType,
  value: string | Array<string>
) => void;

interface ProductsFilterStore {
  filterValues: FilterValues;

  intialiseFilterValues: IntialiseFilterValues;
  setFilterValue: SetFilterValue;
}

export const useProductsFilterStore = create<ProductsFilterStore>((set) => {
  const intialiseFilterValues: IntialiseFilterValues = () => {
    const initialRatingValues = PRODUCT_RATINGS.map(({ value }) => value);
    const initialPriceValues = PRODUCT_MAX_PRICE.map(({ value }) => value);

    set(() => {
      return {
        filterValues: {
          [FilterType.CATEGORY]: '',
          [FilterType.RATING]: initialRatingValues,
          [FilterType.PRICE]: initialPriceValues,
        },
      };
    });
  };

  const setFilterValue: SetFilterValue = (filterType, value) => {
    set((state) => {
      return {
        filterValues: {
          ...state.filterValues,
          [filterType]: value,
        },
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
});
