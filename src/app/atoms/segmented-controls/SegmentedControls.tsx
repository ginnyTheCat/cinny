import React, { useState, useEffect } from 'react';
import './SegmentedControls.scss';

import { blurOnBubbling } from '../button/script';

import Text from '../text/Text';
import RawIcon from '../system-icons/RawIcon';

export type SegmentedControlsProps = {
  selected: number;
  segments: {
    iconSrc?: string;
    text?: string;
  }[];
  onSelect: (index: number) => void;
};

export default function SegmentedControls({
  selected, segments, onSelect,
}: SegmentedControlsProps) {
  const [select, setSelect] = useState(selected);

  function selectSegment(segmentIndex: number) {
    setSelect(segmentIndex);
    onSelect(segmentIndex);
  }

  useEffect(() => {
    setSelect(selected);
  }, [selected]);

  return (
    <div className="segmented-controls">
      {
        segments.map((segment, index) => (
          <button
            key={Math.random().toString(20).substr(2, 6)}
            className={`segment-btn${select === index ? ' segment-btn--active' : ''}`}
            type="button"
            onClick={() => selectSegment(index)}
            onMouseUp={(e) => blurOnBubbling(e, '.segment-btn')}
          >
            <div className="segment-btn__base">
              {segment.iconSrc && <RawIcon size="small" src={segment.iconSrc} />}
              {segment.text && <Text variant="b2">{segment.text}</Text>}
            </div>
          </button>
        ))
      }
    </div>
  );
}
