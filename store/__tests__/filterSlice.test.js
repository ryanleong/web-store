import { mockProduct } from '../../config/tests/mocks';
import filterSlice from '../filterSlice';
import { FilterType } from '../types';

describe('filterSlice', () => {
  describe('#intialiseFilterValues', () => {
    let mockState = {
      products: [mockProduct],
      filterValues: {
        [FilterType.CATEGORY]: '',
        [FilterType.RATING]: [],
        [FilterType.PRICE]: [],
      },
    };

    const set = (updateStateFn) => {
      mockState = updateStateFn(mockState);
    };
    const store = filterSlice(set);

    it('should initialize filter values', () => {
      store.intialiseFilterValues();
      expect(mockState).toEqual({
        filteredProducts: [mockProduct],
        productsCount: 1,
        filterValues: {
          category: '',
          price: ['0-100', '101-200', '201-300', '301-400', '401-500', '>500'],
          rating: ['5', '4', '3', '2', '1'],
        },
      });
    });
  });

  describe('#setFilterValue', () => {
    let mockState = {
      products: [mockProduct],
      filterValues: {
        [FilterType.CATEGORY]: '',
        [FilterType.PRICE]: [
          '0-100',
          '101-200',
          '201-300',
          '301-400',
          '401-500',
          '>500',
        ],
        [FilterType.RATING]: ['5', '4', '3', '2', '1'],
      },
    };

    const set = (updateStateFn) => {
      mockState = updateStateFn(mockState);
    };
    const store = filterSlice(set);

    it('should set filter value', async () => {
      await store.setFilterValue(FilterType.RATING, ['3']);

      expect(mockState).toEqual({
        filteredProducts: [mockProduct],
        productsCount: 1,
        isLoadingProducts: false,
        filterValues: {
          ...mockState.filterValues,
          [FilterType.RATING]: ['3'],
        },
      });
    });
  });
});
