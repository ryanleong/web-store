import { render } from '@testing-library/react';

import { useStore } from '@/store';
import HomePage from '@/pages/index';

jest.mock('@/store');
jest.mock('@/components/ProductsListing/ProductsFilter/ProductsFilter', () => {
  const MockComponent = () => <div data-testid="product-filter">toggle</div>
  return MockComponent
});
jest.mock('@/components/ProductsListing/Products/Products', () => {
  const MockComponent = () => <div data-testid="products">toggle</div>
  return MockComponent
});

describe('HomePage', () => {
  const mockUseStore = {
    productsCount: 10,
    fetchCategories: jest.fn(),
    isLoadingCategories: false,
  };

  beforeEach(() => {
    useStore.mockReturnValue(mockUseStore);
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId('title').textContent).toBe('Products (10)');
    expect(getByTestId('product-filter')).toBeInTheDocument();
    expect(getByTestId('products')).toBeInTheDocument();
  });

  it('should call fetchCategories on mount', () => {
    render(<HomePage />);
    expect(mockUseStore.fetchCategories).toHaveBeenCalled();
  });
});
