import createNotificationSlice from '../notificationSlice';

describe('notificationSlice', () => {
  describe('#pushNofitication', () => {
    let mockState = {
      notifications: [],
    };
    const set = jest.fn((updateStateFn) => {
      mockState = updateStateFn(mockState);
    });

    it('should push a notification to the stack', () => {
      const expected = {
        type: 'ADD_TO_CART',
        message: 'something 123',
      };

      const store = createNotificationSlice(set);
      store.pushNotification(expected);

      expect(mockState.notifications).toEqual([expected]);
    });
  })

  describe('#shiftNotification', () => {
    const notification = {
      type: 'ADD_TO_CART',
      message: 'something 123',
    };
    let mockState = { notifications: [notification] };
    const set = jest.fn((updateStateFn) => {
      mockState = updateStateFn(mockState);
    });

    it('should get the first notification from the stack', () => {
      const store = createNotificationSlice(set);
      store.shiftNotification();

      expect(mockState.notifications).toEqual([]);
    });
  })
});
