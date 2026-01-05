import { ReactNode } from 'react';

import { FieldValues, FormProvider, SubmitHandler, UseFormProps, useForm } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  formOptions?: UseFormProps<T>;
  className?: string;
  id?: string;
};

export function Form<T extends FieldValues>({ onSubmit, children, formOptions, className, id }: FormProps<T>) {
  const methods = useForm<T>(formOptions);

  return (
    <FormProvider {...methods}>
      <form id={id} onSubmit={methods.handleSubmit(onSubmit)} className={className} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}
