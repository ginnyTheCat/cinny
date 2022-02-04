import React from 'react';
import './IconButton.scss';

import RawIcon, { RawIconSize } from '../system-icons/RawIcon';
import Tooltip, { TooltipPlacement } from '../tooltip/Tooltip';
import { blurOnBubbling } from './script';
import Text from '../text/Text';

export type IconButton = {
  variant?: 'surface' | 'primary' | 'positive' | 'caution' | 'danger';
  size?: RawIconSize;
  type?: 'button' | 'submit' | 'reset';
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement;
  src: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  disabled?: boolean;
  isImage?: boolean;
};

export default React.forwardRef<HTMLButtonElement, IconButton>(({
  variant = 'surface',
  size,
  type = 'button',
  tooltip,
  tooltipPlacement = 'top',
  src,
  onClick,
  tabIndex,
  disabled,
  isImage,
}, ref) => {
  const btn = (
    <button
      ref={ref}
      className={`ic-btn ic-btn-${variant}`}
      onMouseUp={(e) => blurOnBubbling(e, `.ic-btn-${variant}`)}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      <RawIcon size={size} src={src} isImage={isImage} />
    </button>
  );

  if (!tooltip) return btn;
  return (
    <Tooltip
      placement={tooltipPlacement}
      content={<Text variant="b2">{tooltip}</Text>}
    >
      {btn}
    </Tooltip>
  );
});
