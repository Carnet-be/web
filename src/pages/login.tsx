// Assuming you have a custom useToast hook
import { useToast } from '@/components/ui/use-toast';
import validator from '@/lib/validator';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import useAuthStore from '@/state/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link as NextUILink } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

export default function Login() {
  return (
    <AuthLayout pageType="login">
      <div className="container relative flex items-center justify-center px-4">
        <div className="w-full max-w-[350px]">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-gray-500">
                Enter your email and password below to sign in
              </p>
            </div>
            <LoginForm />
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <NextUILink
                size="sm"
                as={Link}
                to="/auth/register"
                color="primary"
              >
                Sign Up
              </NextUILink>
            </p>
            <p className="text-center text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <NextUILink size="sm" as={Link} to="/terms" color="primary">
                Terms of Service
              </NextUILink>{' '}
              and{' '}
              <NextUILink as={Link} size="sm" to="/privacy" color="primary">
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

const LoginForm = () => {
  const schema = z.object({
    email: validator.email,
    password: validator.password,
  });
  const { setToken } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.seller.login,
    onSuccess: (data) => {
      setToken(data);
      toast({
        title: 'Welcome',
        description: 'You have successfully logged in',
      });
    },
    onError: (error: any) => {
      //error can be
      //return res.status(409).json({ status: 'error', message: 'Email already exists' });
      if (error.response?.data?.message === 'EMAIL_NOT_FOUND') {
        toast({
          title: 'Error',
          description: 'Account not found',
          variant: 'destructive',
        });
        return;
      }
      if (error.response?.data?.message === 'INVALID_PASSWORD') {
        toast({
          title: 'Error',
          description: 'Invalid credentials',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Error',
        description: 'An error occurred, please try again or contact support',
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
            label="Email"
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
            label="Password"
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
          Forget Password?
        </NextUILink>
      </div>

      <div className="pt-4 flex items-center justify-center">
        <Button
          type="submit"
          color="primary"
          isLoading={isPending}
          className="w-[250px]"
        >
          Login
        </Button>
      </div>
    </form>
  );
};
