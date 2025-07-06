import { types, schema } from 'papr';

import { gameClasses } from '~/data';
import { papr } from '~/server/database';

export const Character = papr.model('characters', schema({
  id: types.string({ required: true }),
  class: types.enum(gameClasses, { required: true }),
  isSeasonal: types.boolean({ required: true }),
  potionsRemaining: types.object({
    life: types.number({ required: true, minimum: 0, maximum: 99 }),
    mana: types.number({ required: true, minimum: 0, maximum: 99 }),
    attack: types.number({ required: true, minimum: 0, maximum: 99 }),
    defense: types.number({ required: true, minimum: 0, maximum: 99 }),
    speed: types.number({ required: true, minimum: 0, maximum: 99 }),
    dexterity: types.number({ required: true, minimum: 0, maximum: 99 }),
    vitality: types.number({ required: true, minimum: 0, maximum: 99 }),
    wisdom: types.number({ required: true, minimum: 0, maximum: 99 }),
  }, { required: true }),
}));

export type CharacterType = Omit<typeof Character['schema'], '_id'>;
