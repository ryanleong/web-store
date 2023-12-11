import React from 'react';
import { render } from '@testing-library/react';

import { useStore } from '@/store';
import Products from '../Products';
import {
  mockFilterValues,
  mockProduct,
  mockProduct2,
} from '@/config/tests/mocks';

jest.mock('@/store');

describe('Products', () => {
  const mockUseStore = {
    filterValues: mockFilterValues,
    fetchProducts: jest.fn(),
    filteredProducts: [mockProduct, mockProduct2],
    isLoadingProducts: false,
  };

  it('should call fetchProducts', () => {
    useStore.mockReturnValue(mockUseStore);
    render(<Products />);
    expect(mockUseStore.fetchProducts).toHaveBeenCalled();
  });

  it('should render products', () => {
    useStore.mockReturnValue(mockUseStore);
    const { getByText } = render(<Products />);
    expect(getByText(mockProduct.name)).toBeInTheDocument();
    expect(getByText(mockProduct2.name)).toBeInTheDocument();
  });

  it('displays loading state', () => {
    useStore.mockReturnValue({ ...mockUseStore, isLoadingProducts: true });
    const { getByTestId } = render(<Products />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('displays no products found message', () => {
    useStore.mockReturnValue({ ...mockUseStore, filteredProducts: [] });
    const { getByTestId } = render(<Products />);
    expect(getByTestId('empty')).toBeInTheDocument();
  });
});
