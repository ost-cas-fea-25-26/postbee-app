import { getUserInitials } from '@/lib/utils';
import { Avatar, Heading } from '@postbee/postbee-ui-lib';
import Image from 'next/image';

import { IconLabel } from '../core/IconLabel';

export function ProfileHeader({
  username,
  displayName,
  avatarUrl,
}: {
  avatarUrl: string;
  username: string;
  displayName: string;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="h-48 md:h-80 w-full overflow-hidden rounded-lg relative">
          <Image
            src="/images/profile-banner.png"
            alt="Profile banner"
            loading="eager"
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-16 right-6 hidden sm:block">
          <Avatar src={avatarUrl ?? ''} size="xl" fallback={getUserInitials(displayName ?? username)} />
        </div>
        <div className="absolute bottom-4 right-6 block sm:hidden">
          <Avatar src={avatarUrl ?? ''} size="lg" fallback={getUserInitials(displayName ?? username)} />
        </div>
      </div>
      <div className="mt-md">
        <Heading level={3}>{displayName}</Heading>
        <IconLabel colorClassName="text-primary" icon="profile">
          {username}
        </IconLabel>
      </div>
    </div>
  );
}
