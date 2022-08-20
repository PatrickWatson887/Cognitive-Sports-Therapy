import { createRouter } from '../createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const userDiariesRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      user_uuid: z.string(),
      diary_uuid: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userDiaries = await ctx.prisma.userDiaries.create({
        data: input,
      });
      return userDiaries;
    },
  })
  // read
  .query('byUserUuid', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const userDiaries = await ctx.prisma.userDiaries.findMany({
        where: { user_uuid: input },
      });
      if (!userDiaries) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No userDiaries with uuid '${input}'`,
        });
      }
      return userDiaries;
    },
  });
// // update
// .mutation('edit', {
//   input: z.object({
//     uuid: z.string().uuid(),
//     data: z.object({
//       title: z.string().min(1).max(32).optional(),
//       total_members: z.string().min(1).optional(),
//     }),
//   }),
//   async resolve({ ctx, input }) {
//     const { uuid, data } = input;
//     const userDiaries = await ctx.prisma.userDiaries.update({
//       where: { uuid },
//       data,
//     });
//     return userDiaries;
//   },
// })
// delete
// .mutation('delete', {
//   input: z.string().uuid(),
//   async resolve({ input: uuid, ctx }) {
//     await ctx.prisma.userDiaries.delete({ where: { uuid } });
//     return uuid;
//   },
// });
