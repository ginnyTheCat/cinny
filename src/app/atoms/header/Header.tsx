import React from 'react';
import './Header.scss';

export type HeaderProps = {
  children?: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <div className="header">
      {children}
    </div>
  );
}

export type TitleWrapperProps = {
  children?: React.ReactNode;
};

export function TitleWrapper({ children }: TitleWrapperProps) {
  return (
    <div className="header__title-wrapper">
      {children}
    </div>
  );
}
