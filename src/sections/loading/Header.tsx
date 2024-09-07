import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { useTheme } from '@/themeProvider';
import { LanguageToggle } from './language';
import { Menu, X } from 'lucide-react';
import { ThemeProvider } from './TheameProvider';

const menuItems = [
  { to: '/', text: 'Home' },
  { to: '#how-it-works', text: 'About', isAbout: true },
  { to: '#pricing-section', text: 'Pricing', isPricing: true },
  { to: '/contact', text: 'Contact' },
];

export function Header({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getLogoSrc = () => {
    return theme === 'dark' ? '/logo/logo_white.svg' : '/logo/logo_black.svg';
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-colors duration-300',
        isScrolled
          ? theme === 'dark'
            ? 'bg-gray-900 text-gray-200 shadow-lg'
            : 'bg-white text-gray-900 shadow-lg'
          : theme === 'dark'
          ? 'bg-gray-900 text-gray-200'
          : 'bg-[#fdedd021] text-gray-900',
        className
      )}
      {...props}
    >
      <nav className="flex items-center justify-between py-6 p-4 lg:px-40">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={getLogoSrc()} alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Mobile Menu Toggle & Icons */}
        <div className="flex items-center lg:hidden">
          <LanguageToggle />
          <ThemeProvider />
          <button
            className="text-gray-600 focus:outline-none ml-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={cn(
            'lg:flex lg:items-center lg:space-x-8',
            isMobileMenuOpen ? 'block' : 'hidden',
            'absolute lg:static lg:flex bg-white lg:bg-transparent left-0 top-16 w-full lg:w-auto px-6 py-4 lg:p-0 shadow-lg lg:shadow-none'
          )}
        >
          <div className="lg:flex lg:items-center lg:space-x-8 space-y-4 lg:space-y-0 block">
            {menuItems.map(({ to, text, isPricing, isAbout }) =>
              isPricing ? (
                <a
                  key={to}
                  href={to}
                  onClick={(e) => handleScrollToSection(e, 'pricing-section')}
                  className={cn(
                    'block py-2 text-lg lg:py-0 lg:inline-block',
                    theme === 'dark' ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'
                  )}
                >
                  {text}
                </a>
              ) : isAbout ? (
                <a
                  key={to}
                  href={to}
                  onClick={(e) => handleScrollToSection(e, 'how-it-works')}
                  className={cn(
                    'block py-2 text-lg lg:py-0 lg:inline-block',
                    theme === 'dark' ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'
                  )}
                >
                  {text}
                </a>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'text-lg transition-colors block',
                      isActive
                        ? 'text-orange-500'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-orange-500'
                        : 'text-gray-600 hover:text-orange-500'
                    )
                  }
                >
                  {text}
                </NavLink>
              )
            )}

            {/* Desktop only: Language and Theme Toggles */}
            <div className="hidden lg:flex lg:items-center space-x-4">
              <LanguageToggle />
              <ThemeProvider />
            </div>
          </div>

          {/* Buttons for Login and Register */}
          <div className="flex flex-col space-y-4 mt-4 lg:mt-0 lg:flex-row lg:space-x-4 lg:space-y-0">
            <NavLink
              to="/login"
              className="border-2 border-orange-500 font-medium px-8 py-2 rounded-md hover:bg-orange-500 hover:text-white"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-orange-500 text-white px-8 py-2 rounded-md hover:bg-orange-600"
            >
              Register
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
