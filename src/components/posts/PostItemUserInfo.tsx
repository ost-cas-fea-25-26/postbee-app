import { ComponentProps, ReactNode } from 'react';

import { IconLabel } from '@/components/core/IconLabel';
import { readableCreatedDate } from '@/lib/utils';
import { Label } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

interface IPostItemUserInfo {
  userId: string;
  username: string;
  displayName: string;
  postDate: Date;
  trailing?: ReactNode;
}

export const PostItemUserInfo = ({ userId, username, displayName, postDate, trailing }: IPostItemUserInfo) => {
  const labelProps: ComponentProps<typeof Label> = {
    size: 'lg',
    children: displayName ?? username,
  };

  return (
    <div className="flex justify-between items-center w-full">
      <Link
        href={`/profile/${userId}/mumbles`}
        className="relative flex place-items-center gap-xs rounded-sm **:cursor-pointer"
        data-testid="mumble-user-info"
      >
        <div className="flex flex-col gap-xs">
          <Label {...labelProps} className="max-w-[150px] truncate capitalize sm:max-w-none" />

          <div className="flex flex-wrap gap-sm items-center">
            {username && (
              <IconLabel colorClassName="text-primary" icon="profile">
                {username}
              </IconLabel>
            )}

            {postDate && (
              <IconLabel colorClassName="text-secondary-400" icon="time">
                {readableCreatedDate(postDate)}
              </IconLabel>
            )}
          </div>
        </div>
      </Link>
      {trailing && <div className="ml-sm">{trailing}</div>}
    </div>
  );
};
