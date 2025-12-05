import React, { ComponentProps, ReactNode } from 'react';

import { readableCreatedDate } from '@/lib/utils';
import { Icon, Label } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

interface IPostItemUserInfo {
  username: string;
  displayName: string;
  postDate: Date;
  trailing?: ReactNode;
}

export const PostItemUserInfo = ({ username, displayName, postDate, trailing }: IPostItemUserInfo) => {
  const labelProps: ComponentProps<typeof Label> = {
    size: 'md',
    children: displayName ?? username,
  };

  return (
    <div className="flex justify-between items-center w-full">
      <Link
        href={'#TODO'}
        className="duratin-300 relative flex place-items-center gap-xs rounded-sm transition-all hover:scale-105"
        data-testid="mumble-user-info"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-xs">
          <Label {...labelProps} className="max-w-[150px] truncate capitalize sm:max-w-none" />
          <div className="flex flex-wrap gap-sm items-center">
            {username && (
              <span className="flex flex-wrap gap-xs items-center text-primary">
                <Icon icon={'profile'} size={12} />
                {username}
              </span>
            )}

            {postDate && (
              <>
                <span className="flex flex-wrap gap-xs items-center text-secondary">
                  <Icon icon={'time'} size={12} />
                  {readableCreatedDate(postDate)}
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
      {trailing && <div className="ml-4">{trailing}</div>}
    </div>
  );
};
