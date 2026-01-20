import { Suspense } from 'react';

import { SkeletonPost } from '@/components/skeleton';

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
      {/* satisfying the a11y requirement of having a h1 on the page */}
      <h1 className="pb-h2 text-primary mb-lg">Welcome to Mumble</h1>
      <Suspense fallback={<SkeletonPost count={15} />}>
        <HomeContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
