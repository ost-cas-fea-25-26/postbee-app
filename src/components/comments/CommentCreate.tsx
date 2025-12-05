'use client';

import { createPostReply } from '@/actions/comments';
import { CommentItemUserInfo } from '@/components/comments/CommentItemUserInfo';
import { Card } from '@/components/core/Card';
import { Form } from '@/components/core/Form';
import { AuthSession } from '@/lib/auth/auth';
import { Button, Textarea } from '@postbee/postbee-ui-lib';
import { SubmitHandler, useFormContext } from 'react-hook-form';

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
          <CommentItemUserInfo
            username={session.user.name}
            avatar={session.user?.image ?? undefined}
            displayName={session.user.name}
          />
        )}
      </div>

      <Textarea
        placeholder="Und was meinst du dazu?"
        {...register('comment', { required: 'Bitte gib einen Kommentar ein.' })}
        aria-invalid={!!errors.comment}
      />
      {errors.comment && <p className="text-red-600 text-sm">{errors.comment.message}</p>}

      <div className="flex items-center justify-center gap-sm">
        <Button text="Bild hochladen" variant="secondary" icon="upload" fullWidth type="button" />
        <Button text="Absenden" icon="send" fullWidth type="submit" />
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
