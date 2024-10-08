import { useToast } from '@/components/ui/use-toast';
import { TERMS_AND_CONDITIONS } from '@/config/data';
import validator from '@/lib/validator';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import useAuthStore from '@/state/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link as NextUILink } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'; // or 'next-i18next' for Next.js
import { Link } from 'react-router-dom';
import { z } from 'zod';

export default function Login({
  onLoginSuccess,
}: {
  onLoginSuccess?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <AuthLayout pageType="login">
      <div className="container relative flex items-center justify-center px-4">
        <div className="w-full max-w-[350px]">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t('login.title')}
              </h1>
              <p className="text-sm text-gray-500">{t('login.subtitle')}</p>
            </div>
            <LoginForm onLoginSuccess={onLoginSuccess} />
            <p className="text-center text-sm text-gray-500">
              {t('login.noAccount')}{' '}
              <NextUILink
                size="sm"
                as={Link}
                to="/auth/register"
                color="primary"
              >
                {t('login.signUp')}
              </NextUILink>
            </p>
            <p className="text-center text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <NextUILink
                size="sm"
                as={Link}
                to={TERMS_AND_CONDITIONS}
                color="primary"
              >
                Terms of Service
              </NextUILink>{' '}
              and{' '}
              <NextUILink
                as={Link}
                size="sm"
                to={TERMS_AND_CONDITIONS}
                color="primary"
              >
                Privacy Policy
              </NextUILink>
              .
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

const LoginForm = ({ onLoginSuccess }: { onLoginSuccess?: () => void }) => {
  const schema = z.object({
    email: validator.email,
    password: validator.password,
  });
  const { setToken } = useAuthStore();
  const { t } = useTranslation();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.seller.login,
    onSuccess: (data) => {
      setToken(data);
      toast({
        title: t('login.successToasts.title'),
        description: t('login.successToasts.description'),
      });
      onLoginSuccess?.();
    },
    onError: (error: any) => {
      if (error.response?.data?.message === 'EMAIL_NOT_FOUND') {
        toast({
          title: t('login.errorToasts.accountNotFound.title'),
          description: t('login.errorToasts.accountNotFound.description'),
          variant: 'destructive',
        });
        return;
      }
      if (error.response?.data?.message === 'INVALID_PASSWORD') {
        toast({
          title: t('login.errorToasts.invalidCredentials.title'),
          description: t('login.errorToasts.invalidCredentials.description'),
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: t('login.errorToasts.genericError.title'),
        description: t('login.errorToasts.genericError.description'),
        variant: 'destructive',
      });
    },
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label={t('login.form.email')}
            type="email"
            isInvalid={!!error}
            errorMessage={error?.message}
            //  startContent={<Mail className="text-default-400" size={16} />}
          />
        )}
      />
      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label={t('login.form.password')}
            type="password"
            isInvalid={!!error}
            errorMessage={error?.message}
            // startContent={<Lock className="text-default-400" size={16} />}
          />
        )}
      />

      <div className="text-end">
        <NextUILink
          size="sm"
          as={Link}
          to="/auth/forget-password"
          color="primary"
        >
          {t('login.form.forgetPassword')}
        </NextUILink>
      </div>

      <div className="pt-4 flex items-center justify-center">
        <Button
          type="submit"
          color="primary"
          isLoading={isPending}
          className="w-[250px]"
        >
          {t('login.form.submitButton')}
        </Button>
      </div>
    </form>
  );
};
