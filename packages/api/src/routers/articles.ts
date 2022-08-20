import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const articleRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      image_url: z.string(),
      author: z.string(),
      length: z.string(),
      body: z.string(),
    }),
    async resolve({ ctx, input }) {
      const articles = await ctx.prisma.articles.create({
        data: input,
      });
      return articles;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.articles.findMany({
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
      const articles = await ctx.prisma.articles.findUnique({
        where: { uuid: input },
      });
      if (!articles) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No articles with uuid '${input}'`,
        });
      }
      return articles;
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
      const articles = await ctx.prisma.articles.update({
        where: { uuid },
        data,
      });
      return articles;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.articles.delete({ where: { uuid } });
      return uuid;
    },
  });
