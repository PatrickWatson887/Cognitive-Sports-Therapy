import Head from 'next/head';
import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to your tRPC starter!</h1>

      <Link href={`/user`}>
            <a>Add/View Users</a>
      </Link>
      <br/>
      <Link href={`/post`}>
            <a>Add/view posts</a>
      </Link>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
