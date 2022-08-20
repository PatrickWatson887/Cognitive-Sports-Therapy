import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const diaryQuery = trpc.useQuery(['diaries.byUuid', uuid]);
  if (diaryQuery.error) {
    const statusCode = diaryQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={diaryQuery.error.message} statusCode={statusCode} />
    );
  }
  if (diaryQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{diaryQuery.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(diaryQuery.data ?? null, null, 4)}</pre>
    </>
  );
}
