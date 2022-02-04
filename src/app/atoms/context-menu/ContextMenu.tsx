import React, { useState, useEffect } from 'react';
import './ContextMenu.scss';

import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale-extreme.css';

import { Placement } from 'tippy.js';
import Text from '../text/Text';
import Button from '../button/Button';
import ScrollView from '../scroll/ScrollView';

export type ContextMenuProps = {
  content: React.ReactNode | ((hideMenu: () => void) => void);
  placement?: Placement;
  maxWidth?: string | number;
  render: (toggle: () => void) => React.ReactElement;
  afterToggle?: (visible: boolean) => void;
};

export default function ContextMenu({
  content,
  placement = 'right',
  maxWidth = 'unset',
  render,
  afterToggle,
}: ContextMenuProps) {
  const [isVisible, setVisibility] = useState(false);
  const showMenu = () => setVisibility(true);
  const hideMenu = () => setVisibility(false);

  useEffect(() => {
    if (afterToggle) afterToggle(isVisible);
  }, [isVisible]);

  return (
    <Tippy
      animation="scale-extreme"
      className="context-menu"
      visible={isVisible}
      onClickOutside={hideMenu}
      content={<ScrollView invisible>{typeof content === 'function' ? content(hideMenu) : content}</ScrollView>}
      placement={placement}
      interactive
      arrow={false}
      maxWidth={maxWidth}
      duration={200}
    >
      {render(isVisible ? hideMenu : showMenu)}
    </Tippy>
  );
}

export type MenuHeaderProps = {
  children: React.ReactNode;
};

export function MenuHeader({ children }: MenuHeaderProps) {
  return (
    <div className="context-menu__header">
      <Text variant="b3">{ children }</Text>
    </div>
  );
}

export type MenuItemProps = {
  variant?: 'surface' | 'positive' | 'caution' | 'danger';
  iconSrc?: string;
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> ;
  children?: React.ReactNode;
  disabled?: boolean;
};

export function MenuItem({
  variant = 'surface',
  iconSrc,
  type = 'button',
  onClick,
  children,
  disabled,
}: MenuItemProps) {
  return (
    <div className="context-menu__item">
      <Button
        variant={variant}
        iconSrc={iconSrc}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        { children }
      </Button>
    </div>
  );
}

export function MenuBorder() {
  return <div style={{ borderBottom: '1px solid var(--bg-surface-border)' }}> </div>;
}
