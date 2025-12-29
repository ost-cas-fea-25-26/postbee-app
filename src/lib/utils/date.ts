import { differenceInDays, differenceInYears, format, formatDistanceToNow, getDayOfYear, isBefore } from 'date-fns';
import { enGB } from 'date-fns/locale';

export const readableCreatedDate = (date: Date) => {
  const now = new Date();
  const postDate = date;

  const diffInYears = differenceInYears(now, postDate);

  // Check if postDate is at least a year ago or if it's a future date in the same year (handle edge case)
  if (diffInYears >= 1 || (diffInYears === 0 && isBefore(now, postDate) && getDayOfYear(now) < getDayOfYear(postDate))) {
    return format(postDate, 'd. MMMM yyyy', { locale: enGB });
  }

  const diffInDays = differenceInDays(now, postDate);

  if (diffInDays > 0) {
    return format(postDate, 'd. MMMM', { locale: enGB });
  }

  // For times less than a day ago, show relative time
  const readableTime = formatDistanceToNow(postDate, { locale: enGB, addSuffix: false });

  if (readableTime === 'less than a minute') {
    return 'just now';
  }

  if (readableTime === '1 minute') {
    return 'a minute ago';
  }

  return `before ${readableTime}`;
};
