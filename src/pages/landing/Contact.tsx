import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import { Header } from "./Header";
import Footer from "./Footer";
import { cn } from "@/lib/utils";
import { useTheme } from "@/themeProvider";

export function ContactSection() {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <div className={cn("py-16 mt-20", theme === 'dark' ? 'bg-gray-900 text-gray-200' : ' text-gray-900')}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Get in Touch with Us</h2>
          <p className="mt-2">
            Have questions or need help? Our team is here to assist you. Reach out to us, and we’ll get back to you
            as soon as possible.
          </p>
        </div>

        <div className="container mx-auto px-4 lg:px-40 flex flex-col lg:flex-row gap-8">
          {/* Left Section - Contact Information */}
          <div className={cn("bg-white shadow-lg p-8 rounded-lg flex-1", theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900')}>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-8">
              We're here to answer any questions you may have about setting up your online shop. Reach out to us,
              and we'll respond promptly.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className={cn("w-6 h-6 mr-4", theme === 'dark' ? 'text-orange-400' : 'text-orange-500')} />
                <div>
                  <h4 className="font-medium">Our Office</h4>
                  <p>123 SaaS Street, Tech City, USA</p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className={cn("w-6 h-6 mr-4", theme === 'dark' ? 'text-orange-400' : 'text-orange-500')} />
                <div>
                  <h4 className="font-medium">Phone Support</h4>
                  <p>+1-800-SHOP-SUPPORT</p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className={cn("w-6 h-6 mr-4", theme === 'dark' ? 'text-orange-400' : 'text-orange-500')} />
                <div>
                  <h4 className="font-medium">Email Us</h4>
                  <a href="mailto:support@saasplatform.com" className="text-gray-600">support@saasplatform.com</a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium mb-4">Follow Us:</h4>
              <div className="flex space-x-4">
                <a href="#" className={cn("hover:text-gray-500", theme === 'dark' ? 'text-orange-400' : 'text-orange-500')}>
                  <Instagram />
                </a>
                <a href="#" className={cn("hover:text-gray-500", theme === 'dark' ? 'text-orange-400' : 'text-orange-500')}>
                  <Facebook />
                </a>
                <a href="#" className={cn("hover:text-gray-500", theme === 'dark' ? 'text-orange-400' : 'text-orange-500')}>
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Send a Message */}
          <div className={cn("bg-white shadow-lg p-8 rounded-lg flex-1", theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900')}>
            <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
            <p className="mb-8">
              Need further assistance? Fill out the form below, and our team will get back to you shortly.
            </p>
            <form>
              <div className="space-y-4">
                <Input placeholder="Your Name" className={theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white'} />
                <Input placeholder="Your Email Address" type="email" className={theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white'} />
                <Textarea placeholder="How can we help you?" rows={4} className={theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white'} />
              </div>
              <Button type="submit" className="mt-6 bg-orange-500 hover:bg-orange-600 text-white w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="mt-16 px-4 lg:px-24">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.410225570014!2d-6.837084084370255!3d34.02302338038391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b76c38d46b9%3A0x82b8bfc634ff5e5b!2sTechnopark%2C%20Casablanca!5e0!3m2!1sen!2sus!4v1637235562833!5m2!1sen!2sus"
            width="100%" height="450" loading="lazy" title="Technopark Location" />
        </div>
      </div>
      <Footer />
    </>
  );
}
