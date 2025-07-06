const list = [
  'Life',
  'Mana',
  'Attack',
  'Defense',
  'Speed',
  'Dexterity',
  'Vitality',
  'Wisdom',
] as const;

export type CharacterStat = typeof list[number];
export const characterStats = {
  list,

  lowerCaseMap: {
    Life: 'life',
    Mana: 'mana',
    Attack: 'attack',
    Defense: 'defense',
    Speed: 'speed',
    Dexterity: 'dexterity',
    Vitality: 'vitality',
    Wisdom: 'wisdom',
  } satisfies Record<CharacterStat, Lowercase<CharacterStat>>,

  shortNameMap: {
    Life: 'life',
    Mana: 'mana',
    Attack: 'att',
    Defense: 'def',
    Speed: 'spd',
    Dexterity: 'dex',
    Vitality: 'vit',
    Wisdom: 'wis',
  } satisfies Record<CharacterStat, string>,
};
