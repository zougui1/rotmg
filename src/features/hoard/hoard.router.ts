import { z } from 'zod/v4';
import { unique } from 'radash';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

import { HoardSection, type HoardSectionType } from './hoardSection.model';
import { HoardSequence, type FullHoardSequenceObject } from './hoardSequence.model';
import { Item } from './item.model';
import { hoardSequenceTypes } from './enums';

export type FullSection = HoardSectionType & {
  sequences: FullHoardSequenceObject[];
};

export const hoardRouter = createTRPCRouter({
  getSections: publicProcedure.query(async () => {
    const result = await HoardSection.aggregate([
      // Lookup hoardSequences related to the section
      {
        $lookup: {
          from: 'hoardSequences',
          let: { sectionId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$section.id', '$$sectionId'] },
              },
            },
            // Lookup items inside slots
            {
              $unwind: '$slots',
            },
            {
              $lookup: {
                from: 'items',
                localField: 'slots.item.id',
                foreignField: 'id',
                as: 'slots.itemDoc',
              },
            },
            {
              $unwind: '$slots.itemDoc',
            },
            {
              $addFields: {
                'slots.item': '$slots.itemDoc',
              },
            },
            {
              $group: {
                _id: '$_id',
                id: { $first: '$id' },
                type: { $first: '$type' },
                section: { $first: '$section' },
                slots: { $push: '$slots' },
                position: { $first: '$position' },
              },
            },
          ],
          as: 'sequences',
        },
      },
    ]);
    return result as unknown as FullSection[];
  }),

  createSection: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      position: z.number(),
    }))
    .mutation(async ({ input }) => {
      await HoardSection.insertOne(input);
    }),

  // create sequence with the given items
  createSequence: publicProcedure
    .input(z.object({
      id: z.string(),
      position: z.number(),
      type: z.enum(hoardSequenceTypes),
      section: z.object({
        id: z.string(),
      }),
      slots: z.array(z.object({
        id: z.string(),
        item: z.object({
          id: z.string(),
          name: z.string(),
          image: z.string(),
          tier: z.string().optional(),
          enchantable: z.boolean().optional(),
          shiny: z.boolean().optional(),
        }),
        count: z.number().int().min(0),
        enchantSlots: z.number().int().min(0).optional(),
      })),
    }))
    .mutation(async ({ input }) => {
      const inputItems = unique(input.slots.map(s => s.item), item => item.id);
      const items = await Item.insertMany(inputItems);

      const slots = input.slots.map(slot => {
        const item = items.find(i => i.id === slot.item.id);

        if (!item) {
          throw new Error('Item not created');
        }

        return {
          ...slot,
          item: { id: item.id },
        };
      });

      await HoardSequence.insertOne({
        ...input,
        slots,
      });
    }),

  updateSlot: publicProcedure
    .input(z.object({
      slot: z.object({
        id: z.string(),
        count: z.number().int().min(0),
        enchantSlots: z.number().int().min(0).max(4).optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      await HoardSequence.updateOne(
        { 'slots.id': input.slot.id },
        {
          $set: {
            'slots.$.count': input.slot.count,
            'slots.$.enchantSlots': input.slot.enchantSlots,
          },
        },
      );
    }),

  moveSequences: publicProcedure
    .input(z.object({
      sequences: z.array(z.object({
        id: z.string(),
        position: z.number(),
      })),
    }))
    .mutation(async ({ input }) => {
      await HoardSequence.bulkWrite(input.sequences.map(sequence => {
        return {
          updateOne: {
            filter: { id: sequence.id },
            update: { $set: { position: sequence.position } },
          },
        };
      }));
    }),

  moveSections: publicProcedure
    .input(z.object({
      sections: z.array(z.object({
        id: z.string(),
        position: z.number(),
      })),
    }))
    .mutation(async ({ input }) => {
      await HoardSection.bulkWrite(input.sections.map(section => {
        return {
          updateOne: {
            filter: { id: section.id },
            update: { $set: { position: section.position } },
          },
        };
      }));
    }),

  deleteSection: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input }) => {
      const sequences = await HoardSequence.find({ 'section.id': input.id });
      const itemIds = sequences.flatMap(sequence => sequence.slots.flatMap(slot => slot.item.id));

      await Promise.allSettled([
        Item.deleteMany({ id: { $in: unique(itemIds) } }),
        HoardSection.deleteOne({ id: input.id }),
        HoardSequence.deleteMany({ 'section.id': input.id }),
      ]);
    }),
});
