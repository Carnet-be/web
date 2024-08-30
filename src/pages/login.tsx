import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/sections/auth/authLayout.tsx';
import EcommerceImageLogin from '@/assets/ecommerce-login.png';
import OkeyoLogo from '@/assets/okeyo-logo.png'

export default function Login() {
  return (
    <AuthLayout>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-black" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src={OkeyoLogo}
              alt="okeyo"
              className="w-24 h-24 object-contain"
            />
          </div>
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
                &ldquo; Welcome to your best e-commerce SaaS application where you can begin your business and manage
                it &rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to sign in
              </p>
            </div>
            <form className="space-y-4" action="#" method="POST">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to={'/auth/register'}
                className="underline underline-offset-4 hover:text-primary font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
