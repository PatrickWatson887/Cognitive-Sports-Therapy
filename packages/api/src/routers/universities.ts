import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const universitiesRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      title: z.string(),
      total_members: z.string(),
    }),
    async resolve({ ctx, input }) {
      const universities = await ctx.prisma.universities.create({
        data: input,
      });
      return universities;
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      return ctx.prisma.universities.findMany({
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
      const universities = await ctx.prisma.universities.findUnique({
        where: { uuid: input },
      });
      if (!universities) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No universities with uuid '${input}'`,
        });
      }
      return universities;
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
      const universities = await ctx.prisma.universities.update({
        where: { uuid },
        data,
      });
      return universities;
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: uuid, ctx }) {
      await ctx.prisma.universities.delete({ where: { uuid } });
      return uuid;
    },
  });
