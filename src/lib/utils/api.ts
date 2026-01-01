import { z } from 'zod';

const ULID_SCHEMA = z.string().ulid({ message: 'Invalid ULID' });

export const decodeULIDTimestamp = (ulid: string) => {
  const validate = ULID_SCHEMA.safeParse(ulid);
  if (!validate.success) {
    throw new Error(validate.error.message);
  }
  const timestampPart = validate.data.substring(0, 10);
  const characters = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

  const timestamp = timestampPart.split('').reduce((acc, char) => {
    return acc * 32 + characters.indexOf(char);
  }, 0);

  return new Date(timestamp);
};
