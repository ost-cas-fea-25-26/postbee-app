import { Suspense } from 'react';

import { Heading } from '@postbee/postbee-ui-lib';

import { Dashboard } from './_dashboard';

interface Props {
  searchParams: Promise<{
    tags: string;
    likedBy: string;
    creators: string;
  }>;
}

export default function Home({ searchParams }: Props) {
  return (
    <>
      <Heading level={2} className="text-primary">
        Willkommen auf Mumble
      </Heading>
      <Suspense>
        <Dashboard searchParams={searchParams} />
      </Suspense>
    </>
  );
}
