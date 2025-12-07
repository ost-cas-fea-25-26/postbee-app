import { ReactNode } from 'react';

import { FieldValues, FormProvider, SubmitHandler, UseFormProps, useForm } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  formOptions?: UseFormProps<T>;
  className?: string;
};

export function Form<T extends FieldValues>({ onSubmit, children, formOptions, className }: FormProps<T>) {
  const methods = useForm<T>(formOptions);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}
