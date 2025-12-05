import { ComponentProps } from 'react';

import { IconLabel } from '@/components/core/IconLabel';
import { readableCreatedDate } from '@/lib/utils';
import { Avatar, Label } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

interface ICommentItemUserInfo {
  username: string;
  displayName: string;
  avatar?: string;
  commentDate?: Date;
}

export const CommentItemUserInfo = ({ username, displayName, avatar, commentDate }: ICommentItemUserInfo) => {
  const avatarProps: ComponentProps<typeof Avatar> = {
    alt: displayName,
    src: avatar,
    size: 'sm',
  };

  const labelProps: ComponentProps<typeof Label> = {
    size: 'md',
    children: displayName,
  };

  return (
    <Link
      href={'#TODO'}
      className="duration-300 relative flex items-center gap-xs rounded-s transition-all hover:scale-105"
      data-testid="mumble-user-info"
      aria-label={`User info for ${displayName}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Avatar {...avatarProps} />
      <div className="flex flex-col gap-xs">
        <Label {...labelProps} className="max-w-[150px] truncate capitalize sm:max-w-none" />
        <div className="flex flex-wrap gap-s items-center text-sm text-muted-foreground">
          {username && (
            <IconLabel color="primary" icon="profile">
              {username}
            </IconLabel>
          )}

          {commentDate && (
            <>
              <IconLabel color="secondary-400" icon="time">
                {readableCreatedDate(commentDate)}
              </IconLabel>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
