import { StateCreator } from 'zustand';
import {
  FilterSlice,
  FilterType,
  IntialiseFilterValues,
  ProductsSlice,
  SetFilterValue,
  SetSortValue,
  SortValue,
} from './types';
import { PRODUCT_PRICE_RANGE, PRODUCT_RATINGS } from '@/config/constants';
import { getFilteredProducts, sortProducts } from '@/utils/product';

const createFilterSlice: StateCreator<
  FilterSlice & ProductsSlice,
  [],
  [],
  FilterSlice
> = (set) => {
  /**
   * Initialize filter values
   */
  const intialiseFilterValues: IntialiseFilterValues = () => {
    const initialRatingValues = PRODUCT_RATINGS.map(({ value }) => value);
    const initialPriceValues = PRODUCT_PRICE_RANGE.map(({ value }) => value);

    set((state) => {
      const { products, sortValue } = state;
      const filterValues = {
        [FilterType.CATEGORY]: '',
        [FilterType.RATING]: initialRatingValues,
        [FilterType.PRICE]: initialPriceValues,
      }
      const filteredProducts = getFilteredProducts(products, filterValues);
      const sortedProducts = sortProducts(filteredProducts, sortValue);

      return {
        filterValues,
        hasBeenInitialized: true,
        filteredProducts: sortedProducts,
        productsCount: filteredProducts.length,
      }
    });
  };

  /**
   * Set filter value
   * @param filterType
   * @param value
   */
  const setFilterValue: SetFilterValue = async (filterType, value) => {
    // This await is to simulate the loading animation since there's no API call
    // In real world, this action would be making an API call and won't need to
    // simulate the loading
    await set((state) => ({ ...state, isLoadingProducts: true }));

    set((state) => {
      const { products, sortValue } = state;
      const filterValues = {
        ...state.filterValues,
        [filterType]: value,
      };

      const filteredProducts = getFilteredProducts(products, filterValues);
      const sortedProducts = sortProducts(filteredProducts, sortValue);

      return {
        filterValues,
        filteredProducts: sortedProducts,
        productsCount: filteredProducts.length,
        isLoadingProducts: false,
      };
    });
  };

  const setSortValue: SetSortValue = async (sortValue) => {
    // This await is to simulate the loading animation since there's no API call
    // In real world, this action would be making an API call and won't need to
    // simulate the loading
    await set((state) => ({ ...state, isLoadingProducts: true }));

    set((state) => {
      const { filteredProducts } = state;
      const sortedProducts = sortProducts(filteredProducts, sortValue);

      return {
        sortValue,
        filteredProducts: sortedProducts,
        isLoadingProducts: false,
      }
    });
  };

  return {
    filterValues: {
      [FilterType.CATEGORY]: '',
      [FilterType.RATING]: [],
      [FilterType.PRICE]: [],
    },
    sortValue: SortValue.PRICE_LOW_TO_HIGH,
    hasBeenInitialized: false,

    intialiseFilterValues,
    setFilterValue,
    setSortValue,
  };
};

export default createFilterSlice;
