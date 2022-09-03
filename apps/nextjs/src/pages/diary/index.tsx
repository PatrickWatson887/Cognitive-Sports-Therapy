import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type FormValues = {
  title: string;
  description: string;
  image_url: string;
};

export default function IndexPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const utils = trpc.useContext();
  const [file, setFile] = useState<any>();

  const diaryQuery = trpc.useQuery(['diaries.all']);
  const addDiary = trpc.useMutation('diaries.add', {
    onSettled() {
      return utils.invalidateQuery(['diaries.all']);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      data.image_url = '';
      await addDiary.mutateAsync(data);
    } catch {}
  };

  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl">
        <h2 className="mx-auto">
          Diaries
          {diaryQuery.status === 'loading' && '(loading)'}
        </h2>
        {diaryQuery.data?.map((item) => (
          <>
            <article key={item.uuid}>
              <h3>{item.title}</h3>
              <Link href={`/diary/${item.uuid}`}>
                <a>View more</a>
              </Link>
            </article>
            <br />
          </>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a diary</label>
          <label>Title</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('title')}
          />
          <label>Description</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('description')}
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
          <input className="bg-green-200 rounded-md" type="submit" />
        </div>
      </form>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
