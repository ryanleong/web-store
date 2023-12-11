import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ProductDetails from '../[id]';
import { mockProduct } from '../../../config/tests/mocks';

jest.mock('@/api/useApi', () => () => ({
  fetchProduct: jest.fn(() => mockProduct),
  fetchProducts: jest.fn(),
  fetchCategories: jest.fn(),
}));

jest.mock('@/store', () => ({
  useStore: () => ({
    getProductById: jest.fn(() => mockProduct),
  })
}));

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: {
        id: '1',
      },
      asPath: '',
      push: jest.fn(),
      events: { on: jest.fn(), off: jest.fn() },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

jest.mock('@/components/ProductDetails/ProductImage', () => {
  const MockComponent = () => <div data-testid="product-image">toggle</div>;
  return MockComponent;
});
jest.mock('@/components/ProductDetails/ProductContent', () => {
  const MockComponent = () => <div data-testid="product-content">toggle</div>;
  return MockComponent;
});

describe('ProductDetails', () => {
  it('should render correctly', async () => {
    await act(async () => {
      render(<ProductDetails />);
    })
    expect(screen.getByTestId('product-image')).toBeInTheDocument;
  });
});
