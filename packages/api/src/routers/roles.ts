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
          title: true,
        },
      });
    },
  })
  .query('byTitle', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const roles = await ctx.prisma.roles.findUnique({
        where: { title: input },
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
      title: z.string(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        total_members: z.string().min(1).optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { title, data } = input;
      const roles = await ctx.prisma.roles.update({
        where: { title },
        data,
      });
      return roles;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string(),
    async resolve({ input: title, ctx }) {
      await ctx.prisma.roles.delete({ where: { title } });
      return title;
    },
  });
