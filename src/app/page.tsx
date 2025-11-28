import { Suspense } from 'react';

import { Heading } from '../components/postbee-ui-client';
import { Dashboard } from './_dashboard';

export default async function Home() {
  return (
    <>
      <Heading level={2} className="text-primary">
        Willkommen auf Mumble
      </Heading>
      <Suspense>
        <Dashboard />
      </Suspense>
    </>
  );
}
