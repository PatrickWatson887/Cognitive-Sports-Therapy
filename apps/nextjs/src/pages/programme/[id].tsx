import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const programme = trpc.useQuery(['programmes.byUuid', uuid]);
  if (programme.error) {
    const statusCode = programme.error.data?.httpStatus ?? 500;
    return (
      <NextError title={programme.error.message} statusCode={statusCode} />
    );
  }
  if (programme.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{programme.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(programme.data ?? null, null, 4)}</pre>
    </>
  );
}
