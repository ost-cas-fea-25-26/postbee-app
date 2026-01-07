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
        className="flex size-[25px] appearance-none items-center justify-center rounded bg-white border outline-none hover:bg-primary-50 focus:shadow-[0_0_0_2px_black]"
        id={id}
        {...props}
      >
        <RadixCheckbox.Indicator className="text-primary">
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="pl-[15px] text-[15px] leading-none select-none cursor-pointer" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
