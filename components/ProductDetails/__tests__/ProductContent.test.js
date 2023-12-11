import React from 'react';
import { render } from '@testing-library/react';

import ProductContent from '../ProductContent';
import { mockProduct } from '@/config/tests/mocks';

describe('ProductContent', () => {
    it('renders without crashing', () => {
    render(<ProductContent product={mockProduct} />);
  });

  it('displays the correct product information', () => {
    const { getByText } = render(<ProductContent product={mockProduct} />);

    expect(getByText(mockProduct.name)).toBeInTheDocument();
    expect(getByText(mockProduct.brand)).toBeInTheDocument(); // snakeToText should convert 'test_brand' to 'Test Brand'
    expect(getByText(`$${mockProduct.discountedPrice}`)).toBeInTheDocument(); // discounted price
    expect(getByText(`$${mockProduct.price}`)).toBeInTheDocument(); // original price
    expect(getByText(mockProduct.description)).toBeInTheDocument();
  });

  it ('should render price when no discount', () => {
    const product = {
      ...mockProduct,
      discountPercentage: 0,
      discountedPrice: 0,
    }
    const { getByTestId, queryAllByTestId } = render(<ProductContent product={product} />);

    expect(queryAllByTestId('discountedPrice').length).toBe(0); // discounted price
    expect(queryAllByTestId('priceWDiscount').length).toBe(0); // price
    expect(getByTestId('price')).toBeInTheDocument(); // original price
  });
});