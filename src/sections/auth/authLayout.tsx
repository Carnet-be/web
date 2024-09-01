import React from 'react';
import { ModeToggle } from '@/sections/dashboard/themeSwitcher';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
