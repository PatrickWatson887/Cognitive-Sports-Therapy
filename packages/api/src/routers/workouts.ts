import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const workoutsRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      image_url: z.string(),
      author: z.string(),
      video_url: z.string(),
      length: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const workouts = await ctx.prisma.workouts.create({
        data: input,
      });
      return workouts;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.workouts.findMany({
        select: {
          uuid: true,
          title: true,
        },
      });
    },
  })
  .query('byUuid', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const workouts = await ctx.prisma.workouts.findUnique({
        where: { uuid: input },
      });
      if (!workouts) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No workouts with uuid '${input}'`,
        });
      }
      return workouts;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      uuid: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        total_members: z.string().min(1).optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { uuid, data } = input;
      const workouts = await ctx.prisma.workouts.update({
        where: { uuid },
        data,
      });
      return workouts;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.workouts.delete({ where: { uuid } });
      return uuid;
    },
  });
