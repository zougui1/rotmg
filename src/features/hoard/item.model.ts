import { types, schema } from 'papr';

import { papr } from '~/server/database';

export const Item = papr.model('items', schema({
  id: types.string({ required: true }),
  name: types.string({ required: true }),
  image: types.string({ required: true }),
  tier: types.string(),
  enchantable: types.boolean(),
  shiny: types.boolean(),
}));

export type ItemType = Omit<typeof Item['schema'], '_id'>;
