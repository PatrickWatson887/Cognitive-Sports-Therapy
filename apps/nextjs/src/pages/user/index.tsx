import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../../utils/trpc';
import uuid from 'react-native-uuid';


export default function IndexPage() {
  const utils = trpc.useContext();

  const usersQuery = trpc.useQuery(['users.all']);
  const addUser = trpc.useMutation('users.add', {
    onSettled() {
      return utils.invalidateQuery(['users.all']);
    },
  });

  const addCredential = trpc.useMutation('credentials.add');

  return (
    <>
      <h2>
        Users
        {usersQuery.status === 'loading' && '(loading)'}
      </h2>
      {usersQuery.data?.map((item) => (
        <article key={item.id}>
          <h3>{item.name}</h3>
          <Link href={`/user/${item.id}`}>
            <a>View more</a>
          </Link>
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          /**
           * In a real app you probably don't want to use this manually
           * Checkout React Hook Form - it works great with tRPC
           * @link https://react-hook-form.com/
           */
          const userUuid = uuid.v4() as string

          const $email: HTMLInputElement = (e as any).target.elements.email;
          const $role: HTMLInputElement = (e as any).target.elements.role;

          const $password: HTMLInputElement = (e as any).target.elements.password;
          const $username: HTMLInputElement = (e as any).target.elements.username;

          const inputCredentials = {
            id: userUuid,
            password: $password.value,
            username: $username.value,
          };
          try {
            await addCredential.mutateAsync(inputCredentials);
            $password.value = '';
          } catch {}

          const inputUser = {
            id: userUuid,
            name: $username.value,
            email: $email.value,
            role: $role.value

          };
          try {
            await addUser.mutateAsync(inputUser);
            $email.value = '';
            $role.value = '';
            $username.value = ''
          } catch {}


        }}
      >
        <br/>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          id="email"
          name="email"
          type="text"
          disabled={addUser.isLoading}
        />
        <br/>
        <label htmlFor="role">Role:</label>
        <br />
        <input
          id="role"
          name="role"
          type="text"
          disabled={addUser.isLoading}
        />
        <br/>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          id="username"
          name="username"
          type="text"
          disabled={addCredential.isLoading}
        />
        <br/>
        <label htmlFor="password">Password:</label>
        <br/>
        <input
          id="password"
          name="password"
          type="text"
          disabled={addCredential.isLoading}
        />
        <br/>
        <input type="submit" disabled={addUser.isLoading || addCredential.isLoading} />
        {addUser.error && (
          <p style={{ color: 'red' }}>{addUser.error.message}</p>
        )}
      </form>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
