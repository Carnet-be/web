import { useToast } from '@/components/ui/use-toast';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import forgotPasswordAnimation from '@/assets/ForgotPasswordAnimation.json';
import { Button, Input } from '@nextui-org/react';
import Lottie from 'lottie-react';

export default function ForgetPassword() {
  const { t } = useTranslation();

  return (
    <AuthLayout pageType="forget-password">
      <div className="flex justify-center mb-6">
        <div className="w-full">
          <Lottie animationData={forgotPasswordAnimation} loop={true} />
        </div>
      </div>

      <div className="lg:px-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6  text-center">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl my-0 font-semibold tracking-tight">
              {t('forgetPassword.title')}
            </h1>
            <p className="text-sm text-muted-foreground my-0">
              {t('forgetPassword.subtitle')}
            </p>
          </div>
          <ForgetPasswordForm />
        </div>
      </div>
    </AuthLayout>
  );
}

const ForgetPasswordForm = () => {
  const { t } = useTranslation();

  const schema = z.object({
    email: z.string().email('Invalid email address'),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.seller.forgotPassword,
    onSuccess: () => {
      setIsSubmitted(true);
      // toast({
      //   title: t('forgetPassword.toast.success.title'),
      //   description: t('forgetPassword.toast.success.description'),
      // });
    },
    onError: (error: any) => {
      if (error.response?.data?.message === 'Email_NOT_FOUND') {
        toast({
          title: t('forgetPassword.toast.emailNotFound.title'),
          description: t('forgetPassword.toast.emailNotFound.description'),
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: t('forgetPassword.toast.error.title'),
        description: t('forgetPassword.toast.error.description'),
        variant: 'destructive',
      });
    },
  });

  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate(data);
  };

  // Show success message when form is successfully submitted
  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center p-4 bg-green-100 rounded-lg text-green-700">
        <p className="text-sm">{t('forgetPassword.successMessage')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3 text-left"
    >
      <div>
        <Input
          label={t('forgetPassword.emailLabel')}
          placeholder={t('forgetPassword.emailPlaceholder')}
          {...form.register('email')}
          errorMessage={form.formState.errors.email?.message}
        />
      </div>

      <div className="pt-4 flex items-center justify-center">
        <Button
          color="primary"
          isLoading={isPending}
          type="submit"
          className="w-[250px]"
        >
          {t('forgetPassword.submitButton')}
        </Button>
      </div>
    </form>
  );
};
