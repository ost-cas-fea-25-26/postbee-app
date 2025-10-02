import { Button } from '@postbee/postbee-ui-lib';

export default function Home() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <h1>PostBee</h1>
      <img src="/images/PostBee-Logo.png" alt="Logo" width="400" />
      <Button label="Button" primary={true}></Button>
    </div>
  );
}
