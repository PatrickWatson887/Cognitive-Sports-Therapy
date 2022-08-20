/**
 * This file contains the root router of your tRPC-backend
 */
import superjson from 'superjson';
import { createRouter } from '../createRouter';
import { usersRouter } from './users';
import { credentialsRouter } from './credentials';
import { communitiesRouter } from './communities';
import { diariesRouter } from './diaries';
import { universitiesRouter } from './universities';
import { rolesRouter } from './roles';
import { userDiariesRouter } from './userDiaries';
import { audiosRouter } from './audios';
import { articleRouter } from './articles';
import { workoutsRouter } from './workouts';
import { programmesRouter } from './programmes';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  .merge('users.', usersRouter)
  .merge('credentials.', credentialsRouter)
  .merge('communities.', communitiesRouter)
  .merge('diaries.', diariesRouter)
  .merge('universities.', universitiesRouter)
  .merge('roles.', rolesRouter)
  .merge('userDiaries.', userDiariesRouter)
  .merge('audios.', audiosRouter)
  .merge('articles.', articleRouter)
  .merge('workouts.', workoutsRouter)
  .merge('programmes.', programmesRouter);

export type AppRouter = typeof appRouter;
