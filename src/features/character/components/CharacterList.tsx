'use client';

import { useEffect } from 'react';
import { useSelector } from '@xstate/store/react';

import { api } from '~/trpc/react';

import { CharacterSummary } from './CharacterSummary';
import { characterStore } from '../character.store';

export const CharacterList = () => {
  const [serverCharacters] = api.character.getAll.useSuspenseQuery(undefined, {
    refetchInterval: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const clientCharacters = useSelector(characterStore, state => state.context.characters);

  const characters = clientCharacters.length
    ? clientCharacters
    : serverCharacters;

  useEffect(() => {
    characterStore.trigger.init({ characters: serverCharacters });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 mx-auto">
      {characters.map(character => (
        <CharacterSummary key={character.id} character={character} />
      ))}
    </div>
  );
}
