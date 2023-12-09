import { StateCreator } from "zustand";
import { FilterSlice, FilterType, IntialiseFilterValues, SetFilterValue } from "./types";
import { PRODUCT_MAX_PRICE, PRODUCT_RATINGS } from "@/utils/constants";

const createFilterSlice: StateCreator<FilterSlice, [], [], FilterSlice> = (
  set
) => {

  const intialiseFilterValues: IntialiseFilterValues = () => {
    const initialRatingValues = PRODUCT_RATINGS.map(({ value }) => value);
    const initialPriceValues = PRODUCT_MAX_PRICE.map(({ value }) => value);

    set(() => ({
      filterValues: {
        [FilterType.CATEGORY]: '',
        [FilterType.RATING]: initialRatingValues,
        [FilterType.PRICE]: initialPriceValues,
      },
    }));
  };

  const setFilterValue: SetFilterValue = (filterType, value) => {
    set((state) => ({
      filterValues: {
        ...state.filterValues,
        [filterType]: value,
      },
    }));
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
