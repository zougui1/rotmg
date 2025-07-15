import { memo, useEffect, useState } from 'react';

import { HoardSequence, type HoardSequenceProps } from './HoardSequence';

export const HoardSequences = memo(function HoardSequences({
  sequenceIds,
  onSlotClick,
  onDeleteSlot,
}: HoardSequencesProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= sequenceIds.length) {
      return;
    }

    const timeout = setTimeout(() => {
      setVisibleCount(c => c + 1);
    }, 100);

    return () => clearTimeout(timeout);
  }, [visibleCount, sequenceIds]);

  const clamped = Math.min(sequenceIds.length, Math.max(6, visibleCount));
  console.log(clamped)

  return (
    <>
      {sequenceIds.slice(0, clamped).map(sequenceId => (
        <HoardSequence
          key={sequenceId}
          sequenceId={sequenceId}
          onSlotClick={onSlotClick}
          onDeleteSlot={onDeleteSlot}
        />
      ))}
    </>
  );
});

export interface HoardSequencesProps {
  sequenceIds: string[];
  onSlotClick: HoardSequenceProps['onSlotClick'];
  onDeleteSlot: HoardSequenceProps['onDeleteSlot'];
}
