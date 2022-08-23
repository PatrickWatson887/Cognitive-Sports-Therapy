import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const usersRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      uuid: z.string(),
      username: z.string(),
      email: z.string(),
      address: z.string(),
      phone_number: z.string(),
      sponsor_uuid: z.string(),
      community_uuid: z.string(),
      diary_uuid: z.string(),
      role_title: z.string(),
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
          uuid: true,
          username: true,
        },
      });
    },
  })
  .query('byUuid', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const users = await ctx.prisma.users.findUnique({
        where: { uuid: input },
        include: {
          role: true,
          sponsor: true,
          community: true,
          diary: true,
        },
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
      const user = await ctx.prisma.users.findUnique({
        where: { username: input },
        include: {},
      });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No users with name '${input}'`,
        });
      }
      return user;
    },
  })
  .query('byRole', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const users = await ctx.prisma.users.findMany({
        where: { role_title: input },
      });
      if (!users) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No users with role_uuid '${input}'`,
        });
      }
      return users;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      uuid: z.string().uuid(),
      data: z.object({
        username: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        phone_number: z.string().optional(),
        sponsor_uuid: z.string().optional(),
        community_uuid: z.string().optional(),
        diary_uuid: z.string().optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { uuid, data } = input;
      const users = await ctx.prisma.users.update({
        where: { uuid },
        data,
      });
      return users;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.users.delete({ where: { uuid } });
      return uuid;
    },
  });
