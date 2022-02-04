import React from 'react';
import './Avatar.scss';

import { twemojify } from '../../../util/twemojify';

import Text, { TextVariant } from '../text/Text';
import RawIcon from '../system-icons/RawIcon';

import ImageBrokenSVG from '../../../../public/res/svg/image-broken.svg';

export type AvatarProps = {
  text?: string;
  bgColor?: string;
  iconSrc?: string;
  iconColor?: string;
  imageSrc?: string;
  size?: 'large' | 'normal' | 'small' | 'extra-small';
};

export default function Avatar({
  text,
  bgColor = 'transparent',
  iconSrc,
  iconColor,
  imageSrc,
  size = 'normal',
}: AvatarProps) {
  let textSize: TextVariant = 's1';
  if (size === 'large') textSize = 'h1';
  if (size === 'small') textSize = 'b1';
  if (size === 'extra-small') textSize = 'b3';

  return (
    <div className={`avatar-container avatar-container__${size} noselect`}>
      {
        imageSrc !== null
          ? <img draggable="false" src={imageSrc} onError={(e) => { e.currentTarget.src = ImageBrokenSVG; }} alt="avatar" />
          : (
            <span
              style={{ backgroundColor: iconSrc ? 'transparent' : bgColor }}
              className={`avatar__border${iconSrc ? '--active' : ''}`}
            >
              {
                iconSrc
                  ? <RawIcon size={size} src={iconSrc} color={iconColor} />
                  : text && (
                    <Text variant={textSize} primary>
                      {twemojify([...text][0])}
                    </Text>
                  )
              }
            </span>
          )
      }
    </div>
  );
}
