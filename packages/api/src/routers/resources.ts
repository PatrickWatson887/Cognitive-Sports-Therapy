import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const resourcesRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      address: z.string(),
      sponsor_uuid: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const resources = await ctx.prisma.resources.create({
        data: input,
      });
      return resources;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.resources.findMany({
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
      const resources = await ctx.prisma.resources.findUnique({
        where: { uuid: input },
      });
      if (!resources) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No resources with uuid '${input}'`,
        });
      }
      return resources;
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
      const resources = await ctx.prisma.resources.update({
        where: { uuid },
        data,
      });
      return resources;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.resources.delete({ where: { uuid } });
      return uuid;
    },
  });
