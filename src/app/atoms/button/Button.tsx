import React from 'react';
import './Button.scss';

import Text from '../text/Text';
import RawIcon from '../system-icons/RawIcon';
import { blurOnBubbling } from './script';

export type ButtonProps = {
  id?: string;
  className?: string;
  variant?: 'surface' | 'primary' | 'positive' | 'caution' | 'danger';
  iconSrc?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default React.forwardRef<HTMLButtonElement, ButtonProps>(({
  id,
  className,
  variant = 'surface',
  iconSrc,
  type = 'button',
  onClick,
  children,
  disabled,
}, ref) => {
  const iconClass = (iconSrc === null) ? '' : `btn-${variant}--icon`;
  return (
    <button
      ref={ref}
      id={id || undefined}
      className={`${className ? `${className} ` : ''}btn-${variant} ${iconClass} noselect`}
      onMouseUp={(e) => blurOnBubbling(e, `.btn-${variant}`)}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
    >
      {iconSrc && <RawIcon size="small" src={iconSrc} />}
      {typeof children === 'string' && <Text variant="b1">{ children }</Text>}
      {typeof children !== 'string' && children }
    </button>
  );
});
