import { exaltationLevels } from '../data';

const levels = {
  5: exaltationLevels[1] + exaltationLevels[2] + exaltationLevels[3] + exaltationLevels[4] + exaltationLevels[5],
  4: exaltationLevels[1] + exaltationLevels[2] + exaltationLevels[3] + exaltationLevels[4],
  3: exaltationLevels[1] + exaltationLevels[2] + exaltationLevels[3],
  2: exaltationLevels[1] + exaltationLevels[2],
  1: exaltationLevels[1],
}

export const getExaltationLevel = (points: number) => {
  if (points >= levels[5]) return 5;
  if (points >= levels[4]) return 4;
  if (points >= levels[3]) return 3;
  if (points >= levels[2]) return 2;
  if (points >= levels[1]) return 1;
  return 0;
}
