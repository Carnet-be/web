import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoaderButton } from '@/components/ui/loader-button';
import { useToast } from '@/components/ui/use-toast';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import useAuthStore from '@/state/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import forgotPasswordAnimation from '@/assets/ForgotPasswordAnimation.json';
import { PasswordInput } from '@/components/ui/password-input.tsx';
import Lottie from 'lottie-react';

export default function ResetPassword() {
  const { t } = useTranslation();

  return (
    <AuthLayout pageType="reset-password">
      <div className="container relative flex flex-col items-center justify-center px-4 lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="flex justify-center mb-6">
          <div className="w-96 h-60">
            <Lottie animationData={forgotPasswordAnimation} loop={true} />
          </div>
        </div>

        <div className="lg:px-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('resetPassword.title')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('resetPassword.subtitle')}
            </p>
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const schema = z
    .object({
      password: z.string().min(8, t('resetPassword.passwordTooShort')),
      confirmPassword: z.string().min(8, t('resetPassword.passwordTooShort')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('resetPassword.passwordsDontMatch'),
      path: ['confirmPassword'],
    });

  const { setToken } = useAuthStore();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');
  const navigate = useNavigate();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { password: string; token: string }) =>
      authService.seller.resetPassword(data),
    onSuccess: (response) => {
      const { token, role } = response.data;
      setToken({ token, role });
      setIsSubmitted(true);
      // toast({
      //   title: t('common.success'),
      //   description: t('resetPassword.successMessage'),
      // });
    },
    onError: (error: any) => {
      if (error.response?.data?.message === 'Invalid or expired token') {
        setShowErrorMessage(true);
        setTimeout(() => {
          navigate('/auth/forget-password');
        }, 5000);
        return;

        // toast({
        //   title: t('common.error'),
        //   description: t('resetPassword.invalidToken'),
        //   variant: 'destructive',
        // });
        // return;
      }
      toast({
        title: t('common.error'),
        description: t('resetPassword.genericError'),
        variant: 'destructive',
      });
      setTimeout(() => {
        navigate('/auth/forget-password');
      }, 5000);
    },
  });

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (resetToken) {
      mutate({ password: data.password, token: resetToken });
    } else {
      toast({
        title: t('common.error'),
        description: t('resetPassword.noTokenError'),
        variant: 'destructive',
      });
    }
  };

  // Show success message when password changed successfully
  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center p-4 bg-green-100 rounded-lg text-green-700">
        <p className="text-sm">{t('resetPassword.successMessage')}</p>
      </div>
    );
  }

  // Conditionally render either the form or the error message
  return showErrorMessage ? (
    <div className="flex items-center justify-center p-4 bg-red-100 rounded-lg text-red-700">
      <p className="text-md">{t('resetPassword.errorMessage')}</p>
    </div>
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 text-left"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2">
                {t('resetPassword.newPassword')}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t('resetPassword.newPasswordPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2">
                {t('resetPassword.confirmPassword')}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 flex items-center justify-center">
          <LoaderButton
            isLoading={isPending}
            type="submit"
            className="w-[250px]"
          >
            {t('resetPassword.resetButton')}
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
};
