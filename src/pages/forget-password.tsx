
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import AuthLayout from '@/sections/auth/authLayout';

export default function ForgetPassword() {
  const schema = z.object({
    email: z.string().email('Invalid email address'),
  });

  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { email: string }) => {
    console.log('Password reset request for email:', data.email);
    // You can handle the password reset logic here
  };

  return (
    <AuthLayout pageType="forget-password">
      <div className="container relative flex flex-col items-center justify-center h-screen px-4 lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:px-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Reset your password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to receive a password reset link
              </p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...form.register('email')}
                  type="email"
                  placeholder="Type your email"
                  className="input"
                />
                <p className="text-red-500">
                  {form.formState.errors.email?.message}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
            <p className="text-sm text-muted-foreground text-center">
              <Link to="/auth/login" className="underline-offset-4 hover:text-primary font-medium">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
