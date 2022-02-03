import React from 'react';
import './Spinner.scss';

export type SpinnerProps = {
  size?: 'normal' | 'small';
};

export default function Spinner({
  size = 'normal',
}: SpinnerProps) {
  return (
    <div className={`donut-spinner donut-spinner--${size}`}> </div>
  );
}
