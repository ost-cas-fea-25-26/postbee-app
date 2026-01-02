'use client';

import { useState } from 'react';

import { updateAvatar } from '@/actions/user';
import { IconLabel } from '@/components/core/IconLabel';
import { AvatarUploadDialog } from '@/components/profile/AvatarUploadDialog';
import { getUserInitials } from '@/lib/utils';
import { Avatar, Heading } from '@postbee/postbee-ui-lib';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function ProfileHeader({
  username,
  displayName,
  avatarUrl,
  isMe,
}: {
  avatarUrl: string;
  username: string;
  displayName: string;
  isMe: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    setOpen(true);
  };

  const handleSubmit = async (files: File[]) => {
    if (files.length > 0) {
      setLoading(true);
      try {
        await updateAvatar(files[0]);
        setOpen(false);
        router.refresh();
      } catch (error) {
        console.error('Failed to update avatar:', error);
        toast.error('Failed to update avatar');
      } finally {
        setLoading(false);
      }
    }
  };

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
          <Avatar
            src={avatarUrl ?? ''}
            size="xl"
            alt={`${displayName}'s avatar`}
            fallback={getUserInitials(displayName ?? username)}
            isEditable={isMe}
            onEdit={isMe ? handleEdit : undefined}
          />
        </div>
        <div className="absolute bottom-4 right-6 block sm:hidden">
          <Avatar
            src={avatarUrl ?? ''}
            size="lg"
            alt={`${displayName}'s avatar`}
            fallback={getUserInitials(displayName ?? username)}
            isEditable={isMe}
            onEdit={isMe ? handleEdit : undefined}
          />
        </div>
      </div>
      <div className="mt-md">
        <Heading level={3}>{displayName}</Heading>
        <IconLabel colorClassName="text-primary" icon="profile">
          {username}
        </IconLabel>
      </div>
      <AvatarUploadDialog
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        loading={loading}
        maxSize={524288}
      />
    </div>
  );
}
