import { z } from 'zod/v4';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { gameClasses } from '~/data';

import { Character } from './character.model';

export const characterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async() => {
    const characters = await Character.find({});
    return characters.map(character => ({
      ...character,
      _id: character._id.toString(),
    }));
  }),

  create: publicProcedure
    .input(z.object({
      id: z.string(),
      class: z.enum(gameClasses),
      isSeasonal: z.boolean().default(true),
      potionsRemaining: z.object({
        life: z.number(),
        mana: z.number(),
        attack: z.number(),
        defense: z.number(),
        speed: z.number(),
        dexterity: z.number(),
        vitality: z.number(),
        wisdom: z.number(),
      }),
    }))
    .mutation(async ({ input }) => {
      await Character.insertOne(input);
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      class: z.enum(gameClasses),
      isSeasonal: z.boolean(),
      potionsRemaining: z.object({
        life: z.number(),
        mana: z.number(),
        attack: z.number(),
        defense: z.number(),
        speed: z.number(),
        dexterity: z.number(),
        vitality: z.number(),
        wisdom: z.number(),
      }),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await Character.updateOne({ id }, { $set: data });
    }),

  delete: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input }) => {
      await Character.deleteOne({ id: input.id });
    }),
});
