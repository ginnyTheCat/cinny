import React from 'react';
import './RadioButton.scss';

export type RadioButtonProps = {
  isActive?: boolean;
  onToggle?: (val: boolean) => void;
  disabled?: boolean;
};

export default function RadioButton({ isActive, onToggle, disabled }: RadioButtonProps) {
  if (!onToggle) return <span className={`radio-btn${isActive ? ' radio-btn--active' : ''}`} />;
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      onClick={() => onToggle(!isActive)}
      className={`radio-btn${isActive ? ' radio-btn--active' : ''}`}
      type="button"
      disabled={disabled}
    />
  );
}
