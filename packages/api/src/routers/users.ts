import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const usersRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string(),
      email: z.string(),
      role: z.enum(['user', 'admin', 'premium'])
    }),
    async resolve({ ctx, input }) {
      const users = await ctx.prisma.users.create({
        data: input,
      });
      return users;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.users.findMany({
        select: {
          id: true,
          name: true,
        },
      });
    },
  })
  .query('byId', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const users = await ctx.prisma.users.findUnique({
        where: { id: input },
      });
      if (!users) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No users with id '${input}'`,
        });
      }
      return users;
    },
  })
  .query('byName', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const users = await ctx.prisma.users.findUnique({
        where: { name: input },
      });
      if (!users) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No users with name '${input}'`,
        });
      }
      return users;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input;
      const users = await ctx.prisma.users.update({
        where: { id },
        data,
      });
      return users;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: id, ctx }) {
      await ctx.prisma.users.delete({ where: { id } });
      return id;
    },
  });
