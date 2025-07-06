import { z } from 'zod/v4';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

import { Exaltation } from './exaltation.model';
import { gameClasses } from '~/data';

export const exaltationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async() => {
    return await Exaltation.find({});
  }),

  updateExaltationPoints: publicProcedure
    .input(z.object({
      class: z.enum(gameClasses),
      increments: z.object({
        life: z.number().optional(),
        mana: z.number().optional(),
        attack: z.number().optional(),
        defense: z.number().optional(),
        speed: z.number().optional(),
        dexterity: z.number().optional(),
        vitality: z.number().optional(),
        wisdom: z.number().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const exaltation = await Exaltation.findOne({
        class: input.class,
      });

      if (exaltation) {
        await Exaltation.updateOne(
          { class: input.class },
          { $inc: input.increments },
        );
        return;
      }

      await Exaltation.insertOne({
        class: input.class,
        life: Math.max(0, input.increments.life ?? 0),
        mana: Math.max(0, input.increments.mana ?? 0),
        attack: Math.max(0, input.increments.attack ?? 0),
        defense: Math.max(0, input.increments.defense ?? 0),
        speed: Math.max(0, input.increments.speed ?? 0),
        dexterity: Math.max(0, input.increments.dexterity ?? 0),
        vitality: Math.max(0, input.increments.vitality ?? 0),
        wisdom: Math.max(0, input.increments.wisdom ?? 0),
      });
    }),
});
