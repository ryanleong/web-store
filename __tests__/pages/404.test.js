import React from 'react';
import { render } from '@testing-library/react';
import Error404Page from '@/pages/404';

describe('Error404Page', () => {
  it('renders Error404Page component', () => {
    const { getByText } = render(<Error404Page />);
    expect(getByText('404')).toBeInTheDocument();
  });
});
