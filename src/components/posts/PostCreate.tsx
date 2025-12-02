'use client';

import { useEffect, useState } from 'react';

import { createPost } from '@/actions/posts';
import { Form } from '@/components/core/Form';
import { PostCard } from '@/components/posts/PostCard';
import { Button, Dialog, Heading, Textarea, Upload } from '@postbee/postbee-ui-lib';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

type PostFormData = {
  postContent: string;
  media?: File | undefined;
};

const PostFormFields = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<PostFormData>();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  const handleDialogSubmit = () => {
    setValue('media', selectedFile || undefined, { shouldValidate: true });
    setOpenDialog(false);
  };

  return (
    <>
      <Heading level={4}>Hey, let's mumble ?</Heading>

      {previewUrl && (
        <div className="grid cursor-auto place-content-center object-contain space-y-2">
          <Image src={previewUrl} alt="post-media" width={320} height={584} className="rounded-md object-cover" />

          <Button icon="cancel" text="Remove" onClick={() => setSelectedFile(null)} variant="secondary" />
        </div>
      )}

      <Textarea
        {...register('postContent', { required: 'Bitte gib deinen Beitrag ein.' })}
        name="postContent"
        placeholder="Deine Meinung zählt!"
        aria-invalid={!!errors.postContent}
        errorMessage={errors.postContent && errors.postContent.message}
      />

      <div className="flex items-center justify-center gap-4">
        <Button
          text="Bild hochladen"
          variant="secondary"
          icon="upload"
          fullWidth
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDialog(true);
          }}
        />

        <Dialog title="Upload" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleDialogSubmit}>
          <Upload
            files={selectedFile ? [{ file: selectedFile, preview: URL.createObjectURL(selectedFile) }] : []}
            onChange={(files) => {
              setSelectedFile(files[0]?.file ?? null);
            }}
          />
        </Dialog>

        <Button text="Absenden" icon="send" fullWidth type="submit" onClick={(e) => e.stopPropagation()} />
      </div>
    </>
  );
};

export const PostCreate = () => {
  const onSubmit = (data: PostFormData) => {
    console.log('Submitted post:', data);
    // TODO: add post to current list
    const res = createPost(data.postContent, data.media);
  };

  return (
    <PostCard>
      <Form<PostFormData> onSubmit={onSubmit} className="grid gap-sm sm:gap-md" defaultValues={{ media: null }}>
        <PostFormFields />
      </Form>
    </PostCard>
  );
};
