import React, { useEffect, useState } from 'react';

import { CART_NOTIFICATION_DURATION } from '@/config/constants';
import { useStore } from '@/store';
import { Notification as NotificationObject } from '@/store/types';

interface NotificationProps {}

const classes = {
  cartNotification:
    'w-80 p-5 bg-white absolute top-20 right-0 rounded-md shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)] transition-all pointer-events-none opacity-0',
  cartNotificationShow: 'opacity-100',
  cartNotificationTitle: 'flex align-center gap-1',
};

const Notification: React.FC<NotificationProps> = ({}) => {
  const { notifications, shiftNotification } = useStore();
  const [notification, setNotification] = useState<NotificationObject>();
  const currentCount = notifications.length;

  useEffect(() => {
    if (currentCount > 0) {
      setNotification(notifications[0]);
      setTimeout(() => {
        shiftNotification();
        setNotification(undefined);
      }, CART_NOTIFICATION_DURATION);
    }
  }, [currentCount, notifications, shiftNotification]);

  return (
    <div
      className={`${classes.cartNotification} ${
        !!notification ? classes.cartNotificationShow : ''
      }`}
      data-testid="notification"
    >
      <h4 className={classes.cartNotificationTitle}>
        <span className="material-symbols-outlined text-green-600">
          check_circle
        </span>
        <span>{ notification?.message }</span>
      </h4>
    </div>
  );
};

export default Notification;
