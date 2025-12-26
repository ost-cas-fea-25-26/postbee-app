import { ComponentProps } from 'react';

import { IconLabel } from '@/components/core/IconLabel';
import { PostVariant } from '@/lib/types';
import { getUserInitials, readableCreatedDate } from '@/lib/utils';
import { Avatar, Label } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

interface IPostItemUserInfo {
  userId: string;
  username: string;
  displayName: string;
  avatarSrc?: string;
  date?: Date;
  variant?: PostVariant;
}

export const PostItemUserInfo = ({
  userId,
  username,
  displayName,
  avatarSrc,
  date,
  variant = 'Default',
}: IPostItemUserInfo) => {
  const labelProps: ComponentProps<typeof Label> = {
    size: variant === 'Reply' ? 'md' : 'lg',
    children: displayName ?? username,
  };

  const avatarProps: ComponentProps<typeof Avatar> = {
    alt: displayName,
    src: avatarSrc,
    size: 'sm',
    fallback: getUserInitials(displayName),
  };

  return (
    <div className="flex justify-between items-center w-full">
      <Link
        href={`/profile/${userId}/mumbles`}
        className="relative flex place-items-center gap-xs **:cursor-pointer"
        data-testid="mumble-user-info"
        aria-label={`View ${displayName}'s profile`}
      >
        {variant === 'Reply' && <Avatar {...avatarProps} />}
        <div className="flex flex-col gap-xs hover:brightness-75 transition-all duration-300">
          <Label {...labelProps} className="max-w-[250px] truncate capitalize sm:max-w-none" />

          <div className="flex flex-wrap gap-sm items-center">
            {username && (
              <IconLabel colorClassName="text-primary" icon="profile">
                {username}
              </IconLabel>
            )}

            {date && (
              <IconLabel colorClassName="text-secondary-400" icon="time">
                {readableCreatedDate(date)}
              </IconLabel>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
