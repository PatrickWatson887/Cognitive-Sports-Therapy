import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const communitiesRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      total_members: z.string(),
    }),
    async resolve({ ctx, input }) {
      const communities = await ctx.prisma.communities.create({
        data: input,
      });
      return communities;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.communities.findMany({
        select: {
          uuid: true,
          title: true,
          total_members: true,
        },
      });
    },
  })
  .query('byUuid', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const communities = await ctx.prisma.communities.findUnique({
        where: { uuid: input },
      });
      if (!communities) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No communities with id '${input}'`,
        });
      }
      return communities;
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
      const communities = await ctx.prisma.communities.update({
        where: { uuid },
        data,
      });
      return communities;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.communities.delete({ where: { uuid } });
      return uuid;
    },
  });
