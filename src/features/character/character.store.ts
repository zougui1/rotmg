import { createStore } from '@xstate/store';
import { produce } from 'immer';

import type { CharacterType } from './character.model';

export const characterStore = createStore({
  context: {
    characters: [] as (CharacterType & { deleted?: boolean; })[],
  },

  on: {
    init: (context, event: { characters: CharacterType[]; }) => {
      return {
        ...context,
        characters: event.characters,
      };
    },

    markDeleted: (context, event: { id: string; }) => {
      return produce(context, draft => {
        const character = draft.characters.find(c => c.id === event.id);

        if (character) {
          character.deleted = true;
        }
      });
    },

    delete: (context, event: { id: string; }) => {
      return {
        ...context,
        characters: context.characters.filter(c => c.id !== event.id),
      };
    },

    markUndelete: (context, event: { id: string; }) => {
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
  },
});
