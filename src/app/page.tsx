import { getSession } from '@/lib/auth';
import { Heading } from '@postbee/postbee-ui-lib';

import { Dashboard } from './_dashboard';

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <Heading level={2} className="text-primary">
        Willkommen auf Mumble
      </Heading>
      <Dashboard session={session} />
    </>
  );
}
