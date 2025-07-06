import { types, schema } from 'papr';

import { gameClasses } from '~/data';
import { papr } from '~/server/database';

export const Exaltation = papr.model('exaltations', schema({
  class: types.enum(gameClasses, { required: true }),
  life: types.number({ required: true, minimum: 0 }),
  mana: types.number({ required: true, minimum: 0 }),
  attack: types.number({ required: true, minimum: 0 }),
  defense: types.number({ required: true, minimum: 0 }),
  speed: types.number({ required: true, minimum: 0 }),
  dexterity: types.number({ required: true, minimum: 0 }),
  vitality: types.number({ required: true, minimum: 0 }),
  wisdom: types.number({ required: true, minimum: 0 }),
}));

export type ExaltationType = Omit<typeof Exaltation['schema'], '_id'>;
