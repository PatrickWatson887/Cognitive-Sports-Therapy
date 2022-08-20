import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const workoutQuery = trpc.useQuery(['workouts.byUuid', uuid]);
  if (workoutQuery.error) {
    const statusCode = workoutQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={workoutQuery.error.message} statusCode={statusCode} />
    );
  }
  if (workoutQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{workoutQuery.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(workoutQuery.data ?? null, null, 4)}</pre>
    </>
  );
}
