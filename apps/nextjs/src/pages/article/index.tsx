import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

type FormValues = {
  title: string;
  image_url: string;
  author: string;
  length: string;
  body: string;
};

export default function IndexPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const utils = trpc.useContext();
  const [file, setFile] = useState<any>();

  const articleQuery = trpc.useQuery(['articles.all']);
  const addArticle = trpc.useMutation('articles.add', {
    onSettled() {
      return utils.invalidateQuery(['articles.all']);
    },
  });

  const uploadFile = async () => {
    const { data } = await axios.post('api/aws/s3', {
      name: file.name,
      type: file.type,
    });
    const options = {
      headers: {
        'Content-Type': file.type,
        'Access-Control-Allow-Origin': '*',
      },
    };

    const url = data.url;
    await axios.put(url, file, options);
    // setFile(null);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await uploadFile();
      await addArticle.mutateAsync({
        title: data.title,
        image_url: '',
        author: data.author,
        length: data.length,
        body: data.body,
      });
    } catch {}
  };

  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl">
        <h2 className="mx-auto">
          Articles
          {articleQuery.status === 'loading' && '(loading)'}
        </h2>
        {articleQuery.data?.map((item) => (
          <article key={item.uuid}>
            <h3>{item.title}</h3>
            <Link href={`/article/${item.uuid}`}>
              <a>View more</a>
            </Link>
          </article>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add an article</label>
          <label>Title</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('title')}
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
          <label>Body</label>
          <textarea
            className="border border-2 mb-4 rounded-md"
            {...register('body')}
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
