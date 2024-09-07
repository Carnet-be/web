import EcommerceImageLogin from '@/assets/ecommerce-login.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderButton } from '@/components/ui/loader-button';
import { PasswordInput } from '@/components/ui/password-input';
import { useToast } from '@/components/ui/use-toast';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import useAuthStore from '@/state/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

export default function Login() {
  return (
    <AuthLayout pageType="login">
      <div className="container relative flex flex-col items-center justify-center h-screen px-4 lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-black" />
          <div className="relative z-20 flex-1 flex items-center justify-center">
            <img
              src={EcommerceImageLogin}
              alt="Ecommerce"
              className="w-11/12 h-11/12 object-contain"
            />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-center">
                &ldquo; Welcome to your best e-commerce SaaS application where
                you can begin your business and manage it &rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:px-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to sign in
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to={'/auth/register'}
                className="underline underline-offset-4 hover:text-primary font-medium"
              >
                Sign Up
              </Link>
            </p>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By continuing, you agree to our{' '}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
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
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Too short, minimum 8 characters'),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Type your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Type your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-end text-sm text-muted-foreground">
          <Link
            to={'/auth/forget-password'}
            className="underline-offset-4 hover:text-primary font-medium"
          >
            Forget Password ?
          </Link>
        </p>

        <div className="pt-4 flex items-center justify-center">
          <LoaderButton
            isLoading={isPending}
            type="submit"
            className="w-[250px]"
          >
            Login
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
};
