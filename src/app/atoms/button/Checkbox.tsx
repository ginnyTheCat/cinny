import React from 'react';
import './Checkbox.scss';

export type CheckboxProps = {
  variant?: 'primary' | 'positive' | 'caution' | 'danger';
  isActive?: boolean;
  onToggle?: (val: boolean) => void;
  disabled?: boolean;
};

export default function Checkbox({
  variant = 'primary',
  isActive,
  onToggle,
  disabled,
}: CheckboxProps) {
  const className = `checkbox checkbox-${variant}${isActive ? ' checkbox--active' : ''}`;
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
