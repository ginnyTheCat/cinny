import React from 'react';
import './ScrollView.scss';

export type ScrollViewProps = {
  horizontal?: boolean;
  vertical?: boolean;
  autoHide?: boolean;
  invisible?: boolean;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
};

export default React.forwardRef<HTMLDivElement, ScrollViewProps>(({
  horizontal,
  vertical = true,
  autoHide,
  invisible,
  onScroll,
  children,
}, ref) => {
  let scrollbarClasses = '';
  if (horizontal) scrollbarClasses += ' scrollbar__h';
  if (vertical) scrollbarClasses += ' scrollbar__v';
  if (autoHide) scrollbarClasses += ' scrollbar--auto-hide';
  if (invisible) scrollbarClasses += ' scrollbar--invisible';
  return (
    <div onScroll={onScroll} ref={ref} className={`scrollbar${scrollbarClasses}`}>
      {children}
    </div>
  );
});
