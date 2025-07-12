import { types, schema } from 'papr';

import { papr } from '~/server/database';

export const HoardSection = papr.model('hoardSections', schema({
  id: types.string({ required: true }),
  name: types.string({ required: true }),
  image: types.string({ required: true }),
  position: types.number({ required: true }),
}));

export type HoardSectionType = Omit<typeof HoardSection['schema'], '_id'>;
