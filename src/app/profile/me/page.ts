import { getSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function ProfileMePage() {
  const session = await getSession();

  if (!session?.user?.identifier) {
    redirect('/');
  }

  redirect(`/profile/${session.user.identifier}/mumbles`);
}
