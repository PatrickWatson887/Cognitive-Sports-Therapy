import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  title: string;
  total_members: string;
};

export default function IndexPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const utils = trpc.useContext();

  const sponsorQuery = trpc.useQuery(['sponsors.all']);
  const addUniversity = trpc.useMutation('sponsors.add', {
    onSettled() {
      return utils.invalidateQuery(['sponsors.all']);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await addUniversity.mutateAsync(data);
    } catch {}
  };

  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl">
        <h2 className="mx-auto">
          Sponsors
          {sponsorQuery.status === 'loading' && '(loading)'}
        </h2>
        {sponsorQuery.data?.map((item) => (
          <>
            <article key={item.uuid}>
              <h3>{item.title}</h3>
              <Link href={`/sponsor/${item.uuid}`}>
                <a>View more</a>
              </Link>
            </article>
            <br />
          </>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a sponsor</label>
          <label>Title</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('title')}
          />
          <label>Total Members</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('total_members')}
          />
          <input className="bg-green-200 rounded-md" type="submit" />
        </div>
      </form>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
