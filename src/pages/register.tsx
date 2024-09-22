import { useToast } from '@/components/ui/use-toast';
import i18n from '@/i18n';
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

export default function Register() {
  return (
    <AuthLayout pageType="register">
      <div className="container relative flex items-center justify-center px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-gray-500">
              Enter your details below to create an account
            </p>
          </div>
          <RegisterForm />
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <NextUILink size="sm" as={Link} to="/auth/login" color="primary">
              Sign In
            </NextUILink>
          </p>
          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <NextUILink size="sm" as={Link} to="/terms" color="primary">
              Terms of Service
            </NextUILink>{' '}
            and{' '}
            <NextUILink size="sm" as={Link} to="/privacy" color="primary">
              Privacy Policy
            </NextUILink>
            .
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

const RegisterForm = () => {
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
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });
  const { setToken } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.seller.register,
    onSuccess: (data) => {
      setToken(data);
      toast({
        title: 'Account created',
        description: 'We have sent you an email to verify your account',
      });
    },
    onError: (error: any) => {
      //error can be
      //return res.status(409).json({ status: 'error', message: 'Email already exists' });
      if (error.response?.data?.message === 'Email already exists') {
        toast({
          title: 'Error',
          description: 'Email already associated with an account',
          variant: 'destructive',
        });
        return;
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred, please try again or contact support',
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
              label="First Name"
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
              //  startContent={<UserIcon className="h-5 w-5 text-gray-400" />}
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
              label="Last Name"
              isInvalid={!!error}
              errorMessage={error?.message}
              //   startContent={<UserIcon className="h-5 w-5 text-gray-400" />}
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
            label="Email"
            isRequired
            type="email"
            isInvalid={!!error}
            errorMessage={error?.message}
            //   startContent={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
          />
        )}
      />
      <Controller
        control={form.control}
        name="phoneNumber"
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="Phone Number"
            isRequired
            isInvalid={!!error}
            errorMessage={error?.message}
            type="tel"
            // placeholder="+1234567890"
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
              label="Password"
              isRequired
              type="password"
              isInvalid={!!error}
              errorMessage={error?.message}
              // startContent={
              //   <LockClosedIcon className="h-5 w-5 text-gray-400" />
              // }
            />
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label="Confirm Password"
              type="password"
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
              // startContent={
              //   <LockClosedIcon className="h-5 w-5 text-gray-400" />
              // }
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
          Create Account
        </Button>
      </div>
    </form>
  );
};
