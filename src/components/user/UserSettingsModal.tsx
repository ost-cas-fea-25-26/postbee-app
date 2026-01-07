'use client';

import { useEffect, useId, useState } from 'react';

import { updateUserSettings } from '@/actions/user';
import { Checkbox } from '@/components/core/Checkbox';
import { Form } from '@/components/core/Form';
import { AppUser } from '@/lib/types';
import { Button, Dialog, Input } from '@postbee/postbee-ui-lib';
import { useFormContext } from 'react-hook-form';
import { useLocalStorage } from 'react-use-storage';
import { toast } from 'sonner';

type UserSettingsFormData = {
  firstname: string;
  lastname: string;
  username: string;
};

const LIVE_POSTS_KEY = 'livePostsEnabled';

type UserSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  user: AppUser;
};

const UserSettingsFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserSettingsFormData>();

  return (
    <div className="grid gap-sm sm:gap-md">
      <Input
        {...register('firstname', { required: 'First name is required' })}
        label="First Name"
        placeholder="Enter your first name"
        aria-invalid={!!errors.firstname}
        errorMessage={errors.firstname?.message}
      />

      <Input
        {...register('lastname', { required: 'Last name is required' })}
        label="Last Name"
        placeholder="Enter your last name"
        aria-invalid={!!errors.lastname}
        errorMessage={errors.lastname?.message}
      />

      <Input
        {...register('username', { required: 'Username is required' })}
        label="Username"
        placeholder="Enter your username"
        aria-invalid={!!errors.username}
        errorMessage={errors.username?.message}
      />
    </div>
  );
};

export function UserSettingsModal({ open, onClose, user }: UserSettingsModalProps) {
  const [isLoading, setIsLoading] = useLocalStorage<boolean>('userSettingsModalIsLoading', false);
  const formId = useId();
  const [livePostsEnabled, setLivePostsEnabled] = useLocalStorage<boolean>(LIVE_POSTS_KEY, false);
  const [pendingLivePostsEnabled, setPendingLivePostsEnabled] = useState(livePostsEnabled);

  // Sync pending state with localStorage when modal opens
  useEffect(() => {
    setPendingLivePostsEnabled(livePostsEnabled);
  }, [open, livePostsEnabled]);

  const handleSubmit = async (data: UserSettingsFormData) => {
    setIsLoading(true);
    try {
      setLivePostsEnabled(pendingLivePostsEnabled);
      await updateUserSettings(data);
      toast.success('User settings updated successfully.');
      onClose();
    } catch (error) {
      console.error('Failed to update user settings:', error);
      toast.error('Failed to update user settings');
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = () => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    form?.requestSubmit();
  };

  const firstname = user.firstname || user.displayName?.split(' ')[0] || '';
  const lastname = user.lastname || (user.displayName?.split(' ')?.at(1) ?? '') || '';

  return (
    <Dialog
      title="User Settings"
      open={open}
      onClose={onClose}
      onSubmit={submitForm}
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
            loading={isLoading}
          />
        </>
      }
    >
      <Form<UserSettingsFormData>
        id={formId}
        onSubmit={handleSubmit}
        formOptions={{
          defaultValues: {
            firstname,
            lastname,
            username: user.username || '',
          },
        }}
        className="grid gap-sm sm:gap-md"
      >
        <UserSettingsFields />
      </Form>
      <div className="flex flex-col mt-8">
        <div className="pb-label-md mr-2">Beta Features 🧪</div>
        <div className="flex flex-row items-center ml-1 mt-4">
          <Checkbox
            id="live-posts-checkbox"
            label="Enable live posts (real-time updates)"
            checked={pendingLivePostsEnabled}
            onCheckedChange={(checked) => setPendingLivePostsEnabled(checked === true)}
          />
        </div>
      </div>
    </Dialog>
  );
}
