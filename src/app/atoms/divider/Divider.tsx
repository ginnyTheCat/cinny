import React from 'react';
import './Divider.scss';

import Text from '../text/Text';

export type DividerProps = {
  text?: string;
  variant?: 'surface' | 'primary' | 'positive' | 'caution' | 'danger';
  align?: 'left' | 'center' | 'right';
};

export default function Divider({
  text,
  variant = 'surface',
  align = 'center',
}: DividerProps) {
  const dividerClass = ` divider--${variant} divider--${align}`;
  return (
    <div className={`divider${dividerClass}`}>
      {text && <Text className="divider__text" variant="b3" weight="bold">{text}</Text>}
    </div>
  );
}
