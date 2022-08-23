import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function IndexPage() {
  const menu = [
    'user',
    'community',
    'diary',
    'sponsor',
    'role',
    'article',
    'audio',
    'workout',
    'programme',
    'video',
  ];
  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 p-4 shadow rounded-xl justify-center">
        <label className="text-2xl pb-10">Admin Panel</label>
        {menu.map((option, index) => (
          <Link key={index} href={`/${option}`}>
            <a className="mb-2 shadow rounded-md m-2 p-4 hover:bg-green-200 mx-auto">
              Add/View {option}
            </a>
          </Link>
        ))}
      </div>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
