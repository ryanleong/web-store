import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useStore } from '@/store';
import ProductsFilter from '../ProductsFilter';

jest.mock('@/store');
jest.mock('../ProductsFilterToggle', () => {
  const MockComponent = () => <div data-testid="filter-toggle">toggle</div>
  return MockComponent
});
jest.mock('../ProductsFilterCheckbox', () => {
  const MockComponent = () => <div data-testid="filter-checkbox">toggle</div>
  return MockComponent
});
jest.mock('../ProductsFilterPrice', () => {
  const MockComponent = () => <div data-testid="filter-price">toggle</div>
  return MockComponent
});

describe('ProductsFilter', () => {
  const mockUseStore = {
    categories: ['category1', 'category2'],
    intialiseFilterValues: jest.fn(),
    hasBeenInitialized: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    useStore.mockReturnValue(mockUseStore);
    const { getByTestId } = render(<ProductsFilter />);
    expect(getByTestId('reset-btn')).toBeInTheDocument();
    expect(getByTestId('done-btn')).toBeInTheDocument();
    expect(getByTestId('filter-btn')).toBeInTheDocument();
    expect(getByTestId('filter-toggle')).toBeInTheDocument();
    expect(getByTestId('filter-checkbox')).toBeInTheDocument();
    expect(getByTestId('filter-price')).toBeInTheDocument();
  });

  it('should initialise filter values on mount', () => {
    useStore.mockReturnValue(mockUseStore);
    render(<ProductsFilter />);
    expect(mockUseStore.intialiseFilterValues).toHaveBeenCalled();
  });

  it('should not initialise filter values if already initialized', () => {
    useStore.mockReturnValue({
      ...mockUseStore,
    hasBeenInitialized: true,
  });
    render(<ProductsFilter />);
    expect(mockUseStore.intialiseFilterValues).not.toHaveBeenCalled();
  });

  it('calls initialiseFilterValues when Reset button is clicked', () => {
    useStore.mockReturnValue(mockUseStore);
    const { getByTestId } = render(<ProductsFilter />);
    fireEvent.click(getByTestId('reset-btn'));
    expect(mockUseStore.intialiseFilterValues).toHaveBeenCalled();
  });
});