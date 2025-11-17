import { Button } from '@postbee/postbee-ui-lib';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <h1>PostBee</h1>
      <Image src="/images/PostBee-Logo.png" alt="Logo" width="400" />
      <Button></Button>
    </div>
  );
}
