import { Icon, IconProps, Label, LabelProps } from '@postbee/postbee-ui-lib';
import clsx from 'clsx';

interface IconLabelProps {
  children: LabelProps['children'];
  icon: IconProps['icon'];
  iconSize?: IconProps['size'];
  colorClassName?: string;
  labelSize?: LabelProps['size'];
}

export const IconLabel = ({ children, icon, iconSize, colorClassName, labelSize }: IconLabelProps) => {
  return (
    <div className={clsx('inline-flex flex-wrap gap-xxs items-center', colorClassName)}>
      <Icon icon={icon} size={iconSize ?? 12} />
      <Label className={clsx(colorClassName)} size={labelSize ?? 'sm'}>
        {children}
      </Label>
    </div>
  );
};
