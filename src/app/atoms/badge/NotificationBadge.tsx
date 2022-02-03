import React from 'react';
import './NotificationBadge.scss';

import Text from '../text/Text';

export type NotificationBadgeProps = {
  alert?: boolean;
  content?: string | number;
};

export default function NotificationBadge({
  alert = false,
  content,
}: NotificationBadgeProps) {
  const notificationClass = alert ? ' notification-badge--alert' : '';
  return (
    <div className={`notification-badge${notificationClass}`}>
      {content && <Text variant="b3" weight="bold">{content}</Text>}
    </div>
  );
}
