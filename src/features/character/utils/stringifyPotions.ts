import { characterStats } from '~/data';

import type { CharacterType } from '../character.model';


export const stringifyPotions = (potions: CharacterType['potionsRemaining']): string => {
  return characterStats.list
    .filter(stat => potions[characterStats.lowerCaseMap[stat]] > 0)
    .map(stat => `${potions[characterStats.lowerCaseMap[stat]]} ${characterStats.shortNameMap[stat]}`)
    .join(', ');
}
