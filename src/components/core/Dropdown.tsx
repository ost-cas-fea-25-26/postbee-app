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
  'data-testid'?: string;
};

type DropdownProps = {
  trigger?: React.ReactNode;
  actions: DropdownAction[];
  sideOffset?: number;
  'data-testid'?: string;
};

export function Dropdown({ trigger, actions, sideOffset = 8, 'data-testid': dataTestId }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger ?? (
          <button
            aria-label="Open menu options"
            className="p-xs rounded-md shadow hover:bg-secondary-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
            data-testid={dataTestId}
          >
            {/* Default trigger icon could go here, or leave empty */}
            <Icon icon="settings" color="secondary" />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-white rounded-lg shadow-xl p-xs flex flex-col gap-xxs"
          sideOffset={sideOffset}
        >
          {actions.map(({ label, onSelect, icon, variant, 'data-testid': dataTestId }, i) => (
            <DropdownMenu.Item
              key={i}
              className={clsx(
                'flex items-center gap-xs p-xs rounded-lg cursor-pointer hover:bg-secondary-100 focus:bg-secondary-100',
                `${variant === 'error' ? 'text-error ' : ''}`,
              )}
              onSelect={onSelect}
              data-testid={dataTestId}
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
