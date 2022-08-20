import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

type FormValues = {
  title: string;
  image_url: string;
  author: string;
  length: string;
  start_date: Date;
  end_date: Date;
};

export default function IndexPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const utils = trpc.useContext();

  const programmeQuery = trpc.useQuery(['programmes.all']);
  const addProgramme = trpc.useMutation('programmes.add', {
    onSettled() {
      return utils.invalidateQuery(['programmes.all']);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.start_date = startDate;
    data.end_date = endDate;

    try {
      await addProgramme.mutateAsync(data);
    } catch {}
  };

  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl">
        <h2 className="mx-auto">
          Programmes
          {programmeQuery.status === 'loading' && '(loading)'}
        </h2>
        {programmeQuery.data?.map((item) => (
          <article key={item.uuid}>
            <h3>{item.title}</h3>
            <Link href={`/programme/${item.uuid}`}>
              <a>View more</a>
            </Link>
          </article>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a programme</label>
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
          <label>Start Date</label>
          <DatePicker
            className="border border-2 mb-4 rounded-md"
            selected={startDate}
            {...register('start_date')}
            onChange={(date: Date) => setStartDate(date)}
          />
          <label>End Date</label>
          <DatePicker
            className="border border-2 mb-4 rounded-md"
            selected={endDate}
            {...register('end_date')}
            onChange={(date: Date) => setEndDate(date)}
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
