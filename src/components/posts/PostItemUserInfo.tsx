import { ComponentProps } from 'react';

import { readableCreatedDate } from '@/lib/utils';
import { Avatar, Icon, Label } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

interface IPostItemUserInfo {
  user: unknown;
  postDate: Date;
}

export const PostItemUserInfo = ({ postDate, user }: IPostItemUserInfo) => {
  const displayName = user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : null;
  const username = user?.username;

  const avatarProps: ComponentProps<typeof Avatar> = {
    alt: '',
    src: user.avatarUrl,
    width: 100,
    height: 100,
  };

  const labelProps: ComponentProps<typeof Label> = {
    size: 'md',
    children: displayName ?? username,
  };

  return (
    <Link
      href={'#TODO'}
      className="duratin-300 relative flex place-items-center gap-xs  rounded-sm transition-all hover:scale-105"
      data-testid="mumble-user-info"
    >
      <div className="flex flex-col gap-xs">
        <Label {...labelProps} className="max-w-[150px] truncate capitalize sm:max-w-none" />
        <div className="flex flex-wrap gap-sm items-center">
          <Icon icon={'profile'} size={12} />
          {username}

          <Icon icon={'time'} size={12} />
          {readableCreatedDate(postDate)}
        </div>
      </div>
    </Link>
  );
};
