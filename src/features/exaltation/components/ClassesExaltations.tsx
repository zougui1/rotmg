'use client';

import { useState } from 'react';
import { useQueryState, createParser } from 'nuqs';

import { Accordion } from '~/components/ui/Accordion';
import { api } from '~/trpc/react';
import { characterStats, gameClasses, type CharacterStat, type GameClass } from '~/data';

import { ClassExaltationsSummary } from './ClassExaltationsSummary';
import { ClassExaltationDetails } from './ClassExaltationDetails';
import type { ExaltationType } from '../exaltation.model';

const classes: GameClass[] = [
  'Priest',
  'Sorcerer',
  'Summoner',
  'Necromancer',
  'Wizard',
  'Mystic',
  'Bard',
  'Archer',
  'Huntress',
  'Rogue',
  'Assassin',
  'Trickster',
  'Ninja',
  'Samurai',
  'Kensei',
  'Warrior',
  'Knight',
  'Paladin',
];

const defaultExaltation: Omit<ExaltationType, 'class'> = {
  life: 0,
  mana: 0,
  attack: 0,
  defense: 0,
  speed: 0,
  dexterity: 0,
  vitality: 0,
  wisdom: 0,
};

const ClassExaltationItem = ({
  gameClass,
  exaltation: exaltationProp,
  onIncrement,
}: {
  gameClass: GameClass;
  exaltation?: ExaltationType;
  onIncrement?: (statName: CharacterStat, value: number) => void;
}) => {
  const exaltation = exaltationProp ?? {
    ...defaultExaltation,
    class: gameClass,
  }

  return (
    <Accordion.Item key={gameClass} value={gameClass}>
      <Accordion.Trigger className="py-2 rounded-none">
        <ClassExaltationsSummary exaltation={exaltation} />
      </Accordion.Trigger>

      <Accordion.Content>
        <ClassExaltationDetails
          exaltation={exaltation}
          onIncrement={onIncrement}
        />
      </Accordion.Content>
    </Accordion.Item>
  );
}

const useExaltations = () => {
  const [exaltations] = api.exaltation.getAll.useSuspenseQuery();
  const exaltationObject: Partial<Record<GameClass, ExaltationType>> = {};

  for (const exaltation of exaltations) {
    exaltationObject[exaltation.class] = exaltation;
  }

  return exaltationObject;
}

const classParser = createParser({
  //parse: z.coerce.array(z.enum(gameClasses)).transform(value => value.join(',')).parse,
  parse: query => {
    const queryValues = query.split(',');
    return queryValues.filter((value): value is GameClass => {
      return gameClasses.includes(value as GameClass);
    });
  },
  serialize: values => values.join(','),
}).withDefault([]);

export const ClassesExaltations = () => {
  const [optimisticExaltations, setOptimisticExaltations] = useState<Partial<Record<GameClass, ExaltationType>>>({});
  const [openClasses, setOpenClasses] = useQueryState('class', classParser);

  const utils = api.useUtils();
  const exaltations = useExaltations();
  const mutation = api.exaltation.updateExaltationPoints.useMutation({
    onSuccess: () => utils.exaltation.invalidate(),
  });

  const onIncrement = (gameClass: GameClass) => (statName: CharacterStat, value: number) => {
    const lowerStatName = characterStats.lowerCaseMap[statName];

    mutation.mutate({
      class: gameClass,
      increments: {
        [lowerStatName]: value,
      },
    });

    const newOptimisticExaltations: Partial<Record<GameClass, ExaltationType>> = {
      ...optimisticExaltations,
    };

    for (const gameClass of gameClasses) {
      newOptimisticExaltations[gameClass] ??= {
        ...(exaltations[gameClass] ?? defaultExaltation),
        class: gameClass,
      };
    }

    if (newOptimisticExaltations[gameClass]) {
      newOptimisticExaltations[gameClass][lowerStatName] += value;
    }

    setOptimisticExaltations(newOptimisticExaltations);
  }

  return (
    <Accordion.Root
      type="multiple"
      className="max-w-xl mx-auto"
      value={openClasses}
      onValueChange={values => setOpenClasses(values.length ? values as GameClass[] : null)}
    >
      {classes.map(gameClass => (
        <ClassExaltationItem
          key={gameClass}
          gameClass={gameClass}
          exaltation={optimisticExaltations[gameClass] ?? exaltations[gameClass]}
          onIncrement={onIncrement(gameClass)}
        />
      ))}
    </Accordion.Root>
  );
}
