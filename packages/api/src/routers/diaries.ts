import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const diariesRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      description: z.string(),
      image_url: z.string(),
    }),
    async resolve({ ctx, input }) {
      const diaries = await ctx.prisma.diaries.create({
        data: input,
      });
      return diaries;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.diaries.findMany({
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
      const diaries = await ctx.prisma.diaries.findUnique({
        where: { uuid: input },
      });
      if (!diaries) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No diaries with uuid '${input}'`,
        });
      }
      return diaries;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      uuid: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { uuid, data } = input;
      const diaries = await ctx.prisma.diaries.update({
        where: { uuid },
        data,
      });
      return diaries;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.diaries.delete({ where: { uuid } });
      return uuid;
    },
  });
