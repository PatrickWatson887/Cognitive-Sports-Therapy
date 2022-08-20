import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const audioQuery = trpc.useQuery(['audios.byUuid', uuid]);
  if (audioQuery.error) {
    const statusCode = audioQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={audioQuery.error.message} statusCode={statusCode} />
    );
  }
  if (audioQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{audioQuery.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(audioQuery.data ?? null, null, 4)}</pre>
    </>
  );
}
