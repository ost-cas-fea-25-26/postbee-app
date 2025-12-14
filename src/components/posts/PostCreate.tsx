'use client';

import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { createPost } from '@/actions/posts';
import { Form } from '@/components/core/Form';
import { ImageView } from '@/components/core/ImageView';
import { UploadDialog } from '@/components/core/UploadDialog';
import { PostCard } from '@/components/posts/PostCard';
import { usePosts } from '@/components/posts/PostsProvider';
import { Button, Heading, Textarea } from '@postbee/postbee-ui-lib';
import { useFormContext } from 'react-hook-form';

type PostFormData = {
  postContent: string;
  media?: File | undefined;
};

interface PostFormFieldsHandle {
  resetForm: () => void;
}

const PostFormFields = ({ ref }: { ref: React.RefObject<PostFormFieldsHandle | null> }) => {
  const {
    register,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext<PostFormData>();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Expose reset method to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      resetForm: () => {
        reset({ postContent: '', media: undefined });
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
      <Heading level={4}>Hey, let&apos;s mumble?</Heading>

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
          onClick={() => {
            setOpenDialog(true);
          }}
        />

        <UploadDialog open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleUploadSubmit} />

        <Button text="Send" icon="send" fullWidth type="submit" onClick={(e) => e.stopPropagation()} />
      </div>
    </>
  );
};

type PostCreateProps = {
  userDisplayName: string;
};

export const PostCreate = ({ userDisplayName }: PostCreateProps) => {
  const formFieldsRef = useRef<PostFormFieldsHandle | null>(null);
  const { addPost } = usePosts();

  const onSubmit = async (data: PostFormData) => {
    console.warn('Submitted post:', data);

    try {
      const createdPost = await createPost(data.postContent, data.media);
      console.warn('Submitted post res:', createdPost);

      if (createdPost) {
        addPost(createdPost);
      }

      // Reset form after successful submission
      formFieldsRef.current?.resetForm();
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <PostCard post={{ creator: { displayName: userDisplayName } }}>
      <Form<PostFormData> onSubmit={onSubmit}>
        <div className="grid gap-sm">
          <PostFormFields ref={formFieldsRef} />
        </div>
      </Form>
    </PostCard>
  );
};
