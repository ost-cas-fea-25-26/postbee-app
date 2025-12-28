'use client';

import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { createPost } from '@/actions/posts';
import { Form } from '@/components/core/Form';
import { ImageView } from '@/components/core/ImageView';
import { UploadDialog } from '@/components/core/UploadDialog';
import { PostCard } from '@/components/posts/PostCard';
import { usePosts } from '@/components/posts/PostsProvider';
import type { Post } from '@/lib/api/client';
import { Button, Heading, Paragraph, Textarea } from '@postbee/postbee-ui-lib';
import { useFormContext } from 'react-hook-form';

type PostFormData = {
  postContent: string;
  media?: File | undefined;
};

interface PostFormFieldsHandle {
  resetForm: () => void;
}

const PostFormFields = ({
  ref,
  title = "Hey, let's mumble?",
  subtitle,
}: {
  ref: React.RefObject<PostFormFieldsHandle | null>;
  title?: string;
  subtitle?: string;
}) => {
  const {
    register,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext<PostFormData>();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Derive preview URL and clean it up on change/unmount
  const previewUrl = useMemo(() => (selectedFile ? URL.createObjectURL(selectedFile) : null), [selectedFile]);

  useImperativeHandle(
    ref,
    () => ({
      resetForm: () => {
        reset({ postContent: '', media: undefined });
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
    setValue('media', undefined);
  };

  // Sync media field when file is cleared
  useEffect(() => {
    if (!selectedFile) {
      setValue('media', undefined);
    }
  }, [selectedFile, setValue]);

  return (
    <>
      <div className="flex flex-col gap-xs">
        <Heading level={4}>{title}</Heading>
        {subtitle && <Paragraph>{subtitle}</Paragraph>}
      </div>

      {previewUrl && (
        <div className="grid cursor-auto place-content-center object-contain space-y-xs">
          <ImageView sources={[previewUrl]} alt="post-media-create" />
          <Button icon="cancel" text="Remove" onClick={handleRemoveFile} variant="secondary" />
        </div>
      )}

      <Textarea
        {...register('postContent', { required: 'Please enter your contribution.' })}
        name="postContent"
        placeholder="Your opinion matters!"
        rows={4}
        aria-invalid={!!errors.postContent}
        errorMessage={errors.postContent?.message}
      />

      <div className="flex items-center justify-center gap-sm flex-wrap sm:flex-nowrap">
        <Button
          text="Image upload"
          variant="secondary"
          icon="upload"
          fullWidth
          type="button"
          onClick={() => setOpenDialog(true)}
        />

        <UploadDialog open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleUploadSubmit} />

        <Button text="Send" icon="send" fullWidth type="submit" onClick={(e) => e.stopPropagation()} />
      </div>
    </>
  );
};

type PostCreateProps = {
  userDisplayName: string;
  userAvatarUrl?: string;
  title?: string;
  subtitle?: string;
  onAddPost?: (createdPost: Post) => void;
};

export function PostCreate({ userDisplayName, userAvatarUrl, title, subtitle, onAddPost }: PostCreateProps) {
  const formFieldsRef = useRef<PostFormFieldsHandle | null>(null);
  const { addPost } = usePosts();

  const onSubmit = async (data: PostFormData) => {
    try {
      const createdPost = await createPost(data.postContent, data.media);

      if (createdPost) {
        addPost(createdPost);
        onAddPost?.(createdPost);
      }

      // Reset form after successful submission
      formFieldsRef.current?.resetForm();
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <PostCard post={{ creator: { displayName: userDisplayName, avatarUrl: userAvatarUrl } }}>
      <Form<PostFormData> onSubmit={onSubmit}>
        <div className="grid gap-sm">
          <PostFormFields ref={formFieldsRef} title={title} subtitle={subtitle} />
        </div>
      </Form>
    </PostCard>
  );
}
