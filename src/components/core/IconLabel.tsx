import React from 'react';

import { Icon, IconProps, Label, LabelProps } from '@postbee/postbee-ui-lib';
import clsx from 'clsx';

interface IconLabelProps {
  children: LabelProps['children'];
  icon: IconProps['icon'];
  iconSize?: IconProps['size'];
  color?: string;
  labelSize?: LabelProps['size'];
}

export const IconLabel = ({ children, icon, iconSize, color, labelSize }: IconLabelProps) => {
  return (
    <div className={clsx('inline-flex flex-wrap gap-xxs items-center ', `text-${color}`)}>
      <Icon icon={icon} size={iconSize ?? 12} />
      <Label className={`text-${color}`} size={labelSize ?? 'sm'}>
        {children}
      </Label>
    </div>
  );
};
