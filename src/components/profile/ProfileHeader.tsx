import { getUserInitials } from '@/lib/utils';
import { Avatar, Heading, Icon } from '@postbee/postbee-ui-lib';
import Image from 'next/image';

export default function ProfileHeader({
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
          <Image src="/images/profile-banner.png" alt="Profile banner" loading="eager" fill className="object-cover" />
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
        <div className="mt-xs mb-lg flex items-center">
          <div className="inline-flex text-primary items-center gap-xxs">
            <Icon icon="profile" size={12} />
            {username}
          </div>
        </div>
      </div>
    </div>
  );
}
