import { mockProduct } from '../../config/tests/mocks';
import productsSlice from '../productsSlice';
import useApi from '@/hooks/useApi';
import { FilterType } from '../types';
import { mockAPIProduct } from '@/config/tests/mocks';

jest.mock('@/hooks/useApi');

describe('productsSlice', () => {
  describe('#fetchAllProducts', () => {
    let fetchProducts;
    let fetchCategories;

    let mockState = {
      products: [],
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
      const newState = updateStateFn(mockState);
      mockState = { ...mockState, ...newState };
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('fetch and set up products', async () => {
      fetchProducts = jest.fn(() => ({ products: [mockAPIProduct] }));
      fetchCategories = jest.fn();

      useApi.mockReturnValue({
        fetchProducts,
        fetchCategories,
      });

      const store = productsSlice(set);
      await store.fetchProducts({});

      const newProduct = {
        ...mockProduct,
        discountedPrice: 101.64,
      };

      expect(fetchProducts).toHaveBeenCalledWith({});
      expect(mockState).toEqual({
        products: [newProduct],
        filteredProducts: [newProduct],
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
        isLoadingProducts: false,
        productsCount: 1,
      });
    });
  });

  describe('#fetchAllCategories', () => {
    let fetchProducts;
    let fetchCategories;

    let mockState = {
      categories: [],
    };

    const set = (updateStateFn) => {
      const newState = updateStateFn(mockState);
      mockState = { ...mockState, ...newState };
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch category data', async () => {
      fetchProducts = jest.fn();
      fetchCategories = jest.fn(() => ['cat1', 'cat2']);
      useApi.mockReturnValue({
        fetchProducts,
        fetchCategories,
      });

      const store = productsSlice(set);
      await store.fetchCategories({});

      expect(fetchCategories).toHaveBeenCalled();
      expect(mockState.categories).toEqual([
        {
          label: 'Cat1',
          value: 'cat1',
        },
        {
          label: 'Cat2',
          value: 'cat2',
        },
      ]);
    });
  });
});
