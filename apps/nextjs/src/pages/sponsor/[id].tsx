import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  title: string;
  address: string;
  description: string;
  sponsor_uuid: string;
};

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const sponsorQuery = trpc.useQuery(['sponsors.byUuid', uuid]);
  const utils = trpc.useContext();
  const addResource = trpc.useMutation('resources.add', {
    onSettled() {
      return utils.invalidateQuery(['sponsors.byUuid']);
    },
  });

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.sponsor_uuid = uuid;
    try {
      await addResource.mutateAsync(data);
    } catch {}
  };

  if (sponsorQuery.error) {
    const statusCode = sponsorQuery.error.data?.httpStatus ?? 500;
    return (
      <NextError title={sponsorQuery.error.message} statusCode={statusCode} />
    );
  }
  if (sponsorQuery.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{sponsorQuery.data?.title}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(sponsorQuery.data ?? null, null, 4)}</pre>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a resource</label>
          <label>Title</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('title')}
          />
          <label>Address</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('address')}
          />
          <label>Description</label>
          <textarea
            className="border border-2 mb-4 rounded-md"
            {...register('description')}
          />
          <input className="bg-green-200 rounded-md" type="submit" />
        </div>
      </form>
    </>
  );
}
