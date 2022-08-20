import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const articleQuery = trpc.useQuery(['articles.byUuid', uuid]);
  if (articleQuery.error) {
    const statusCode = articleQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={articleQuery.error.message} statusCode={statusCode} />
    );
  }
  if (articleQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{articleQuery.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(articleQuery.data ?? null, null, 4)}</pre>
    </>
  );
}
