'use client';

import { memo } from 'react';
import { useSelector } from '@xstate/store/react';

import { chunkArray, cn } from '~/utils';

import { VaultSlot } from './VaultSlot';
import { HoardSlot } from './HoardSlot';
import { slotsPerRow } from '../data';
import type {
  FullHoardSequenceObject,
  FullHoardSequenceObjectWithOptionalSlots,
  FullHoardSlot,
} from '../hoardSequence.model';
import { hoardStore } from '../hoard.store';

const getHoardRows = (sequence: Omit<FullHoardSequenceObjectWithOptionalSlots, 'section' | 'position'>) => {
  // ensure all rows have exactly a length of 8
  const rows = chunkArray(sequence.slots, slotsPerRow).map(slots => {
    if (slots.length >= 8) {
      return slots;
    }

    const getFillerSlot = (index: number): FullHoardSequenceObject['slots'][number] | undefined => {
      const [firstSlot] = sequence.slots;

      if (!firstSlot || sequence.type !== 'Repeat') {
        return;
      }

      return {
        id: `${firstSlot.id}-${index}`,
        item: firstSlot.item,
        count: 0,
      };
    }

    const fillerRow = [
      getFillerSlot(0),
      getFillerSlot(1),
      getFillerSlot(2),
      getFillerSlot(3),
      getFillerSlot(4),
      getFillerSlot(5),
      getFillerSlot(6),
      getFillerSlot(7),
    ];

    return [...slots, ...fillerRow].slice(0, 8);
  });

  if (!rows.length) {
    rows.push([
      undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined,
    ]);
  }

  return rows;
}

export const HoardSequence = memo(function HoardSequence({ sequenceId, onSlotClick, onCountChange, onDeleteSlot }: HoardSequenceProps) {
  const sequence = useSelector(hoardStore, state => state.context.maps.sequences[sequenceId]);

  if (!sequence) {
    return null;
  }

  const rows = getHoardRows(sequence);

  return (
    <>
      {rows.map((slots, index) => (
        <div
          key={index}
          className={cn(
            'flex gap-[var(--vault-slot-gap)] box-border',
          )}
        >
          {slots.map((slot, index) => !slot ? (
            <VaultSlot
              key={index}
              onClick={(e) => onSlotClick?.(undefined, e)}
            />
           ) : (
            <HoardSlot
              key={slot.id}
              slotId={slot.id}
              sequenceId={sequence.id}
              index={index}
              onSlotClick={onSlotClick}
              onCountChange={onCountChange}
              onDeleteSlot={onDeleteSlot}
            />
          ))}
        </div>
      ))}
    </>
  );
});

export interface HoardSequenceProps {
  sequenceId: string;
  onSlotClick?: (slot: FullHoardSlot | undefined, event: React.MouseEvent) => void;
  onCountChange?: (slot: FullHoardSlot, count: number) => void;
  onDeleteSlot?: (slot: FullHoardSlot) => void;
}
