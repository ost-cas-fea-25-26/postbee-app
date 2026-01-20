'use client';

import { useState } from 'react';

import { AppUser } from '@/lib/types';
import { HeaderButton } from '@postbee/postbee-ui-lib';

import { UserSettingsModal } from './UserSettingsModal';

type UserSettingsButtonProps = {
  user: AppUser;
};

export function UserSettingsButton({ user }: UserSettingsButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HeaderButton icon="settings" iconAnimation="rotate" text="Settings" onClick={() => setIsModalOpen(true)} />
      <UserSettingsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} />
    </>
  );
}
