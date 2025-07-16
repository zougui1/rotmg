'use client';

import { memo, useRef, useCallback, useMemo, useEffect } from 'react';
import { useSelector } from '@xstate/store/react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { sort } from 'radash';

import { api } from '~/trpc/react';
import { Accordion } from '~/components/ui/Accordion';
import { ContextMenu } from '~/components/ui/ContextMenu';
import { cn } from '~/utils';
import { Button } from '~/components/ui/Button';
import { useDialog } from '~/hooks';
import { Tooltip } from '~/components/ui/Tooltip';

import { HoardSequenceList } from './HoardSequenceList';
import { HoardProgress } from './HoardProgress';
import { CreateHoardSequenceDialog } from './CreateHoardSequenceDialog';
import { hoardStore } from '../hoard.store';
import { useHoardFilters } from '../hooks';
import { getHoardStats } from '../utils';
import type { FullHoardSlot } from '../hoardSequence.model';

const HoardSectionSummary = ({ sectionId }: HoardSectionSummaryProps) => {
  const section = useSelector(hoardStore, state => state.context.maps.sections[sectionId]);
  const sequenceCreationDialog = useDialog();

  if(!section) {
    return null;
  }

  const stats = getHoardStats([section]);

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Accordion.Trigger
            classes={{ header: 'sticky z-20 top-0 left-0 h-14' }}
            className={cn(
              'py-2 rounded-none bg-card text-card-foreground',
              'w-[calc(var(--vault-slot-width)*8+var(--vault-slot-gap)*9)]',
            )}
          >
            <div className="w-full flex">
              <div className="w-10/12 md:w-1/2 flex items-center gap-2">
                <Image
                  src={section.image}
                  alt="Icon"
                  width={40}
                  height={40}
                  className="drop-shadow-xs drop-shadow-white/80"
                  style={{
                    // @ts-expect-error react's CSSProperties type doesn't handle CSS variables
                    '--tw-drop-shadow-size': 'drop-shadow(0 0 1.5px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.05)))'
                  }}
                />
                <span className="text-lg">{section.name}</span>
              </div>

              <div className="flex items-center">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <span>Completion: </span>
                      <span className={cn(stats.completion >= 100 && 'text-yellow-400')}>
                        {Number(stats.completion.toFixed(2))}%
                      </span>
                    </div>
                  </Tooltip.Trigger>

                  <Tooltip.Content side="bottom" className="flex flex-col min-w-48">
                    <HoardProgress
                      label="Items"
                      value={stats.items.owned}
                      total={stats.items.total}
                    />

                    <HoardProgress
                      label="Unique Items"
                      value={stats.uniqueItems.owned}
                      total={stats.uniqueItems.total}
                    />

                    <HoardProgress
                      label="Divine Items"
                      value={stats.divineItems.owned}
                      total={stats.divineItems.total}
                    />

                    <HoardProgress
                      label="Shinies"
                      value={stats.shinies.owned}
                      total={stats.shinies.total}
                    />

                    <HoardProgress
                      label="Unique Shinies"
                      value={stats.uniqueShinies.owned}
                      total={stats.uniqueShinies.total}
                    />
                  </Tooltip.Content>
                </Tooltip.Root>
              </div>
            </div>
          </Accordion.Trigger>
        </ContextMenu.Trigger>

        <ContextMenu.Content>
          <ContextMenu.Item onClick={sequenceCreationDialog.open}>
            New Items
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <sequenceCreationDialog.Outlet>
        <CreateHoardSequenceDialog section={section} />
      </sequenceCreationDialog.Outlet>
    </>
  );
}

interface HoardSectionSummaryProps {
  sectionId: string;
}

