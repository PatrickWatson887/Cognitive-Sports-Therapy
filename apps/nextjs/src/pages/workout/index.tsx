import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type FormValues = {
  title: string;
  image_url: string;
  author: string;
  length: string;
  description: string;
  video_uuid: string;
};

export default function IndexPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const utils = trpc.useContext();
  const [file, setFile] = useState<any>();

  const workoutQuery = trpc.useQuery(['workouts.all']);
  const addWorkout = trpc.useMutation('workouts.add', {
    onSettled() {
      return utils.invalidateQuery(['workouts.all']);
    },
  });

  const videoQuery = trpc.useQuery(['videos.all']);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      data.image_url = '';
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
          <label>Image</label>
          <input
            type="file"
            className="border border-2 mb-4 rounded-md"
            {...register('image_url')}
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              setFile(e.target.files![0]);
            }}
          />
          <label>Video</label>
          <select
            className="border border-2 mb-4 rounded-md"
            {...register('video_uuid')}
          >
            <option value="">Select...</option>
            {videoQuery.data?.map((video) => (
              <option key={video.uuid} value={video.uuid}>
                {video.title}
              </option>
            ))}
          </select>
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
