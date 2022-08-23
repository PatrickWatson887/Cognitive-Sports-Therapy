import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const programmeSessionsRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      to_do_date_time: z.date(),
      programme_uuid: z.string().optional(),
      workout_uuid: z.string().optional(),
      audio_uuid: z.string().optional(),
      article_uuid: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const programmeSessions = await ctx.prisma.programmeSessions.create({
        data: input,
      });
      return programmeSessions;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.programmeSessions.findMany({
        select: {
          uuid: true,
          to_do_date_time: true,
        },
      });
    },
  })
  .query('byUuid', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const programmeSessions = await ctx.prisma.programmeSessions.findUnique({
        where: { uuid: input },
      });
      if (!programmeSessions) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No programmeSessions with uuid '${input}'`,
        });
      }
      return programmeSessions;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      uuid: z.string().uuid(),
      data: z.object({
        // title: z.string().min(1).max(32).optional(),
        // total_members: z.string().min(1).optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { uuid, data } = input;
      const programmeSessions = await ctx.prisma.programmeSessions.update({
        where: { uuid },
        data,
      });
      return programmeSessions;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.programmeSessions.delete({ where: { uuid } });
      return uuid;
    },
  });
