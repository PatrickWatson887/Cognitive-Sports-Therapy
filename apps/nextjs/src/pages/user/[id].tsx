import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const id = useRouter().query.id as string;
  const userQuery = trpc.useQuery(['users.byId', id]);
  if (userQuery.error) {
    const statusCode = userQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={userQuery.error.message} statusCode={statusCode} />
    );
  }
  if (userQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{userQuery.data?.name}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(userQuery.data ?? null, null, 4)}</pre>
    </>
  );
}
