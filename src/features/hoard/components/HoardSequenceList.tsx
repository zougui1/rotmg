import { memo, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { HoardSequence, type HoardSequenceProps } from './HoardSequence';
import { hoardStore } from '../hoard.store';
import { movePositionedItem } from '../utils';
import { api } from '~/trpc/react';

export const HoardSequenceList = memo(function HoardSequenceList({
  sequenceIds,
  onSlotClick,
  onDeleteSlot,
}: HoardSequenceListProps) {
  const updateSequencesMutation = api.hoard.uopdateSequence.useMutation();
  const sequences = useMemo(() => {
    return sequenceIds.map(id => ({ id }));
  }, [sequenceIds]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
    updateSequencesMutation.mutate({
      sequences: reorderedSequences.map(s => ({
        id: s.id,
        position: s.position,
      })),
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sequences}
        strategy={verticalListSortingStrategy}
      >
        {sequenceIds.map(sequenceId => (
          <HoardSequence
            key={sequenceId}
            sequenceId={sequenceId}
            onSlotClick={onSlotClick}
            onDeleteSlot={onDeleteSlot}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
});

export interface HoardSequenceListProps {
  sequenceIds: string[];
  onSlotClick: HoardSequenceProps['onSlotClick'];
  onDeleteSlot: HoardSequenceProps['onDeleteSlot'];
}
