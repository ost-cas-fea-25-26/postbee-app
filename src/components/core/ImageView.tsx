import { useState } from 'react';

import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export const ImageView = ({ sources, alt = 'media' }: { sources: string[]; alt: string }) => {
  const [toggle, setOpen] = useState(false);

  return (
    <>
      {sources.map((src) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          unoptimized
          width={320}
          height={584}
          className="rounded-md object-cover cursor-pointer w-auto h-auto max-h-[500px]"
          loading="eager"
          onClick={() => {
            setOpen(!toggle);
          }}
        />
      ))}
      <Lightbox open={toggle} close={() => setOpen(false)} slides={sources.map((src) => ({ src }))} />
    </>
  );
};
