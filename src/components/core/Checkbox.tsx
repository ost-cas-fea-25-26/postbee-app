import * as React from 'react';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> & {
  label?: string;
  id?: string;
};

export function Checkbox({ className = '', label, id, ...props }: CheckboxProps) {
  return (
    <div className={['flex items-center', className].join(' ')}>
      <RadixCheckbox.Root
        className="flex size-md appearance-none items-center justify-center rounded-sm cursor-pointer bg-white border outline-none hover:bg-primary-50 focus:border-primary focus:border-2"
        id={id}
        {...props}
      >
        <RadixCheckbox.Indicator className="text-primary">
          <CheckIcon width={20} height={20} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="ml-xs text-[15px] leading-none select-none cursor-pointer" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
