import React from 'react';
import './Toggle.scss';

export type ToggleProps = {
  isActive?: boolean;
  onToggle?: (val: boolean) => void;
  disabled?: boolean;
};

export default function Toggle({ isActive, onToggle, disabled }: ToggleProps) {
  const className = `toggle${isActive ? ' toggle--active' : ''}`;
  if (!onToggle) return <span className={className} />;
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      onClick={() => onToggle(!isActive)}
      className={className}
      type="button"
      disabled={disabled}
    />
  );
}
