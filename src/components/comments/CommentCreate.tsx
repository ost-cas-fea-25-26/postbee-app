'use client';

import { createPostReply } from '@/actions/comments';
import { Card } from '@/components/core/Card';
import { Form } from '@/components/core/Form';
import { AuthSession } from '@/lib/auth/auth';
import { Button, Textarea } from '@postbee/postbee-ui-lib';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { PostItemUserInfo } from '../posts/PostItemUserInfo';

type CommentFormData = {
  comment: string;
};

const CommentFormFields = ({ session }: { session: AuthSession }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CommentFormData>();

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

      <Textarea
        placeholder="And what do you think about that?"
        rows={5}
        {...register('comment', { required: 'Please provide a comment.' })}
        aria-invalid={!!errors.comment}
        errorMessage={errors.comment?.message}
      />

      <div className="flex items-center justify-center gap-sm flex-wrap sm:flex-nowrap">
        <Button text="Image upload" variant="secondary" icon="upload" fullWidth type="button" />
        <Button text="Send" icon="send" fullWidth type="submit" />
      </div>
    </>
  );
};

export const CommentCreate = ({ postId, session }: { postId: string; session: AuthSession }) => {
  const onSubmit: SubmitHandler<CommentFormData> = (data) => {
    console.warn('Submitted comment:', data.comment);
    // TODO: add post to current list
    const res = createPostReply(postId, data.comment);
    console.warn('Submitted comment res:', res);
  };

  return (
    <Card className="h-fit w-full max-w-full !px-0">
      <Form<CommentFormData> onSubmit={onSubmit} className="!px-0 flex flex-col justify-center gap-sm">
        <CommentFormFields session={session} />
      </Form>
    </Card>
  );
};
