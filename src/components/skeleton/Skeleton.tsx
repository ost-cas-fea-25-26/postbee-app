import React, { HTMLAttributes } from 'react';

import clsx from 'clsx';

export default function Skeleton({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('mumble-animate-skeleton', className)} {...props}>
      {children ?? <>&nbsp;</>}
    </div>
  );
}
