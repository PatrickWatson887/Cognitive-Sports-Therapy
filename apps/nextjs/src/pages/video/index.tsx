import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  title: string;
  video_url: string;
};

export default function IndexPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const utils = trpc.useContext();

  const videoQuery = trpc.useQuery(['videos.all']);
  const addVideo = trpc.useMutation('videos.add', {
    onSettled() {
      return utils.invalidateQuery(['videos.all']);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await addVideo.mutateAsync(data);
    } catch {}
  };

  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl">
        <h2 className="mx-auto">
          Sponsors
          {videoQuery.status === 'loading' && '(loading)'}
        </h2>
        {videoQuery.data?.map((item) => (
          <article key={item.uuid}>
            <h3>{item.title}</h3>
            <Link href={`/video/${item.uuid}`}>
              <a>View more</a>
            </Link>
          </article>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a Video</label>
          <label>Title</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('title')}
          />
          <label>Video URL</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('video_url')}
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
