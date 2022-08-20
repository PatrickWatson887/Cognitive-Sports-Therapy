import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  title: string;
  image_url: string;
  author: string;
  video_url: string;
  length: string;
  description: string;
};

export default function IndexPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const utils = trpc.useContext();

  const workoutQuery = trpc.useQuery(['workouts.all']);
  const addWorkout = trpc.useMutation('workouts.add', {
    onSettled() {
      return utils.invalidateQuery(['workouts.all']);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await addWorkout.mutateAsync(data);
    } catch {}
  };

  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl">
        <h2 className="mx-auto">
          Workouts
          {workoutQuery.status === 'loading' && '(loading)'}
        </h2>
        {workoutQuery.data?.map((item) => (
          <article key={item.uuid}>
            <h3>{item.title}</h3>
            <Link href={`/workout/${item.uuid}`}>
              <a>View more</a>
            </Link>
          </article>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a workout</label>
          <label>Title</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('title')}
          />
          <label>Image Url</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('image_url')}
          />
          <label>Video Url</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('video_url')}
          />
          <label>Author</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('author')}
          />
          <label>Length</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('length')}
          />
          <label>Description</label>
          <textarea
            className="border border-2 mb-4 rounded-md"
            {...register('description')}
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
