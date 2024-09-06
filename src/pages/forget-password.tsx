import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { LoaderButton } from '@/components/ui/loader-button';
import { useToast } from '@/components/ui/use-toast';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import Lottie from 'lottie-react';
import forgotPasswordAnimation from '@/assets/ForgotPasswordAnimation.json';

export default function ForgetPassword() {
  return (
    <AuthLayout pageType="forget-password">
      <div className="container relative flex flex-col items-center justify-center h-[85vh] px-4 lg:max-w-none lg:grid-cols-1 lg:px-0">
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
              Enter your email to receive a password reset link
            </p>
            <ForgetPasswordForm />
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

const ForgetPasswordForm = () => {
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
      //   title: 'Success',
      //   description: 'Password reset link has been sent to your email',
      // });
    },
    onError: (error: any) => {
      if (error.response?.data?.message === 'Email_NOT_FOUND') {
        toast({
          title: 'Error',
          description: 'Email not found, Try again with an existing email.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
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
        <p className="text-sm">Password reset link has been sent to your email!</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 text-left">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2">Email</FormLabel>
              <FormControl>
                <Input placeholder="Type your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 flex items-center justify-center">
          <LoaderButton isLoading={isPending} type="submit" className="w-[250px]">
            Send Reset Link
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
};