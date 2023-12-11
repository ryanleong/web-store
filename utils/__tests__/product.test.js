import { FilterType, FilterValues, Product } from '@/store/types';
import { PRODUCT_PRICE_RANGE } from '@/config/constants';

import {
  isInRating,
  isInPriceRange,
  getFilteredProducts,
  productResponseToProduct,
  calculateDiscountedPrice,
} from '../product';

describe('utils/product', () => {
  describe('#isInRating', () => {
    it('should return true if the rounded rating is in the filter values', () => {
      const filterValues = {
        [FilterType.RATING]: ['3', '4', '5'],
      };
      const rating = 4.6;
      expect(isInRating(filterValues, rating)).toBe(true);
    });

    it('should return false if the rounded rating is not in the filter values', () => {
      const filterValues = {
        [FilterType.RATING]: ['3', '4', '5'],
      };
      const rating = 2.3;
      expect(isInRating(filterValues, rating)).toBe(false);
    });
  });

  describe('#isInPriceRange', () => {
    it('returns true when price is within a selected range', () => {
      const filterValues = {
        [FilterType.PRICE]: ['0-100'],
      };
      const price = 50;
      expect(isInPriceRange(filterValues, price)).toBe(true);
    });

    it('returns false when price is not within a selected range', () => {
      const filterValues = {
        [FilterType.PRICE]: ['100-200'],
      };
      const price = 50;
      expect(isInPriceRange(filterValues, price)).toBe(false);
    });

    it('returns true when max price in range is -1 and price is greater than min', () => {
      const filterValues = {
        [FilterType.PRICE]: ['>500'],
      };
      const price = 600;
      expect(isInPriceRange(filterValues, price)).toBe(true);
    });

    it('returns false when max price in range is -1 and price is less than min', () => {
      const filterValues = {
        [FilterType.PRICE]: ['>500'],
      };
      const price = 100;
      expect(isInPriceRange(filterValues, price)).toBe(false);
    });
  });

  describe('#getFilteredProducts', () => {
    it('should return products that match the filter values', () => {
      const products = [
        { rating: 5, discountedPrice: 50, price: 100 },
        { rating: 4, discountedPrice: 60, price: 120 },
        { rating: 3, discountedPrice: null, price: 600 },
      ];

      const filterValues = {
        category: '',
        price: ['0-100', '101-200', '201-300', '301-400', '401-500'],
        rating: ['5', '4', '3', '2', '1'],
      };

      const result = getFilteredProducts(products, filterValues);

      expect(result).toEqual([
        { rating: 5, discountedPrice: 50, price: 100 },
        { rating: 4, discountedPrice: 60, price: 120 },
      ]);
    });
  });

  describe('#calculateDiscountedPrice', () => {
    it('should calculate the correct discounted price', () => {
      const price = 100;
      const discountPercentage = 20;
      const expectedDiscountedPrice = 80;

      const actualDiscountedPrice = calculateDiscountedPrice(
        price,
        discountPercentage
      );
      expect(actualDiscountedPrice).toBe(expectedDiscountedPrice);
    });

    it('should return the original price when discount percentage is 0', () => {
      const price = 100;
      const discountPercentage = 0;
      const expectedDiscountedPrice = 100;

      const actualDiscountedPrice = calculateDiscountedPrice(
        price,
        discountPercentage
      );
      expect(actualDiscountedPrice).toBe(expectedDiscountedPrice);
    });
  });
});
