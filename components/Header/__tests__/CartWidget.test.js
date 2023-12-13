import React from 'react';
import { render } from '@testing-library/react';
import { useStore } from '@/store';
import CartWidget from '../CartWidget';

jest.mock('@/store');

describe('CartWidget', () => {
  it('renders without crashing', () => {
    useStore.mockReturnValue({
      initCart: jest.fn(),
      getCartItemCount: jest.fn().mockReturnValue(10),
    });

    const { getByTestId, getByText } = render(<CartWidget />);

    expect(getByTestId('cart-link')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
  });
});
