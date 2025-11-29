'use client';

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
      <div>{session?.user && <CommentItemUserInfo user={session.user} />}</div>

      <Textarea
        placeholder="Und was meinst du dazu?"
        {...register('comment', { required: 'Bitte gib einen Kommentar ein.' })}
        aria-invalid={!!errors.comment}
      />
      {errors.comment && <p className="text-red-600 text-sm">{errors.comment.message}</p>}

      <div className="flex items-center justify-center gap-4">
        <Button text="Bild hochladen" variant="secondary" icon="upload" fullWidth type="button" />
        <Button text="Absenden" icon="send" fullWidth type="submit" />
      </div>
    </>
  );
};

export const CommentCreate = ({ session }: { session: AuthSession }) => {
  const onSubmit: SubmitHandler<CommentFormData> = (data) => {
    console.log('Submitted comment:', data.comment);
  };

  return (
    <Card className="h-fit w-full max-w-full !px-0">
      <Form<CommentFormData> onSubmit={onSubmit} className="!px-0 flex flex-col justify-center gap-4">
        <CommentFormFields session={session} />
      </Form>
    </Card>
  );
};
