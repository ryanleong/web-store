import { render } from '@testing-library/react';

import CartPage from '../cart';

jest.mock('@/components/Cart/CartSummary', () => {
  const MockComponent = () => <div data-testid="cart-summary">toggle</div>;
  return MockComponent;
});
jest.mock('@/components/Cart/CartItems', () => {
  const MockComponent = () => <div data-testid="cart-items">toggle</div>;
  return MockComponent;
});

describe('CartPage', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<CartPage />);
    expect(getByTestId('title')).toBeInTheDocument;
  });
});
