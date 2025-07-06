export const gameClasses = [
  'Rogue',
  'Archer',
  'Wizard',
  'Priest',
  'Warrior',
  'Knight',
  'Paladin',
  'Assassin',
  'Necromancer',
  'Huntress',
  'Mystic',
  'Trickster',
  'Sorcerer',
  'Ninja',
  'Samurai',
  'Bard',
  'Summoner',
  'Kensei',
] as const;

export type GameClass = typeof gameClasses[number];
