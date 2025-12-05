'use client';

import { useEffect, useState } from 'react';

import { Form } from '@/components/core/Form';
import { ImageView } from '@/components/core/ImageView';
import { UploadDialog } from '@/components/core/UploadDialog';
import { Button, Dialog, Textarea } from '@postbee/postbee-ui-lib';
import { useFormContext } from 'react-hook-form';

export type PostFormData = {
  postContent: string;
  media?: File | null;
  mediaRemoved?: boolean;
};

type PostItemEditDialogProps = {
  open: boolean;
  initialContent: string;
  initialMedia?: string | null;
  onClose: () => void;
  onSubmit: (data: PostFormData) => Promise<void>;
};

const PostEditFields = ({ initialMedia }: { initialMedia?: string | null }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<PostFormData>();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialMedia ?? null);
  const [mediaRemoved, setMediaRemoved] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      if (!initialMedia || mediaRemoved) {
        const timeout = setTimeout(() => setPreviewUrl(null), 0);

        return () => clearTimeout(timeout);
      }

      return;
    }

    const url = URL.createObjectURL(selectedFile);
    const timeout = setTimeout(() => setPreviewUrl(url), 0);

    return () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
    };
  }, [selectedFile, initialMedia, mediaRemoved]);

  const handleUploadSubmit = (files: File[]) => {
    const file = files[0] ?? null;
    setSelectedFile(file);
    setMediaRemoved(false);
    setValue('media', file ?? undefined, { shouldValidate: true });
    setValue('mediaRemoved', false);
    setOpenDialog(false);
  };

  const handleRemoveMedia = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setMediaRemoved(true);
    setValue('media', null);
    setValue('mediaRemoved', true);
  };

  return (
    <>
      {previewUrl ? (
        <div className="grid cursor-auto place-content-center object-contain space-y-2">
          <ImageView sources={[previewUrl]} alt="post-media" />
          <Button icon="cancel" text="Remove" onClick={handleRemoveMedia} variant="secondary" />
        </div>
      ) : (
        <Button
          text="Image upload"
          variant="secondary"
          icon="upload"
          fullWidth
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDialog(true);
          }}
        />
      )}

      <Textarea
        {...register('postContent', { required: 'Please enter your contribution.' })}
        name="postContent"
        rows={5}
        placeholder="Deine Meinung zählt!"
        aria-invalid={!!errors.postContent}
        errorMessage={errors.postContent?.message}
      />

      <UploadDialog open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleUploadSubmit} />

      {/* Hidden submit button that Dialog can trigger */}
      <button type="submit" id="edit-post-submit" style={{ display: 'none' }} />
    </>
  );
};

export const PostItemEditDialog = ({ open, initialContent, initialMedia, onClose, onSubmit }: PostItemEditDialogProps) => {
  const handleSubmit = async (data: PostFormData) => {
    await onSubmit(data);
    onClose();
  };

  const handleDialogSubmit = () => {
    document.getElementById('edit-post-submit')?.click();
  };

  return (
    <Dialog title="Post bearbeiten" open={open} onClose={onClose} onSubmit={handleDialogSubmit}>
      <Form<PostFormData>
        onSubmit={handleSubmit}
        formOptions={{
          defaultValues: {
            postContent: initialContent,
            media: undefined,
            mediaRemoved: false,
          },
        }}
        className="grid gap-sm sm:gap-md"
      >
        <PostEditFields initialMedia={initialMedia} />
      </Form>
    </Dialog>
  );
};
