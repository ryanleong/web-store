import { render } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader component', () => {
  it('renders loading animation when isLoading is true', () => {
    const { getByTestId } = render(<Loader isLoading={true}>Test Content</Loader>);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('does not render loading animation when isLoading is false', async () => {
    const { queryByTestId } = render(<Loader isLoading={false}>Test Content</Loader>);
    expect(queryByTestId('loader')).not.toBeInTheDocument();
  });

  it ('renders children when isLoading is false', () => {
    const { getByText } = render(<Loader isLoading={false}>Test Content</Loader>);
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});