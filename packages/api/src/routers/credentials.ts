import { createRouter } from '../createRouter';
import { z } from 'zod';

export const credentialsRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid(),
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
      if (!credentials) return false

      if (input.password !== credentials.password) return false

      return credentials.id

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
      const credentials = await ctx.prisma.credentials.update({
        where: { id },
        data,
      });
      return credentials;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: id, ctx }) {
      await ctx.prisma.credentials.delete({ where: { id } });
      return id;
    },
  });
