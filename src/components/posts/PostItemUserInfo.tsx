import { ComponentProps } from 'react';

import { IconLabel } from '@/components/core/IconLabel';
import { PostVariant } from '@/lib/types';
import { getUserInitials, readableCreatedDate } from '@/lib/utils';
import { Avatar } from '@postbee/postbee-ui-lib';
import { clsx } from 'clsx';
import Link from 'next/link';

interface IPostItemUserInfo {
  userId: string;
  username: string;
  displayName: string;
  avatarSrc?: string;
  date?: Date;
  variant?: PostVariant;
}

export function PostItemUserInfo({
  userId,
  username,
  displayName,
  avatarSrc,
  date,
  variant = 'Default',
}: IPostItemUserInfo) {
  const avatarProps: ComponentProps<typeof Avatar> = {
    alt: `${displayName}'s avatar`,
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
        prefetch={false}
      >
        {variant === 'Reply' && <Avatar {...avatarProps} />}
        <div className="flex flex-col gap-xs hover:brightness-75 transition-all duration-300">
          <div
            className={clsx(
              'truncate max-w-50 xs:max-w-80 sm:max-w-none',
              variant === 'Reply' ? 'pb-label-md' : 'pb-label-lg',
            )}
          >
            {displayName ?? username}
          </div>

          <div className="flex flex-wrap gap-sm items-center">
            {username && (
              <IconLabel colorClassName="text-primary" icon="profile">
                {username}
              </IconLabel>
            )}

            {date && (
              <IconLabel colorClassName="text-secondary-500" icon="time">
                {readableCreatedDate(date)}
              </IconLabel>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
