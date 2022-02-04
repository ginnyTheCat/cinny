import React from 'react';
import './RawIcon.scss';

export type RawIconSize = 'large' | 'normal' | 'small' | 'extra-small';

export type RawIconProps = {
  color?: string;
  size?: RawIconSize;
  src: string;
  isImage?: boolean;
};

export default function RawIcon({
  color,
  size = 'normal',
  src,
  isImage,
}: RawIconProps) {
  const style: any = {};
  if (color) style.backgroundColor = color;
  if (isImage) {
    style.backgroundColor = 'transparent';
    style.backgroundImage = `url(${src})`;
  } else {
    style.WebkitMaskImage = `url(${src})`;
    style.maskImage = `url(${src})`;
  }

  return <span className={`ic-raw ic-raw-${size}`} style={style}> </span>;
}
