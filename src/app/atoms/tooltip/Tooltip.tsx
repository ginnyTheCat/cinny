import React from 'react';
import './Tooltip.scss';
import Tippy from '@tippyjs/react';
import { Placement } from 'tippy.js';

export type TooltipPlacement = Placement;

export type TooltipProps = {
  className?: string;
  placement?: Placement;
  content: React.ReactNode;
  delay?: number | [number | null, number | null];
  children?: React.ReactElement;
};

export default function Tooltip({
  className,
  placement = 'top',
  content,
  delay = [200, 0],
  children,
}: TooltipProps) {
  return (
    <Tippy
      content={content}
      className={`tooltip ${className}`}
      touch="hold"
      arrow={false}
      maxWidth={250}
      placement={placement}
      delay={delay}
      duration={[100, 0]}
    >
      {children}
    </Tippy>
  );
}
