'use client';

import { TabItem, Tabs } from '@postbee/postbee-ui-lib';
import { useParams, useRouter, useSelectedLayoutSegment } from 'next/navigation';

export function ProfileTabs() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const segment = useSelectedLayoutSegment(); // 'mumbles' | 'likes' | null

  const userId = params?.id;
  const activeTab = segment === 'likes' ? 'likes' : 'mumbles';

  const tabs: TabItem[] = [
    {
      text: 'Your Mumbles',
      value: 'mumbles',
    },
    {
      text: 'Your Likes',
      value: 'likes',
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      value={activeTab}
      onValueChange={(val) => {
        if (!userId) {
          return;
        }
        router.push(`/profile/${userId}/${val}`);
      }}
    />
  );
}
