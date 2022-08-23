import { useRouter } from 'next/dist/client/router';
import { trpc } from 'utils/trpc';
import NextError from 'next/error';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type FormValues = {
  to_do_date_time: Date;
  programme_uuid: string;
  workout_uuid?: string;
  audio_uuid?: string;
  article_uuid?: string;
};

export default function PostViewPage() {
  const uuid = useRouter().query.id as string;
  const programme = trpc.useQuery(['programmes.byUuid', uuid]);
  const [type, setType] = useState('');

  const [toDoDate, setToDoDate] = useState(new Date());

  const { register, handleSubmit } = useForm<FormValues>();

  const utils = trpc.useContext();

  const addProgrammeSession = trpc.useMutation('programmeSessions.add', {
    onSettled() {
      return utils.invalidateQuery(['programmes.byUuid']);
    },
  });
  const workoutQuery = trpc.useQuery(['workouts.all']);
  const audioQuery = trpc.useQuery(['audios.all']);
  const articleQuery = trpc.useQuery(['articles.all']);

  moment.locale('en-GB');
  const localizer = momentLocalizer(moment);
  const events: any[] | undefined = [];
  programme.data?.programmeSessions.map((session) => {
    if (session.workout) {
      events.push({
        id: session.workout.uuid,
        title: session.workout.title,
        start: session.to_do_date_time,
        end: session.to_do_date_time.setTime(
          session.to_do_date_time.getMinutes() +
            parseFloat(session.workout.length),
        ),
      });
    } else if (session.audio) {
      events.push({
        id: session.audio.uuid,
        title: session.audio.title,
        start: session.to_do_date_time,
        end: session.to_do_date_time.setTime(
          session.to_do_date_time.getMinutes() +
            parseFloat(session.audio.length),
        ),
      });
    } else if (session.article) {
      events.push({
        id: session.article.uuid,
        title: session.article.title,
        start: session.to_do_date_time,
        end: session.to_do_date_time.setTime(
          session.to_do_date_time.getMinutes() +
            parseFloat(session.article.length),
        ),
      });
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (type == 'mind') {
      data.workout_uuid = undefined;
      data.audio_uuid = undefined;
    } else if (type == 'body') {
      data.article_uuid = undefined;
      data.audio_uuid = undefined;
    } else if (type == 'breath') {
      data.article_uuid = undefined;
      data.workout_uuid = undefined;
    }
    data.to_do_date_time = toDoDate;
    data.programme_uuid = uuid;

    try {
      await addProgrammeSession.mutateAsync(data);
    } catch {}
  };
  if (programme.error) {
    const statusCode = programme.error.data?.httpStatus ?? 500;
    return (
      <NextError title={programme.error.message} statusCode={statusCode} />
    );
  }
  if (programme.status === 'loading') {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{programme.data?.title}</h1>

      <h2>Raw data:</h2>
      {/* <pre>{JSON.stringify(events ?? null, null, 4)}</pre> */}
      <pre>{JSON.stringify(programme.data ?? null, null, 4)}</pre>
      <div>
        <BigCalendar
          selectable
          localizer={localizer}
          events={events}
          defaultView={Views.DAY}
          views={[Views.DAY, Views.WEEK, Views.MONTH]}
          step={60}
          defaultDate={new Date()}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a session</label>
          <label>To Do On</label>
          <DatePicker
            className="border border-2 mb-4 rounded-md"
            selected={toDoDate}
            {...register('to_do_date_time')}
            onChange={(date: Date) => setToDoDate(date)}
          />
          <label>Type</label>
          <select
            className="border border-2 mb-4 rounded-md"
            onChange={(e) => {
              setType(e.currentTarget.value);
            }}
          >
            <option value="">Select...</option>
            <option value="mind">Mind</option>
            <option value="body">Body</option>
            <option value="breath">Breath</option>
          </select>
          {type == 'mind' ? (
            <>
              <label>Mind</label>
              <select
                className="border border-2 mb-4 rounded-md"
                {...register('article_uuid')}
              >
                <option value="">Select...</option>
                {articleQuery.data?.map((article) => (
                  <option key={article.uuid} value={article.uuid}>
                    {article.title}
                  </option>
                ))}
              </select>
            </>
          ) : null}
          {type == 'body' ? (
            <>
              <label>Body</label>
              <select
                className="border border-2 mb-4 rounded-md"
                {...register('workout_uuid')}
              >
                <option value="">Select...</option>
                {workoutQuery.data?.map((workout) => (
                  <option key={workout.uuid} value={workout.uuid}>
                    {workout.title}
                  </option>
                ))}
              </select>
            </>
          ) : null}
          {type == 'breath' ? (
            <>
              <label>Breath</label>
              <select
                className="border border-2 mb-4 rounded-md"
                {...register('audio_uuid')}
              >
                <option value="">Select...</option>
                {audioQuery.data?.map((audio) => (
                  <option key={audio.uuid} value={audio.uuid}>
                    {audio.title}
                  </option>
                ))}
              </select>
            </>
          ) : null}

          <input className="bg-green-200 rounded-md" type="submit" />
        </div>
      </form>
    </>
  );
}
