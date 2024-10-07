import { useToast } from '@/components/ui/use-toast';
import { TERMS_AND_CONDITIONS } from '@/config/data';
import i18n from '@/i18n';
import validator from '@/lib/validator';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import useAuthStore from '@/state/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link as NextUILink } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { z } from 'zod';

export default function Register() {
  const { t } = useTranslation();

  return (
    <AuthLayout pageType="register">
      <div className="container relative flex items-center justify-center px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('register.title')}
            </h1>
            <p className="text-sm text-gray-500">{t('register.subtitle')}</p>
          </div>
          <RegisterForm />
          <p className="text-center text-sm text-gray-500">
            {t('register.haveAccount')}{' '}
            <NextUILink size="sm" as={Link} to="/auth/login" color="primary">
              {t('register.signIn')}
            </NextUILink>
          </p>
          <p className="text-center text-sm text-gray-500">
            {t('register.termsAndPrivacy.prefix')}{' '}
            <NextUILink
              size="sm"
              as={Link}
              to={TERMS_AND_CONDITIONS}
              color="primary"
            >
              {t('register.termsAndPrivacy.termsOfService')}
            </NextUILink>{' '}
            {t('register.termsAndPrivacy.and')}{' '}
            <NextUILink
              size="sm"
              as={Link}
              to={TERMS_AND_CONDITIONS}
              color="primary"
            >
              {t('register.termsAndPrivacy.privacyPolicy')}
            </NextUILink>
            .
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

const RegisterForm = () => {
  const { t } = useTranslation();

  const schema = z
    .object({
      firstName: validator.stringMinMax,
      lastName: validator.stringMinMax,
      email: validator.email,
      phoneNumber: validator.phoneNumber,
      password: validator.password,
      confirmPassword: validator.password,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('register.form.errors.passwordsMismatch'),
      path: ['confirmPassword'],
    });
  const { setToken } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.seller.register,
    onSuccess: (data) => {
      setToken(data);
      toast({
        title: t('register.successToast.title'),
        description: t('register.successToast.description'),
      });
    },
    onError: (error: any) => {
      if (error.response?.data?.message === 'Email already exists') {
        toast({
          title: t('register.errorToasts.emailExists.title'),
          description: t('register.errorToasts.emailExists.description'),
          variant: 'destructive',
        });
        return;
      } else {
        toast({
          title: t('register.errorToasts.genericError.title'),
          description: t('register.errorToasts.genericError.description'),
          variant: 'destructive',
        });
      }
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const onSubmit = (data: z.infer<typeof schema>) => {
    const language = i18n.language;
    mutate({
      ...data,
      language,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label={t('register.form.firstName')}
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="lastName"
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              isRequired
              label={t('register.form.lastName')}
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          )}
        />
      </div>
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label={t('register.form.email')}
            isRequired
            type="email"
            isInvalid={!!error}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="phoneNumber"
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label={t('register.form.phoneNumber')}
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message}
            type="tel"
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9+]/g, '');
              if (value && !value.startsWith('+')) {
                value = '+' + value;
              }
              field.onChange(value);
            }}
          />
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label={t('register.form.password')}
              isRequired
              type="password"
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label={t('register.form.confirmPassword')}
              type="password"
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          )}
        />
      </div>
      <div className="pt-4 flex items-center justify-center">
        <Button
          type="submit"
          color="primary"
          isLoading={isPending}
          className="w-[250px]"
        >
          {t('register.form.submitButton')}
        </Button>
      </div>
    </form>
  );
};
