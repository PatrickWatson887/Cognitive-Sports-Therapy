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

  const communityQuery = trpc.useQuery(['communities.all']);
  const addCommunity = trpc.useMutation('communities.add', {
    onSettled() {
      return utils.invalidateQuery(['communities.all']);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await addCommunity.mutateAsync(data);
    } catch {}
  };

  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl">
        <h2 className="mx-auto">
          Communities
          {communityQuery.status === 'loading' && '(loading)'}
        </h2>
        {communityQuery.data?.map((item) => (
          <>
            <article key={item.uuid}>
              <h3>{item.title}</h3>
              <Link href={`/community/${item.uuid}`}>
                <a>View more</a>
              </Link>
            </article>
            <br />
          </>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a community</label>
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
