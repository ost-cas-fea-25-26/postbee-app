import { Suspense } from 'react';

import { ScrollToTop } from '@/components/core/ScrollToTop';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      {children}
    </>
  );
}
