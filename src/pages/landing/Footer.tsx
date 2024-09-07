import { Facebook, Instagram, Linkedin } from 'lucide-react';
import React from 'react';
import { useTheme } from '@/themeProvider';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-600', 'py-8 px-4 mt-16')}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Column 1: Logo and Subscribe */}
          <div className="mb-6 md:mb-0">
            <img
              src={theme === 'dark' ? '/logo/logo_white.svg' : '/logo/logo_black.svg'}
              alt="logo"
              className="w-20 h-20 mb-2"
            />
            <p className="mb-4">Your Tagline</p>
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Subscribe Now</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className={cn(
                    'p-2 border rounded-l-lg focus:outline-none flex-grow',
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'
                  )}
                />
                <button className="bg-orange-500 text-white p-2 rounded-r-lg">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Column 2: Information */}
          <div className="mb-6 md:mb-0 ml-14">
            <h4 className="text-md font-bold mb-2">Information</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">More Search</a></li>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Blog</a></li>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Testimonials</a></li>
              <li><a href="#" className="hover:text-orange-500">Events</a></li>
            </ul>
          </div>

          {/* Column 3: Helpful Links */}
          <div className="mb-6 md:mb-0 ml-4">
            <h4 className="text-md font-bold mb-2">Helpful Links</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Services</a></li>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Supports</a></li>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Our Services */}
          <div className="mb-6 md:mb-0 ml-4">
            <h4 className="text-md font-bold mb-2">Our Services</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Brands List</a></li>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Order</a></li>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Return & Exchange</a></li>
              <li className="mb-2"><a href="#" className="hover:text-orange-500">Fashion List</a></li>
              <li><a href="#" className="hover:text-orange-500">Blog</a></li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div>
            <h4 className="text-md font-bold mb-2">Contact Us</h4>
            <p className="mb-2"><i className="fas fa-phone"></i> +91 9999 999 999</p>
            <p className="mb-4"><i className="fas fa-envelope"></i> youremail@id.com</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-500 text-orange-500"><Instagram /></a>
              <a href="#" className="hover:text-gray-500 text-orange-500"><Facebook /></a>
              <a href="#" className="hover:text-gray-500 text-orange-500"><Linkedin /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm mr-4">© {currentYear} Corposup. All Rights Reserved.</p>
          <p className="text-sm">
            <a href="#" className="hover:text-orange-500">FAQ</a> | <a href="#" className="hover:text-orange-500">Privacy</a> | <a href="#" className="hover:text-orange-500">Terms & Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
