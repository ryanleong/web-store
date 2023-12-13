import React from 'react';
import { render, screen } from '@testing-library/react';
import { LOGO_URL } from '@/config/constants';
import Header from '../Header';

jest.mock('next/link', () => {
  const Child = ({children}) => <a>{children}</a>;
  return Child;
});

jest.mock('next/image', () => {
  const Child = ({src, alt}) => <img src={src} alt={alt} />;
  return Child;
});

jest.mock('../Navigation', () => {
  const Child = () => <div>Navigation</div>;
  return Child;
});

jest.mock('../CartWidget', () => {
  const Child = () => <div>CartWidget</div>;
  return Child;
});

jest.mock('../Notification', () => {
  const Child = () => <div>Notification</div>;
  return Child;
});

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: /SecretLab Logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', LOGO_URL);
  });

  it('renders Navigation and CartWidget components', () => {
    render(<Header />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('CartWidget')).toBeInTheDocument();
    expect(screen.getByText('Notification')).toBeInTheDocument();
  });
});