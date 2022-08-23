import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const programmesRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      image_url: z.string(),
      author: z.string(),
      length: z.string(),
      start_date: z.date(),
      end_date: z.date(),
      user_uuid: z.string(),
    }),
    async resolve({ ctx, input }) {
      const programmes = await ctx.prisma.programmes.create({
        data: input,
      });
      return programmes;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.programmes.findMany({
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
      const programmes = await ctx.prisma.programmes.findUnique({
        where: { uuid: input },
        include: {
          programmeSessions: {
            include: { workout: true, article: true, audio: true },
          },
        },
      });
      if (!programmes) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No programmes with uuid '${input}'`,
        });
      }
      return programmes;
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
      const programmes = await ctx.prisma.programmes.update({
        where: { uuid },
        data,
      });
      return programmes;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.programmes.delete({ where: { uuid } });
      return uuid;
    },
  });
