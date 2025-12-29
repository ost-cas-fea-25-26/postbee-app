'use client';

import { useState } from 'react';

import { updateUserSettings } from '@/actions/user';
import { Form } from '@/components/core/Form';
import { AppUser } from '@/lib/types';
import { Button, Dialog, Input } from '@postbee/postbee-ui-lib';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

type UserSettingsFormData = {
  firstname: string;
  lastname: string;
  username: string;
};

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

      {/* Hidden submit button that Dialog can trigger */}
      <button type="submit" id="user-settings-submit" className="hidden" />
    </div>
  );
};

export function UserSettingsModal({ open, onClose, user }: UserSettingsModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: UserSettingsFormData) => {
    setIsLoading(true);
    try {
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

  const handleDialogSubmit = () => {
    document.getElementById('user-settings-submit')?.click();
  };

  const firstname = user.firstname || user.displayName?.split(' ')[0] || '';
  const lastname = user.lastname || (user.displayName?.split(' ')?.at(1) ?? '') || '';

  return (
    <Dialog
      title="User Settings"
      open={open}
      onClose={onClose}
      onSubmit={handleDialogSubmit}
      actions={
        <>
          <Button text="Cancel" icon="cancel" variant="secondary" onClick={onClose} size="md" />
          <Button text="Save" icon="checkmark" onClick={handleDialogSubmit} size="md" loading={isLoading} />
        </>
      }
    >
      <Form<UserSettingsFormData>
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
    </Dialog>
  );
}
