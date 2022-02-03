import React, { useState } from 'react';
import './Tabs.scss';

import Button from '../button/Button';
import ScrollView from '../scroll/ScrollView';

type TabItemProps = {
  selected?: boolean;
  iconSrc?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
};

function TabItem({
  selected, iconSrc, onClick, children, disabled,
}: TabItemProps) {
  const isSelected = selected ? 'tab-item--selected' : '';

  return (
    <Button
      className={`tab-item ${isSelected}`}
      iconSrc={iconSrc}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export type TabItemData = {
  iconSrc?: string;
  text?: string;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItemData[];
  defaultSelected?: number;
  onSelect: (item: TabItemData, index: number) => void;
};

export default function Tabs({
  items,
  defaultSelected = 0,
  onSelect,
}: TabsProps) {
  const [selectedItem, setSelectedItem] = useState(items[defaultSelected]);

  const handleTabSelection = (item: TabItemData, index: number) => {
    if (selectedItem === item) return;
    setSelectedItem(item);
    onSelect(item, index);
  };

  return (
    <div className="tabs">
      <ScrollView horizontal vertical={false} invisible>
        <div className="tabs__content">
          {items.map((item, index) => (
            <TabItem
              key={item.text}
              selected={selectedItem.text === item.text}
              iconSrc={item.iconSrc}
              disabled={item.disabled}
              onClick={() => handleTabSelection(item, index)}
            >
              {item.text}
            </TabItem>
          ))}
        </div>
      </ScrollView>
    </div>
  );
}
