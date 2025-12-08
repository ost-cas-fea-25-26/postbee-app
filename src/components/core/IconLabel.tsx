import { Icon, IconProps, LabelProps } from '@postbee/postbee-ui-lib';
import clsx from 'clsx';

interface IconLabelProps {
  children: LabelProps['children'];
  icon: IconProps['icon'];
  iconSize?: IconProps['size'];
  colorClassName?: string;
  labelSize?: LabelProps['size'];
}

export const IconLabel = ({ children, icon, iconSize, colorClassName, labelSize = 'sm' }: IconLabelProps) => {
  return (
    <div className={clsx('inline-flex flex-wrap gap-xxs items-center', colorClassName)}>
      <Icon icon={icon} size={iconSize ?? 12} />
      <span className={clsx(colorClassName, `pb-label-${labelSize}`)}>{children}</span>
    </div>
  );
};
