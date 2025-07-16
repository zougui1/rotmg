import { memo } from 'react';
import { type DragEndEvent } from '@dnd-kit/core';

import { HoardSequence, type HoardSequenceProps } from './HoardSequence';
import { hoardStore } from '../hoard.store';
import { movePositionedItem } from '../utils';
import { api } from '~/trpc/react';
import { SortableList } from '~/components/ui/SortableList';

export const HoardSequenceList = memo(function HoardSequenceList({
  sequenceIds,
  onSlotClick,
  onDeleteSlot,
}: HoardSequenceListProps) {
  const moveSequencesMutations = api.hoard.moveSequences.useMutation();

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      return;
    }

    const { sequences, sections } = hoardStore.getSnapshot().context.maps;
    const activeSequence = sequences[active.id];
    const overSequence = sequences[over.id];
    const section = activeSequence && sections[activeSequence.section.id];

    if (!activeSequence || !overSequence || !section) {
      return;
    }

    const reorderedSequences = movePositionedItem(section.sequences, activeSequence, overSequence)

    hoardStore.trigger.moveSequences({
      sequenceIds: reorderedSequences.map(s => s.id),
    });
    moveSequencesMutations.mutate({
      sequences: reorderedSequences.map(s => ({
        id: s.id,
        position: s.position,
      })),
    });
  }

  return (
    <SortableList.Root
      items={sequenceIds}
      onDragEnd={handleDragEnd}
    >
      {sequenceIds.map(sequenceId => (
        <HoardSequence
          key={sequenceId}
          sequenceId={sequenceId}
          onSlotClick={onSlotClick}
          onDeleteSlot={onDeleteSlot}
        />
      ))}
    </SortableList.Root>
  );
});

export interface HoardSequenceListProps {
  sequenceIds: string[];
  onSlotClick: HoardSequenceProps['onSlotClick'];
  onDeleteSlot: HoardSequenceProps['onDeleteSlot'];
}
