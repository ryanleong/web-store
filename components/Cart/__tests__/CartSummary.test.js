import React from 'react';
import { render } from '@testing-library/react';
import { useStore } from '@/store';
import CartSummary from '../CartSummary';

jest.mock('@/store');

describe('CartSummary', () => {
  it('renders total and subtotal price', () => {
    useStore.mockReturnValue({ totalPrice: 100.59 });
    const { getByTestId } = render(<CartSummary />);

    expect(getByTestId('totalPrice').textContent).toBe('$100.59');
    expect(getByTestId('subtotalPrice').textContent).toBe('$100.59');
  });

  it('total and subtotal price should be rounded off', () => {
    useStore.mockReturnValue({ totalPrice: 100.59213 });
    const { getByTestId } = render(<CartSummary />);

    expect(getByTestId('totalPrice').textContent).toBe('$100.59');
    expect(getByTestId('subtotalPrice').textContent).toBe('$100.59');
  });
});
