import React from 'react';
import { render } from '@testing-library/react';

import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  test('renders ProductCard component', () => {
    const { getByTestId } = render(
      <ProductCard
        id={1}
        name="Test Product"
        brand="Test Brand"
        price={100}
        image="/test.jpg"
        discountedPrice={80}
        rating={4}
      />
    );

    expect(getByTestId('name').textContent).toBe('Test Product');
    expect(getByTestId('brand').textContent).toBe('Test Brand');
    expect(getByTestId('discounted-price').textContent).toBe('$80');
    expect(getByTestId('price').textContent).toBe('$100');
  });
});
