import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { Button } from '~/components/ui/Button';
import { Tooltip } from '~/components/ui/Tooltip';
import { chunkArray, cn } from '~/utils';

import { VaultSlot } from './VaultSlot';
import { EnchantSlot } from './EnchantSlot';
import { slotsPerRow } from '../data';
import type {
  FullHoardSequenceObject,
  FullHoardSequenceObjectWithOptionalSlots,
  FullHoardSlot,
} from '../hoardSequence.model';

const enchantSlots: Record<number, React.ReactNode> = {
  1: <EnchantSlot className="bg-green-600" />,
  2: (
    <>
      <EnchantSlot className="bg-blue-600" />
      <EnchantSlot className="bg-blue-600" />
    </>
  ),
  3: (
    <>
      <EnchantSlot className="bg-purple-600" />
      <EnchantSlot className="bg-purple-600" />
      <EnchantSlot className="bg-purple-600" />
    </>
  ),
  4: (
    <>
      <EnchantSlot className="bg-yellow-300" />
      <EnchantSlot className="bg-yellow-300" />
      <EnchantSlot className="bg-yellow-300" />
      <EnchantSlot className="bg-yellow-300" />
    </>
  ),
};

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

export const HoardSequence = ({ sequence, onSlotClick, onCountChange, onDeleteSlot }: HoardSequenceProps) => {
  const rows = getHoardRows(sequence);
  const isNumbered = sequence.type === 'Numbered';
  const isInfinite = sequence.type === 'Infinite';

  const handleDeleteSlot = (slot: FullHoardSlot) => (event: React.MouseEvent) => {
    event.stopPropagation();
    onDeleteSlot?.(slot);
  }

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
            <Tooltip.Root key={slot.id}>
              <Tooltip.Trigger asChild>
                <VaultSlot
                  data-enchant-slots={slot.enchantSlots ?? 0}
                  data-filled={slot.count > 0 ? 'true' : undefined}
                  className={cn(
                    'group',
                    'shadow-[inset_0_0_5px_3px] shadow-black/20'
                  )}
                  classes={{ wrapper: 'bg-[#474747] relative' }}
                  onClick={(e) => onSlotClick?.(slot, e)}
                >
                  <Image
                    src={slot.item.image}
                    alt={slot.item.name}
                    width={100}
                    height={100}
                    loading="lazy"
                    quality={100}
                    className={cn(
                      'drop-shadow-[0_0_3px]',
                      'group-data-[enchant-slots="1"]:drop-shadow-green-600',
                      'group-data-[enchant-slots="2"]:drop-shadow-blue-600',
                      'group-data-[enchant-slots="3"]:drop-shadow-purple-600',
                      'group-data-[enchant-slots="4"]:drop-shadow-yellow-300',
                      'group-[&:not([data-filled="true"])]:opacity-15',
                    )}
                    style={{
                      // @ts-expect-error react's CSSProperties type doesn't handle CSS variables
                      '--tw-drop-shadow-size': 'drop-shadow(0 0 3px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.05)))'
                    }}
                  />

                  {isInfinite && (
                    <span
                      className={cn(
                        'absolute top-0 text-shadow-contrast font-bold',
                        'left-0 lg:left-2',
                        'text-md md:text-xl lg:text-3xl',
                      )}
                    >
                      {slot.count}
                    </span>
                    )}

                    {isInfinite && onCountChange && (
                      <div
                        className={cn(
                          'absolute top-1/2 -translate-y-1/2',
                          'w-full flex justify-between',
                        )}
                      >
                        <Button
                          icon
                          variant="flat"
                          size="sm"
                        >
                          <Minus className="size-6 icon-shadow " />
                        </Button>

                        <Button
                          icon
                          variant="flat"
                          size="sm"
                        >
                          <Plus className="size-6 icon-shadow " />
                        </Button>
                      </div>
                    )}

                  {(isNumbered || slot.item.tier) && (
                    <span
                      className={cn(
                        'absolute bottom-0 text-shadow-contrast font-bold',
                        'right-0 lg:right-2',
                        'text-md md:text-xl lg:text-3xl',
                        slot.item.tier === 'ST' && 'text-orange-500',
                        slot.item.tier === 'UT' && 'text-purple-700',
                      )}
                    >
                      {isNumbered ? (index + 1) : slot.item.tier}
                    </span>
                  )}

                  {!!slot.enchantSlots && (
                    <div
                      className={cn(
                        'absolute',
                        'bottom-1 md:bottom-1.5 lg:bottom-2',
                        'left-0 lg:left-2',
                      )}
                    >
                      {enchantSlots[slot.enchantSlots]}
                    </div>
                  )}

                  {onDeleteSlot && slot.count > 0 && (
                    <div
                      className={cn(
                        'hidden group-hover:block absolute top-0 right-0',
                        'bg-black/70 hover:bg-black rounded-full',
                      )}
                    >
                      <Button
                        icon
                        variant="flat"
                        size="sm"
                        color="destructive"
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleDeleteSlot(slot)}
                      >
                        <Trash2 className="size-5 drop-shadow-2xl" />
                      </Button>
                    </div>
                  )}
                </VaultSlot>
              </Tooltip.Trigger>

              <Tooltip.Content side="bottom">
                <p>{slot.item.name}</p>
              </Tooltip.Content>
            </Tooltip.Root>
          ))}
        </div>
      ))}
    </>
  );
}

export interface HoardSequenceProps {
  sequence: Omit<FullHoardSequenceObjectWithOptionalSlots, 'section' | 'position'>;
  onSlotClick?: (slot: FullHoardSlot | undefined, event: React.MouseEvent) => void;
  onCountChange?: (count: number) => void;
  onDeleteSlot?: (slot: FullHoardSlot) => void;
}
