import { Suspense } from 'react';

import { SkeletonPost } from '@/components/skeleton';
import { Heading } from '@postbee/postbee-ui-lib';

import { HomeContent } from './_home';

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
      <Heading level={2} className="text-primary mb-lg">
        Welcome to Mumble
      </Heading>
      <Suspense fallback={<SkeletonPost count={15} />}>
        <HomeContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
