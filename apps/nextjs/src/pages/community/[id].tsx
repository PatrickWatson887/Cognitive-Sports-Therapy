import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const communityQuery = trpc.useQuery(['communities.byUuid', uuid]);
  if (communityQuery.error) {
    const statusCode = communityQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={communityQuery.error.message} statusCode={statusCode} />
    );
  }
  if (communityQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{communityQuery.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(communityQuery.data ?? null, null, 4)}</pre>
    </>
  );
}
