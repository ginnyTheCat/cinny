import React from 'react';
import './Chip.scss';

import Text from '../text/Text';
import RawIcon from '../system-icons/RawIcon';

export type ChipProps = {
  iconSrc?: string;
  iconColor?: string;
  text?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Chip({
  iconSrc, iconColor, text, children,
  onClick,
}: ChipProps) {
  return (
    <button className="chip" type="button" onClick={onClick}>
      {iconSrc && <RawIcon src={iconSrc} color={iconColor} size="extra-small" />}
      {text && <Text variant="b3">{text}</Text>}
      {children}
    </button>
  );
}
