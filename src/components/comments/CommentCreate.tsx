'use client';

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { createPostReply } from '@/actions/comments';
import { useComments } from '@/components/comments/CommentsProvider';
import { Card } from '@/components/core/Card';
import { Form } from '@/components/core/Form';
import { ImageView } from '@/components/core/ImageView';
import { UploadDialog } from '@/components/core/UploadDialog';
import { PostItemUserInfo } from '@/components/posts/PostItemUserInfo';
import { AuthSession } from '@/lib/auth/auth';
import { Button, Textarea } from '@postbee/postbee-ui-lib';
import { SubmitHandler, useFormContext } from 'react-hook-form';

type CommentFormData = {
  comment: string;
  media?: File;
};

export interface CommentFormFieldsHandle {
  resetForm: () => void;
}

const CommentFormFields = forwardRef<CommentFormFieldsHandle, { session: AuthSession }>(({ session }, ref) => {
  const {
    register,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext<CommentFormData>();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => (selectedFile ? URL.createObjectURL(selectedFile) : null), [selectedFile]);

  useImperativeHandle(
    ref,
    () => ({
      resetForm() {
        reset({ comment: '', media: undefined });
        setSelectedFile(null);
      },
    }),
    [reset],
  );

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl],
  );

  const handleUploadSubmit = (files: File[]) => {
    const file = files[0] ?? null;

    setSelectedFile(file);
    setValue('media', file ?? undefined, { shouldValidate: true });
    setOpenDialog(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValue('media', undefined, { shouldValidate: true });
  };

  return (
    <>
      {session?.user && (
        <PostItemUserInfo
          userId={session.user.id}
          username={session.user.username ?? 'Unknown User'}
          avatarSrc={session.user.image ?? undefined}
          displayName={session.user.name}
        />
      )}

      {previewUrl && (
        <div className="grid place-content-center space-y-xs">
          <ImageView sources={[previewUrl]} alt="comment-media-preview" />
          <Button icon="cancel" text="Remove" variant="secondary" onClick={handleRemoveFile} />
        </div>
      )}

      <Textarea
        placeholder="And what do you think about that?"
        rows={4}
        {...register('comment', {
          required: 'Please provide a comment.',
        })}
        aria-invalid={!!errors.comment}
        errorMessage={errors.comment?.message}
      />

      <div className="flex flex-wrap items-center justify-center gap-sm sm:flex-nowrap">
        <Button
          text="Image upload"
          variant="secondary"
          icon="upload"
          type="button"
          fullWidth
          onClick={() => setOpenDialog(true)}
        />

        <UploadDialog open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleUploadSubmit} />

        <Button text="Send" icon="send" type="submit" fullWidth />
      </div>
    </>
  );
});

CommentFormFields.displayName = 'CommentFormFields';

export function CommentCreate({ postId, session }: { postId: string; session: AuthSession }) {
  const formFieldsRef = useRef<CommentFormFieldsHandle | null>(null);

  const { addComment } = useComments();

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    try {
      const createdComment = await createPostReply(postId, data.comment, data.media);

      if (createdComment) {
        addComment(createdComment);
      }

      // Reset form using ref method
      formFieldsRef.current?.resetForm();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <Card className="h-fit w-full max-w-full !px-0">
      <Form<CommentFormData> onSubmit={onSubmit} className="flex flex-col gap-sm !px-0">
        <CommentFormFields ref={formFieldsRef} session={session} />
      </Form>
    </Card>
  );
}
