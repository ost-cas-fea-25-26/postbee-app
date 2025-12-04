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
          width={320}
          height={584}
          style={{ height: 'auto', width: 'auto' }}
          className="rounded-md object-cover cursor-pointer"
          loading="eager"
          onClick={(e) => {
            setOpen(!toggle);
            e.stopPropagation();
          }}
        />
      ))}
      <Lightbox open={toggle} close={() => setOpen(false)} slides={sources.map((src) => ({ src }))} />
    </>
  );
};
