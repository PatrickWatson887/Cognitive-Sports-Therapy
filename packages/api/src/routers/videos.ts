import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const videosRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      video_url: z.string(),
    }),
    async resolve({ ctx, input }) {
      const videos = await ctx.prisma.videos.create({
        data: input,
      });
      return videos;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.videos.findMany({
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
      const videos = await ctx.prisma.videos.findUnique({
        where: { uuid: input },
      });
      if (!videos) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No videos with uuid '${input}'`,
        });
      }
      return videos;
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
      const videos = await ctx.prisma.videos.update({
        where: { uuid },
        data,
      });
      return videos;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.videos.delete({ where: { uuid } });
      return uuid;
    },
  });
