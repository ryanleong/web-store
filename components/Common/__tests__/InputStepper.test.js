import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputStepper from '../InputStepper';

describe('InputStepper', () => {
  let setQuantityMock;

  beforeEach(() => {
    setQuantityMock = jest.fn();
  });

  it('renders correctly', () => {
    const { getByRole } = render(
      <InputStepper
        quantity={1}
        setQuantity={setQuantityMock}
        minimumQuantity={1}
      />
    );
    expect(getByRole('spinbutton')).toHaveValue(1);
  });

  it('increments quantity on up button click', () => {
    const { getByTestId } = render(
      <InputStepper
        quantity={1}
        setQuantity={setQuantityMock}
        minimumQuantity={1}
      />
    );
    fireEvent.click(getByTestId('increment'));
    expect(setQuantityMock).toHaveBeenCalledWith(2);
  });

  it('decrements quantity on down button click', () => {
    const { getByTestId } = render(
      <InputStepper
        quantity={2}
        setQuantity={setQuantityMock}
        minimumQuantity={1}
      />
    );
    fireEvent.click(getByTestId('decrement'));
    expect(setQuantityMock).toHaveBeenCalledWith(1);
  });

  it('does not decrement below minimum quantity', () => {
    const { getByTestId } = render(
      <InputStepper
        quantity={1}
        setQuantity={setQuantityMock}
        minimumQuantity={1}
      />
    );
    fireEvent.click(getByTestId('decrement'));
    expect(setQuantityMock).toHaveBeenCalledWith(1);
  });
});
