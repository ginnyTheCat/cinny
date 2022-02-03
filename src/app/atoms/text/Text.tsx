import React from 'react';
import './Text.scss';

export type TextProps = {
  className?: string;
  style?: any;
  variant?: 'h1' | 'h2' | 's1' | 'b1' | 'b2' | 'b3';
  weight?: 'light' | 'normal' | 'medium' | 'bold';
  primary?: boolean;
  span?: boolean;
  children?: React.ReactNode;
};

export default function Text({
  className,
  style,
  variant = 'b1',
  weight = 'normal',
  primary,
  span,
  children,
}: TextProps) {
  const classes: string[] = [];
  if (className) classes.push(className);

  classes.push(`text text-${variant} text-${weight}`);
  if (primary) classes.push('font-primary');

  const textClass = classes.join(' ');
  if (span) return <span className={textClass} style={style}>{ children }</span>;
  if (variant === 'h1') return <h1 className={textClass} style={style}>{ children }</h1>;
  if (variant === 'h2') return <h2 className={textClass} style={style}>{ children }</h2>;
  if (variant === 's1') return <h4 className={textClass} style={style}>{ children }</h4>;
  return <p className={textClass} style={style}>{ children }</p>;
}
