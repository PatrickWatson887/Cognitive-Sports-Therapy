import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const rolesRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      total_members: z.string(),
    }),
    async resolve({ ctx, input }) {
      const roles = await ctx.prisma.roles.create({
        data: input,
      });
      return roles;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.roles.findMany({
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
      const roles = await ctx.prisma.roles.findUnique({
        where: { uuid: input },
      });
      if (!roles) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No roles with uuid '${input}'`,
        });
      }
      return roles;
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
      const roles = await ctx.prisma.roles.update({
        where: { uuid },
        data,
      });
      return roles;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.roles.delete({ where: { uuid } });
      return uuid;
    },
  });
