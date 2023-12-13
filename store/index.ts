import { create } from 'zustand';

import {
  CartSlice,
  FilterSlice,
  ProductsSlice,
  NotificationSlice,
} from './types';
import createFilterSlice from './filterSlice';
import createProductsSlice from './productsSlice';
import createCartSlice from './cartSlice';
import createNotificationSlice from './notificationSlice';

export const useStore = create<
  FilterSlice & ProductsSlice & CartSlice & NotificationSlice
>((...args) => {
  return {
    ...createProductsSlice(...args),
    ...createFilterSlice(...args),
    ...createCartSlice(...args),
    ...createNotificationSlice(...args),
  };
});
