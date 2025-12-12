'use client';

import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { createPostReply } from '@/actions/comments';
import { Card } from '@/components/core/Card';
import { Form } from '@/components/core/Form';
import { ImageView } from '@/components/core/ImageView';
import { UploadDialog } from '@/components/core/UploadDialog';
import { AuthSession } from '@/lib/auth/auth';
import { Button, Textarea } from '@postbee/postbee-ui-lib';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { PostItemUserInfo } from '../posts/PostItemUserInfo';

type CommentFormData = {
  comment: string;
  media?: File | undefined;
};

interface CommentFormFieldsHandle {
  resetForm: () => void;
}

const CommentFormFields = ({ session, ref }: { session: AuthSession; ref: React.RefObject<CommentFormFieldsHandle> }) => {
  const {
    register,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext<CommentFormData>();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Expose reset method to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      resetForm: () => {
        reset({ comment: '', media: undefined });
        setSelectedFile(null);
        setPreviewUrl(null);
      },
    }),
    [reset],
  );

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

  const handleUploadSubmit = (files: File[]) => {
    const file = files[0] ?? null;
    setSelectedFile(file);
    setValue('media', file ?? undefined, { shouldValidate: true });
    setOpenDialog(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValue('media', undefined);
  };

  // Sync media field with selectedFile
  useEffect(() => {
    if (!selectedFile) {
      setValue('media', undefined);
    }
  }, [selectedFile, setValue]);

  return (
    <>
      <div>
        {session?.user && (
          <PostItemUserInfo
            userId={session.user.id}
            username={session.user.username ?? 'Unknown User'}
            avatarSrc={session.user?.image ?? undefined}
            displayName={session.user.name}
          />
        )}
      </div>

      {previewUrl && (
        <div className="grid cursor-auto place-content-center object-contain space-y-xs">
          <ImageView sources={[previewUrl]} alt="post-media-create" />

          <Button icon="cancel" text="Remove" onClick={handleRemoveFile} variant="secondary" />
        </div>
      )}

      <Textarea
        placeholder="And what do you think about that?"
        rows={4}
        {...register('comment', { required: 'Please provide a comment.' })}
        aria-invalid={!!errors.comment}
        errorMessage={errors.comment?.message}
      />

      <div className="flex items-center justify-center gap-sm flex-wrap sm:flex-nowrap">
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
        <UploadDialog open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleUploadSubmit} />

        <Button text="Send" icon="send" fullWidth type="submit" />
      </div>
    </>
  );
};

export const CommentCreate = ({ postId, session }: { postId: string; session: AuthSession }) => {
  const formFieldsRef = useRef<CommentFormFieldsHandle>(null);

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    console.warn('Submitted comment:', data.comment);

    try {
      const res = await createPostReply(postId, data.comment, data.media);
      console.warn('Submitted comment res:', res);

      // Reset form using ref method
      formFieldsRef.current?.resetForm();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <Card className="h-fit w-full max-w-full !px-0">
      <Form<CommentFormData> onSubmit={onSubmit} className="!px-0 flex flex-col justify-center gap-sm">
        <CommentFormFields session={session} ref={formFieldsRef} />
      </Form>
    </Card>
  );
};
