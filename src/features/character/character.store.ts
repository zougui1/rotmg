import { createStore } from '@xstate/store';
import { produce } from 'immer';

import type { CharacterType } from './character.model';

export const characterStore = createStore({
  context: {
    characters: [] as (CharacterType & { deleted?: boolean; })[],
    excludedCharacterIds: [] as string[],
  },

  on: {
    init: (context, event: { characters: CharacterType[]; }) => {
      return {
        ...context,
        characters: event.characters,
      };
    },

    markDeleted: (context, event: { id: string; }) => {
      console.log('markDeleted', event.id);
      return produce(context, draft => {
        const character = draft.characters.find(c => c.id === event.id);

        if (character) {
          character.deleted = true;
        }
      });
    },

    delete: (context, event: { id: string; }) => {
      console.log('delete', event.id);
      return {
        ...context,
        characters: context.characters.filter(c => c.id !== event.id),
      };
    },

    markUndelete: (context, event: { id: string; }) => {
      console.log('markUndelete', event.id);
      return produce(context, draft => {
        const character = draft.characters.find(c => c.id === event.id);

        if (character) {
          character.deleted = false;
        }
      });
    },

    create: (context, event: { character: CharacterType; }) => {
      return {
        ...context,
        characters: [...context.characters, event.character],
      };
    },

    update: (context, { character }: { character: CharacterType; }) => {
      return {
        ...context,
        characters: context.characters.map(c => {
          return c.id === character.id ? character : c;
        }),
      };
    },

    toggleCharactedExclusion: (context, event: { id: string; }) => {
      return {
        ...context,
        excludedCharacterIds: context.excludedCharacterIds.includes(event.id)
          ? context.excludedCharacterIds.filter(id => id !== event.id)
          : [...context.excludedCharacterIds, event.id],
      };
    },
  },
});
