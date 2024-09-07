import EcommerceImageRegister from '@/assets/ecommerce-register.png';
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
import { PhoneInput } from '@/components/ui/phone-input';
import { useToast } from '@/components/ui/use-toast';
import i18n from '@/i18n';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import authService from '@/services/auth.service';
import useAuthStore from '@/state/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
export default function Register() {
  return (
    <AuthLayout pageType="register">
      <div className="container relative flex flex-col items-center justify-center h-screen px-4 lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8 h-full">
          <div className="mx-auto flex w-full h-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create an account
              </p>
            </div>
            <RegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to={'/auth/login'}
                className="underline underline-offset-4 hover:text-primary font-medium"
              >
                Sign In
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
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-black" />
          <div className="relative z-20 flex-1 flex items-center justify-center">
            <img
              src={EcommerceImageRegister}
              alt="Ecommerce"
              className="w-8/12	h-8/12 object-contain"
            />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-center">
                &ldquo; Welcome to your best e-commerce SaaS application when
                you can begin your business and manage it &rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

const RegisterForm = () => {
  const schema = z
    .object({
      firstName: z
        .string()
        .min(3, 'Too short, minimum 3 characters')
        .max(255, 'Too long'),
      phoneNumber: z.string().optional(),
      lastName: z
        .string()
        .min(3, 'Too short, minimum 3 characters')
        .max(255, 'Too long'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(8, 'Too short, minimum 8 characters'),
      confirmPassword: z.string().min(8, 'Too short, minimum 8 characters'),
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

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: undefined,
      confirmPassword: '',
    },
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput placeholder="Type your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-2">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-4 flex items-center justify-center">
          <LoaderButton
            isLoading={isPending}
            type="submit"
            className="w-[250px]"
          >
            Create Account
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
};
