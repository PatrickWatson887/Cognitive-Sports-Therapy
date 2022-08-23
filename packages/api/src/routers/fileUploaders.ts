import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const sponsorsRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      total_members: z.string(),
    }),
    async resolve({ ctx, input }) {
      const sponsors = await ctx.prisma.sponsors.create({
        data: input,
      });
      return sponsors;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.sponsors.findMany({
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
      const sponsors = await ctx.prisma.sponsors.findUnique({
        where: { uuid: input },
      });
      if (!sponsors) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No sponsors with uuid '${input}'`,
        });
      }
      return sponsors;
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
      const sponsors = await ctx.prisma.sponsors.update({
        where: { uuid },
        data,
      });
      return sponsors;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.sponsors.delete({ where: { uuid } });
      return uuid;
    },
  });
