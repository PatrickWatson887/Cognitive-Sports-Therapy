import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const videoQuery = trpc.useQuery(['videos.byUuid', uuid]);
  if (videoQuery.error) {
    const statusCode = videoQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={videoQuery.error.message} statusCode={statusCode} />
    );
  }
  if (videoQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{videoQuery.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(videoQuery.data ?? null, null, 4)}</pre>
    </>
  );
}
