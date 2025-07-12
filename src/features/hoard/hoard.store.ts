import { createStore } from '@xstate/store';
import { produce } from 'immer';

import type { FullSection } from './hoard.router';
import type { FullHoardSequenceObject, FullHoardSlot } from './hoardSequence.model';

export const hoardStore = createStore({
  context: {
    sections: [] as FullSection[],
    maps: {
      sections: {} as Record<string, FullSection>,
      sequences: {} as Record<string, FullHoardSequenceObject>,
      slots: {} as Record<string, FullHoardSlot>,
    },
  },

  on: {
    init: (context, event: { sections: FullSection[]; }) => {
      const sequences = event.sections.flatMap(s => s.sequences);
      const slots = sequences.flatMap(s => s.slots);

      return {
        ...context,
        sections: event.sections,
        maps: {
          sections: Object.fromEntries(event.sections.map(s => [s.id, s])),
          sequences: Object.fromEntries(sequences.map(s => [s.id, s])),
          slots: Object.fromEntries(slots.map(s => [s.id, s])),
        },
      };
    },

    createSection: (context, event: { section: FullSection; }) => {
      return produce(context, draft => {
        draft.sections.push(event.section);

        const slots = event.section.sequences.flatMap(s => s.slots);

        draft.maps.sections[event.section.id] = event.section;

        for (const sequence of event.section.sequences) {
          draft.maps.sequences[sequence.id] = sequence;
        }

        for (const slot of slots) {
          draft.maps.slots[slot.id] = slot;
        }
      });
    },

    deleteSection: (context, event: { id: string; }) => {
      return produce(context, draft => {
        const section = context.maps.sections[event.id];

        if (!section) {
          return;
        }

        draft.sections = context.sections.filter(s => s.id !== section.id);

        const slots = section.sequences.flatMap(s => s.slots);
        delete draft.maps.sections[section.id];

        for (const sequence of section.sequences) {
          delete draft.maps.sequences[sequence.id];
        }

        for (const slot of slots) {
          delete draft.maps.slots[slot.id];
        }
      });
    },

    addSequence: (context, event: { sequence: FullHoardSequenceObject; }) => {
      return produce(context, draft => {
        const section = draft.maps.sections[event.sequence.section.id];

        if (!section) {
          return;
        }

        section.sequences.push(event.sequence);
        draft.maps.sequences[event.sequence.id] = event.sequence;

        for (const slot of event.sequence.slots) {
          draft.maps.slots[slot.id] = slot;
        }
      });
    },

    deleteSequence: (context, event: { sequence: FullHoardSequenceObject; }) => {
      return produce(context, draft => {
        const sequence = context.maps.sequences[event.sequence.id];
        const section = sequence && draft.maps.sections[sequence.section.id];

        if (!section || !sequence) {
          return;
        }

        section.sequences = section.sequences.filter(s => s.id !== event.sequence.id);
        delete draft.maps.sequences[event.sequence.id];

        for (const slot of sequence.slots) {
          delete draft.maps.slots[slot.id];
        }
      });
    },

    updateSlot: (context, event: { sectionId: string; slot: FullHoardSlot }) => {
      return produce(context, draft => {
        const section = draft.maps.sections[event.sectionId];
        const slot = draft.maps.slots[event.slot.id];

        if (slot) {
          slot.count = event.slot.count;
          slot.enchantSlots = event.slot.enchantSlots;
          draft.maps.slots[slot.id] = slot;

          if (section) {
            for (const sequence of section.sequences) {
              for (const sequenceSlot of sequence.slots) {
                if (sequenceSlot.id === slot.id) {
                  sequenceSlot.count = slot.count;
                  sequenceSlot.enchantSlots = slot.enchantSlots;

                  const mappedSequence = draft.maps.sequences[sequence.id];

                  if (mappedSequence) {
                    mappedSequence.slots = sequence.slots;
                  }

                  return;
                }
              }
            }
          }
        }
      });
    },
  },
});
