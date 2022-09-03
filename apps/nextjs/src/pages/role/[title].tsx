import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const title = useRouter().query.title as string;
  const roleQuery = trpc.useQuery(['roles.byTitle', title]);
  if (roleQuery.error) {
    const statusCode = roleQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={roleQuery.error.message} statusCode={statusCode} />
    );
  }
  if (roleQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{roleQuery.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(roleQuery.data ?? null, null, 4)}</pre>
    </>
  );
}
