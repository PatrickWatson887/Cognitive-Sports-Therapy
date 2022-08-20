import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function IndexPage() {
  const menu = [
    'user',
    'community',
    'diary',
    'university',
    'role',
    'article',
    'audio',
    'workout',
    'programme',
  ];
  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 p-4 shadow rounded-xl justify-center">
        <label className="text-2xl pb-10">Admin Panel</label>
        {menu.map((option, index) => (
          <Link key={index} href={`/${option}`}>
            <a className="mb-2">Add/View {option}</a>
          </Link>
        ))}
      </div>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
