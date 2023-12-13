import { StateCreator } from 'zustand';
import { NotificationSlice, PushNotification } from './types';

const createNotificationSlice: StateCreator<
  NotificationSlice,
  [],
  [],
  NotificationSlice
> = (set) => {

  const pushNotification: PushNotification = (notification) => {
    set((state) => {
      const { notifications } = state;
      notifications.push(notification);
      return { ...state, notifications };
    });
  };

  const shiftNotification = () => {
    set((state) => {
      const { notifications } = state;
      notifications.shift();
      return { ...state, notifications };
    });
  };

  return {
    notifications: [],
    pushNotification,
    shiftNotification,
  };
};

export default createNotificationSlice;
