import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const audiosRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      image_url: z.string(),
      author: z.string(),
      audio_url: z.string(),
      length: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const audios = await ctx.prisma.audios.create({
        data: input,
      });
      return audios;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.audios.findMany({
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
      const audios = await ctx.prisma.audios.findUnique({
        where: { uuid: input },
      });
      if (!audios) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No audios with uuid '${input}'`,
        });
      }
      return audios;
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
      const audios = await ctx.prisma.audios.update({
        where: { uuid },
        data,
      });
      return audios;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.audios.delete({ where: { uuid } });
      return uuid;
    },
  });
