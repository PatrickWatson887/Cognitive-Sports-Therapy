import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const user = trpc.useQuery(['users.byUuid', uuid]);
  const userDiaries = trpc.useQuery(['userDiaries.byUserUuid', uuid]);

  if (user.error) {
    const statusCode = user.error.data?.httpStatus ?? 500;
    return <NextError title={user.error.message} statusCode={statusCode} />;
  }
  if (user.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{user.data?.username}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(user.data ?? null, null, 4)}</pre>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(userDiaries.data ?? null, null, 4)}</pre>
    </>
  );
}
