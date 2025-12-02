'use client';

import { createPost } from '@/actions/posts';
import { Form } from '@/components/core/Form';
import { PostCard } from '@/components/posts/PostCard';
import { Button, Heading, Textarea } from '@postbee/postbee-ui-lib';
import { useFormContext } from 'react-hook-form';

type PostFormData = {
  postContent: string;
};

const PostFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostFormData>();

  return (
    <>
      <Heading level={4}>Hey, let's mumble ?</Heading>

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
          onClick={(e) => e.stopPropagation()}
        />
        <Button text="Absenden" icon="send" fullWidth type="submit" onClick={(e) => e.stopPropagation()} />
      </div>
    </>
  );
};

export const PostCreate = () => {
  const onSubmit = (data: PostFormData) => {
    console.log('Submitted post:', data.postContent);
    // TODO: add post to current list
    const res = createPost(data.postContent);
  };

  return (
    <PostCard>
      <Form<PostFormData> onSubmit={onSubmit} className="grid gap-sm sm:gap-md">
        <PostFormFields />
      </Form>
    </PostCard>
  );
};
