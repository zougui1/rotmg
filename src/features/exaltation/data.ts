import { sum } from 'radash';

export const maxExaltationLevel = 5;

/**
 * property is level and value is points required to reach the level
 */
export const exaltationLevels = {
  1: 5,
  2: 10,
  3: 15,
  4: 20,
  5: 25,
};

export const maxExaltationPoints = sum(Object.values(exaltationLevels));
