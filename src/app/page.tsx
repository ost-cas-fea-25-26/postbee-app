import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { getSession } from '@/lib/auth';
import Image from 'next/image';

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex flex-col items-center justify-center">
      <Image src="/images/PostBee-Logo.png" alt="Logo" width={200} height={200} loading="eager" />
      {session?.user ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>
          <div>
            <LogoutButton />
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
