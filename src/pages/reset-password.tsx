import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { LoaderButton } from '@/components/ui/loader-button';
import { useToast } from '@/components/ui/use-toast';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import useAuthStore from '@/state/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import Lottie from 'lottie-react';
import forgotPasswordAnimation from '@/assets/ForgotPasswordAnimation.json';
import { PasswordInput } from '@/components/ui/password-input.tsx';

export default function ResetPassword() {
  return (
    <AuthLayout pageType="reset-password">
      <div className="container relative flex flex-col items-center justify-center h-[88vh] px-4 lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="flex justify-center mb-6">
          <div className="w-96 h-60">
            <Lottie animationData={forgotPasswordAnimation} loop={true} />
          </div>
        </div>

        <div className="lg:px-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset your password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter a new Password below to reset it
            </p>
            <ResetPasswordForm />
            <p className="text-sm text-muted-foreground text-center">
              <Link to={'/auth/login'} className="underline underline-offset-4 hover:text-primary font-medium flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

const ResetPasswordForm = () => {
  const schema = z.object({
    password: z.string().min(8, 'Too short, minimum 8 characters'),
    confirmPassword: z.string().min(8, 'Too short, minimum 8 characters'),
  })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
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
      //   title: 'Success',
      //   description: 'Password has been reset successfully',
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
        //   title: 'Error',
        //   description: 'Invalid or Expired token',
        //   variant: 'destructive',
        // });
        // return;
      }
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
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
        title: 'Error',
        description: 'No token found, please request a password reset again',
        variant: 'destructive',
      });
    }
  };

  // Show success message when password changed successfully
  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center p-4 bg-green-100 rounded-lg text-green-700">
        <p className="text-sm">Password has been reset successfully!</p>
      </div>
    );
  }

  // Conditionally render either the form or the error message
  return showErrorMessage ? (
    <div className="flex items-center justify-center p-4 bg-red-100 rounded-lg text-red-700">
      <p className="text-md">There was a mistake in your request. Please try again.</p>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 text-left">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2">New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Type your new password" {...field} />
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
              <FormLabel className="pl-2">Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm your new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 flex items-center justify-center">
          <LoaderButton isLoading={isPending} type="submit" className="w-[250px]">
            Reset Password
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
};