import React from 'react';
import { render } from '@testing-library/react';
import Navigation from '../Navigation';

describe('Navigation', () => {
  test('renders Navigation component', () => {
    const { getByTestId } = render(<Navigation />);
    expect(getByTestId('products-link')).toBeInTheDocument();
  });
});
