import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputButton from '../InputButton';

describe('InputButton', () => {
  it('renders correctly', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <InputButton label="Test Button" onClick={onClickMock} />
    );

    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <InputButton label="Test Button" onClick={onClickMock} />
    );

    fireEvent.click(getByText('Test Button'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
