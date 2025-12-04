'use client';

import { useEffect, useState } from 'react';

import { createPost } from '@/actions/posts';
import { Form } from '@/components/core/Form';
import { ImageView } from '@/components/core/ImageView';
import { PostCard } from '@/components/posts/PostCard';
import { Button, Dialog, Heading, Textarea, Upload } from '@postbee/postbee-ui-lib';
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
      const timeout = setTimeout(() => setPreviewUrl(null), 0);

      return () => clearTimeout(timeout);
    }

    const url = URL.createObjectURL(selectedFile);
    const timeout = setTimeout(() => setPreviewUrl(url), 0);

    return () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  const handleDialogSubmit = () => {
    setValue('media', selectedFile ?? undefined, { shouldValidate: true });
    setOpenDialog(false);
  };

  return (
    <>
      <Heading level={4}>Hey, let&apos;s mumble ?</Heading>

      {previewUrl && (
        <div className="grid cursor-auto place-content-center object-contain space-y-2">
          <ImageView sources={[previewUrl]} alt="post-media-create" />

          <Button icon="cancel" text="Remove" onClick={() => setSelectedFile(null)} variant="secondary" />
        </div>
      )}

      <Textarea
        {...register('postContent', { required: 'Bitte gib deinen Beitrag ein.' })}
        name="postContent"
        placeholder="Deine Meinung zählt!"
        rows={5}
        aria-invalid={!!errors.postContent}
        errorMessage={errors.postContent?.message}
      />

      <div className="flex items-center justify-center gap-sm">
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
  const onSubmit = async (data: PostFormData) => {
    console.warn('Submitted post:', data);
    // TODO: add post to current list
    const res = await createPost(data.postContent, data.media);
    console.warn('Submitted post res:', res);
  };

  return (
    <PostCard>
      <Form<PostFormData> onSubmit={onSubmit} className="grid gap-sm sm:gap-md">
        <PostFormFields />
      </Form>
    </PostCard>
  );
};
