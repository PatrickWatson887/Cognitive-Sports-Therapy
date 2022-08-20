import { createRouter } from '../createRouter';
import { z } from 'zod';

export const credentialsRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      uuid: z.string(),
      username: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      const credentials = await ctx.prisma.credentials.create({
        data: input,
      });
      return credentials;
    },
  })
  .query('login', {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      const credentials = await ctx.prisma.credentials.findUnique({
        where: { username: input.username },
      });
      if (!credentials) return false;

      if (input.password !== credentials.password) return false;

      return credentials.uuid;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      username: z.string(),
      data: z.object({
        username: z.string().min(1).optional(),
        password: z.string().min(1).optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { username, data } = input;
      const credentials = await ctx.prisma.credentials.update({
        where: { username },
        data,
      });
      return credentials;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string(),
    async resolve({ input: username, ctx }) {
      await ctx.prisma.credentials.delete({ where: { username } });
      return username;
    },
  });
