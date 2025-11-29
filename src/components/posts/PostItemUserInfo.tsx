import { ComponentProps } from 'react';

import { PublicUser, User } from '@/lib/api/client';
import { readableCreatedDate } from '@/lib/utils';
import { Avatar, Icon, Label } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

interface IPostItemUserInfo {
  user: User;
  postDate: Date;
}

export const PostItemUserInfo = ({ postDate, user }: IPostItemUserInfo) => {
  const username = user?.username ?? '';
  const displayName = user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : username;

  const labelProps: ComponentProps<typeof Label> = {
    size: 'md',
    children: displayName ?? username,
  };

  return (
    <Link
      href={'#TODO'}
      className="duratin-300 relative flex place-items-center gap-xs  rounded-sm transition-all hover:scale-105"
      data-testid="mumble-user-info"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-xs">
        <Label {...labelProps} className="max-w-[150px] truncate capitalize sm:max-w-none" />
        <div className="flex flex-wrap gap-sm items-center">
          {username && (
            <>
              <Icon icon={'profile'} size={12} />
              {username}
            </>
          )}

          {postDate && (
            <>
              <Icon icon={'time'} size={12} />
              {readableCreatedDate(postDate)}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
