'use client';

import React from 'react';

import { Icon, IconName } from '@postbee/postbee-ui-lib';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

export type DropdownAction = {
  label: string;
  onSelect: () => void | Promise<void>;
  icon: IconName;
  variant?: 'default' | 'error';
};

export type DropdownProps = {
  trigger?: React.ReactNode;
  actions: DropdownAction[];
  sideOffset?: number;
};

export function Dropdown({ trigger, actions, sideOffset = 8 }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger ?? (
          <button aria-label="Open menu options" className="p-xs rounded-md shadow hover:bg-secondary-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500">
            {/* Default trigger icon could go here, or leave empty */}
            <Icon icon="settings" color="secondary" />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-white rounded-xl shadow p-xs flex flex-col gap-xxs"
          sideOffset={sideOffset}
        >
          {actions.map(({ label, onSelect, icon, variant }, i) => (
            <DropdownMenu.Item
              key={i}
              className={clsx(
                'flex items-center gap-xs p-xs rounded-lg cursor-pointer hover:bg-secondary-100 focus:bg-secondary-100',
                `${variant === 'error' ? 'text-error ' : ''}`,
              )}
              onSelect={onSelect}
            >
              <Icon icon={icon} />
              {label}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
