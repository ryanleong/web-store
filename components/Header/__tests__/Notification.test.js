import React from 'react';
import { render } from '@testing-library/react';
import { useStore } from '@/store';
import Notification from '../Notification';
import { NotificationType } from '@/store/types';

jest.mock('@/store');

describe('Notification', () => {
  let mockState = {
    notifications: [
      {
        type: NotificationType.ADD_TO_CART,
        message: 'something 123',
      },
    ],
    shiftNotification: jest.fn(() => {
      mockState.notifications.shift();
    }),
  };

  it('renders notifcation message', () => {
    useStore.mockReturnValue(mockState);

    const { getByTestId, getByText } = render(<Notification />);

    expect(getByTestId('notification')).toBeInTheDocument();
    expect(getByText(mockState.notifications[0].message)).toBeInTheDocument();
  });
});
