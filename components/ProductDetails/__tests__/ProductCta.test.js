import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { useStore } from '@/store';
import ProductCta from '../ProductCta';
import mockProduct from '@/config/tests/mocks';

jest.mock('@/store');

describe('ProductCta', () => {
  const mockAddItemToCart = jest.fn();

  beforeEach(() => {
    useStore.mockReturnValue({
      addItemToCart: mockAddItemToCart,
    });
  });

  it('renders without crashing', () => {
    const { getByText } = render(<ProductCta product={mockProduct} />);
    expect(getByText('Quantity')).toBeInTheDocument();
    expect(getByText('Add to cart')).toBeInTheDocument();
  });

  it('calls addItemToCart when "Add to cart" button is clicked', () => {
    const { getByText } = render(<ProductCta product={mockProduct} />);
    fireEvent.click(getByText('Add to cart'));
    expect(mockAddItemToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});