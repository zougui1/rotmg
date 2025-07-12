import { createStore } from '@xstate/store';
import { produce } from 'immer';

import type { FullSection } from './hoard.router';
import type { FullHoardSequenceObject, FullHoardSlot } from './hoardSequence.model';

export const hoardStore = createStore({
  context: {
    sections: [] as FullSection[],
  },

  on: {
    init: (context, event: { sections: FullSection[]; }) => {
      return {
        ...context,
        sections: event.sections,
      };
    },

    createSection: (context, event: { section: FullSection; }) => {
      return {
        ...context,
        sections: [...context.sections, event.section],
      };
    },

    deleteSection: (context, event: { id: string; }) => {
      return {
        ...context,
        sections: context.sections.filter(s => s.id !== event.id),
      };
    },

    addSequence: (context, event: { sequence: FullHoardSequenceObject; }) => {
      return produce(context, draft => {
        const section = draft.sections.find(s => s.id === event.sequence.section.id);
        section?.sequences.push(event.sequence);
      });
    },

    deleteSequence: (context, event: { sequence: FullHoardSequenceObject; }) => {
      return produce(context, draft => {
        const section = draft.sections.find(s => s.id === event.sequence.section.id);

        if (section) {
          section.sequences = section.sequences.filter(s => s.id !== event.sequence.id);
        }
      });
    },

    updateSlot: (context, event: { sectionId: string; slot: FullHoardSlot }) => {
      return produce(context, draft => {
        const section = draft.sections.find(s => s.id === event.sectionId);
        const sequence = section?.sequences.find(s => s.slots.some(slot => slot.id === event.slot.id));
        const slot = sequence?.slots.find(s => s.id === event.slot.id);

        if (slot) {
          slot.count = event.slot.count;
          slot.enchantSlots = event.slot.enchantSlots;
        }
      });
    },
  },
});
