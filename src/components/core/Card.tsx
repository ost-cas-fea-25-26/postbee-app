import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  role?: string;
  tabIndex?: number;
  'data-testid'?: string;
}

export const Card = ({
  children,
  className = '',
  onClick,
  onKeyDown,
  role,
  tabIndex,
  'data-testid': dataTestId,
}: CardProps) => {
  return (
    <div
      data-testid={dataTestId ?? 'mumble-card'}
      className={clsx(
        'relative h-fit w-full items-center rounded-lg bg-white px-xl py-md sm:py-lg sm:pr-xl',
        { 'cursor-pointer': !!onClick },
        className,
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};