const HoardSectionItem = memo(function HoardSectionItem({ sectionId, sequenceIds }: HoardSectionItemProps) {
  const { mutateAsync: mutatateSlot } = api.hoard.updateSlot.useMutation();
  const section = useSelector(hoardStore, state => state.context.maps.sections[sectionId]);

  const updateSlot = useCallback(async (slot: FullHoardSlot, newSlot: FullHoardSlot) => {
    hoardStore.trigger.updateSlot({ sectionId, slot: newSlot });

    try {
      await mutatateSlot({ slot: newSlot });
    } catch {
      hoardStore.trigger.updateSlot({ sectionId, slot });
    }
  }, [sectionId, mutatateSlot]);

  const onSlotClick = useCallback(async (slot: FullHoardSlot | undefined) => {
    if (!slot) {
      return;
    }

    const newSlot = { ...slot };

    if (slot.item.enchantable && newSlot.count > 0) {
      newSlot.enchantSlots = ((newSlot.enchantSlots ?? 0) + 1) % 5;
    } else {
      newSlot.count = newSlot.count > 0 ? 0 : 1;
    }

    await updateSlot(slot, newSlot);
  }, [updateSlot]);

  const onDeleteSlot = useCallback(async (slot: FullHoardSlot) => {
    const newSlot = {
      ...slot,
      count: 0,
    };

    if (newSlot.enchantSlots !== undefined) {
      newSlot.enchantSlots = 0;
    }

    await updateSlot(slot, newSlot);
  }, [updateSlot]);

  if (!section) {
    return null;
  }

  return (
    <Accordion.Item value={section.name}>
      <HoardSectionSummary sectionId={sectionId} />

      <Accordion.Content>
        <div
          className={cn(
            'flex flex-col bg-[#252223] p-[var(--vault-slot-gap)] gap-y-[var(--vault-slot-gap)]',
          )}
        >
          {!section.sequences.length && (
            <CreateHoardSequenceDialog section={section}>
              <Button
                icon
                variant="flat"
                size="lg"
                className="mx-auto"
              >
                <Plus className="size-8" />
              </Button>
            </CreateHoardSequenceDialog>
          )}

          <HoardSequenceList
            sequenceIds={sequenceIds}
            onSlotClick={onSlotClick}
            onDeleteSlot={onDeleteSlot}
          />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
});

interface HoardSectionItemProps {
  sectionId: string;
  sequenceIds: string[];
}

const useSections = () => {
  const mounted = useRef(false);
  const [serverSections] = api.hoard.getSections.useSuspenseQuery();
  const clientSections = useSelector(hoardStore, state => state.context.maps.sections);
  const filters = useHoardFilters();

  const allSections = mounted.current
    ? Object.values(clientSections)
    : serverSections;

  if (!mounted.current) {
    mounted.current = true;
    hoardStore.trigger.init({ sections: serverSections });
  }

  return useMemo(() => {
    const search = filters.search.value.toLowerCase();

    const sections = allSections.map(section => {
      const sequences = section.sequences.map(sequence => {
        const slots = sequence.slots.filter(slot => {
          return (
            (
              !search ||
              slot.item.name.toLowerCase().includes(search)
            ) &&
            (
              !['ST', 'UT'].includes(filters.tier.value ?? '') ||
              slot.item.tier === filters.tier.value
            ) &&
            (!filters.shiniesOnly.value || slot.item.shiny) &&
            (!filters.divinesOnly.value || (slot.count && slot.enchantSlots && slot.enchantSlots >= 4))
          );
        });

        return {
          ...sequence,
          slots,
        };
      }).filter(sequence => {
        if (!sequence.slots.length) {
          return;
        }

        if (filters.rowProgress.value === 'complete') {
          return sequence.slots.every(s => s.count > 0);
        }

        if (filters.rowProgress.value === 'incomplete') {
          return sequence.slots.some(s => s.count <= 0);
        }

        return true;
      });

      return {
        ...section,
        sequences,
      };
    }).filter(s => s.sequences.length).map(section => {
      return {
        ...section,
        sequenceIds: sort(section.sequences, s => s.position).map(s => s.id),
      };
    });

    return sort(sections, s => s.position);
  }, [filters, allSections]);
}

export const HoardSectionList = () => {
  const mounted = useRef(false);
  const sections = useSections();
  const [openSection, setOpenSection] = useQueryState('section');

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        'h-full overflow-y-auto pr-3',
        '[--vault-slot-width:calc(var(--spacing)*16)]',
        'md:[--vault-slot-width:calc(var(--spacing)*20)]',
        'lg:[--vault-slot-width:100px]',
      )}
    >
      <Accordion.Root
        type="multiple"
        value={openSection ? [openSection] : []}
        onValueChange={values => setOpenSection(values.at(-1) ?? null)}
        className="relative"
      >
        {sections.map(section => (
          <HoardSectionItem
            key={section.id}
            sectionId={section.id}
            sequenceIds={section.sequenceIds}
          />
        ))}
      </Accordion.Root>
    </div>
  );
}
