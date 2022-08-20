import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';
import uuid from 'react-native-uuid';

type FormValues = {
  uuid: string;
  username: string;
  email: string;
  address: string;
  phone_number: string;
  university_uuid: string;
  community_uuid: string;
  diary_uuid: string;
  role_uuid: string;
  password: string;
};

export default function IndexPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const utils = trpc.useContext();

  const userQuery = trpc.useQuery(['users.all']);
  const addUser = trpc.useMutation('users.add', {
    onSettled() {
      return utils.invalidateQuery(['users.all']);
    },
  });
  const addCredential = trpc.useMutation('credentials.add');

  const universityQuery = trpc.useQuery(['universities.all']);
  const diaryQuery = trpc.useQuery(['diaries.all']);
  const communityQuery = trpc.useQuery(['communities.all']);
  const roleQuery = trpc.useQuery(['roles.all']);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const userUuid = uuid.v4() as string;
    try {
      await addUser.mutateAsync({
        uuid: userUuid,
        username: data.username,
        email: data.email,
        address: data.address,
        phone_number: data.phone_number,
        university_uuid: data.university_uuid,
        community_uuid: data.community_uuid,
        diary_uuid: data.diary_uuid,
        role_uuid: data.role_uuid,
      });
      await addCredential.mutateAsync({
        uuid: userUuid,
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <>
      <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl">
        <h2 className="mx-auto">
          Users
          {userQuery.status === 'loading' && '(loading)'}
        </h2>
        {userQuery.data?.map((item) => (
          <article key={item.uuid}>
            <h3>{item.username}</h3>
            <Link href={`/user/${item.uuid}`}>
              <a>View more</a>
            </Link>
          </article>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-column-1 mx-auto w-1/3 shadow p-4 rounded-xl justify-center">
          <label className="mx-auto">Add a user</label>
          <label>Username</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('username')}
          />
          <label>Password</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('password')}
          />
          <label>Email</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('email')}
          />
          <label>Address</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('address')}
          />
          <label>Phone Number</label>
          <input
            className="border border-2 mb-4 rounded-md"
            {...register('phone_number')}
          />
          <label>University</label>
          <select
            className="border border-2 mb-4 rounded-md"
            {...register('university_uuid')}
          >
            <option value="">Select...</option>
            {universityQuery.data?.map((university) => (
              <option key={university.uuid} value={university.uuid}>
                {university.title}
              </option>
            ))}
          </select>
          <label>Diary</label>
          <select
            className="border border-2 mb-4 rounded-md"
            {...register('diary_uuid')}
          >
            <option value="">Select...</option>
            {diaryQuery.data?.map((diary) => (
              <option key={diary.uuid} value={diary.uuid}>
                {diary.title}
              </option>
            ))}
          </select>
          <label>Community</label>
          <select
            className="border border-2 mb-4 rounded-md"
            {...register('community_uuid')}
          >
            <option value="">Select...</option>
            {communityQuery.data?.map((community) => (
              <option key={community.uuid} value={community.uuid}>
                {community.title}
              </option>
            ))}
          </select>
          <label>Role</label>
          <select
            className="border border-2 mb-4 rounded-md"
            {...register('role_uuid')}
          >
            <option value="">Select...</option>
            {roleQuery.data?.map((role) => (
              <option key={role.uuid} value={role.uuid}>
                {role.title}
              </option>
            ))}
          </select>
          <input className="bg-green-200 rounded-md" type="submit" />
        </div>
      </form>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
