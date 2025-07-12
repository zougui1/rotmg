import { types, schema } from 'papr';

import { papr } from '~/server/database';

import { hoardSequenceTypes } from './enums';
import type { ItemType } from './item.model';

const section = types.object({
  id: types.string({ required: true }),
}, { required: true });

const slotItem = types.object({
  id: types.string({ required: true }),
}, { required: true });

const slot = types.object({
  id: types.string({ required: true }),
  item: slotItem,
  count: types.number({ required: true, minimum: 0 }),
  enchantSlots: types.number({ minimum: 0, maximum: 4 }),
}, { required: true });

export const HoardSequence = papr.model('hoardSequences', schema({
  id: types.string({ required: true }),
  type: types.enum(hoardSequenceTypes, { required: true }),
  section,
  slots: types.array(slot, { required: true }),
  position: types.number({ required: true }),
}));

export type FullHoardSlot = Omit<typeof slot, 'item'> & {
  item: ItemType;
};

export type PartialHoardSequenceObject = Omit<typeof HoardSequence['schema'], '_id'>;
export type FullHoardSequenceObject = Omit<PartialHoardSequenceObject, '_id' | 'slots' | 'section'> & {
  slots: FullHoardSlot[];
  section: { id: string; };
};

export type FullHoardSequenceObjectWithOptionalSlots = Omit<FullHoardSequenceObject, 'slots'> & {
  slots: (FullHoardSequenceObject['slots'][number] | undefined)[];
};
