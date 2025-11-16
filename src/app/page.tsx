import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { getPostList } from '@/lib/api';
import { getSession } from '@/lib/auth';

export default async function Home() {
  const session = await getSession();
  const posts = await getPostList();

  return (
    <main className="flex flex-col items-center justify-center">
      <img src="/images/PostBee-Logo.png" alt="Logo" width="200" />
      {session?.user ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>
          <div>
            <LogoutButton />
          </div>
          <div className="mt-xl">
            <h2>Latest Posts:</h2>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>{post.text}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <div>
            <LoginButton />
          </div>
        </div>
      )}{' '}
    </main>
  );
}
