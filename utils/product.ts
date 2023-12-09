import { FilterType, FilterValues, Product } from "@/store/types";
import { PRODUCT_PRICE_RANGE } from "./constants";

/**
 * Check if the rating is within the selected rating range
 * @param filterValues
 * @param rating
 * @returns
 */
const isInRating = (filterValues: FilterValues, rating: number) => {
  const roundedRating = Math.ceil(rating);
  return filterValues[FilterType.RATING].includes(`${roundedRating}`);
};

/**
 * Check if the price is within the selected price range
 * @param filterValues
 * @param price
 * @returns
 */
const isInPriceRange = (filterValues: FilterValues, price: number) => {
  const selectdPriceRanges = filterValues[FilterType.PRICE];
  const selectdPriceRangesObj = PRODUCT_PRICE_RANGE.filter((range) => {
    return selectdPriceRanges.includes(range.value);
  });

  const rangeWithin = selectdPriceRangesObj.find((priceRange) => {
    const { min, max } = priceRange;
    if (max === -1) return price >= min;
    return price >= min && price <= max;
  });

  return !!rangeWithin;
};

/**
 * Get filtered products based on the selected filters
 * @param products
 * @param filterValues
 * @returns
 */
const getFilteredProducts = (
  products: Array<Product>,
  filterValues: FilterValues
): Array<Product> => {
  return products.filter((product) => {
    const { rating, price } = product;
    return (
      isInRating(filterValues, rating) && isInPriceRange(filterValues, price)
    );
  });
};

export { isInRating, isInPriceRange, getFilteredProducts };
