'use client';

import { useEffect, useId, useState } from 'react';

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

  const textareaLabelId = useId();
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
        <div className="grid cursor-auto place-content-center object-contain space-y-xs">
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
          onClick={() => {
            setOpenDialog(true);
          }}
        />
      )}

      <span id={textareaLabelId} className="sr-only">
        Edit post content
      </span>

      <Textarea
        {...register('postContent', { required: 'Please enter your contribution.' })}
        name="postContent"
        rows={5}
        placeholder="Your opinion matters!"
        aria-labelledby={textareaLabelId}
        aria-invalid={!!errors.postContent}
        errorMessage={errors.postContent?.message}
      />

      <UploadDialog open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleUploadSubmit} />
    </>
  );
};

export function PostItemEditDialog({ open, initialContent, initialMedia, onClose, onSubmit }: PostItemEditDialogProps) {
  const [submitPending, setSubmitPending] = useState(false);
  const formId = useId();
  const handleSubmit = async (data: PostFormData) => {
    setSubmitPending(true);
    await onSubmit(data);
    setSubmitPending(false);
    onClose();
  };

  const submitForm = () => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  return (
    <Dialog
      title="Post edit"
      open={open}
      onSubmit={submitForm}
      onClose={onClose}
      actions={
        <>
          <Button text="Cancel" icon="cancel" variant="secondary" onClick={onClose} size="md" type="button" />
          <Button
            text="Save"
            icon="checkmark"
            type="submit"
            form={formId}
            onClick={submitForm}
            size="md"
            loading={submitPending}
          />
        </>
      }
    >
      <Form<PostFormData>
        id={formId}
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
}
