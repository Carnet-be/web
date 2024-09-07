import { KeyRound, MonitorCog, Rocket, UserRoundCog } from 'lucide-react';
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-[#fdedd021] dark:bg-gray-900 text-center mt-20" id='how-it-works'>
    <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">How It Works</h2>
    <p className="text-lg mb-12 text-gray-600 dark:text-gray-400">Follow these simple steps to get your online shop up and running in no time.</p>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      {/* Step 1 */}
      <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md w-full lg:w-72 transition-transform transform hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4 text-yellow-400 dark:text-yellow-400 flex items-center">
          <KeyRound className="w-6 h-8 mr-4"/>
          Sign Up
        </h3>
        <p className="text-gray-600 dark:text-gray-300">Create your account and choose a plan that suits your needs.</p>
      </div>
      {/* Step 2 */}
      <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md w-full lg:w-72 transition-transform transform hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4 text-orange-400 dark:text-orange-400 flex items-center">
          <MonitorCog className="w-6 h-8 mr-4"/>
          Design Your Shop
        </h3>
        <p className="text-gray-600 dark:text-gray-300">Use our drag-and-drop tools to design and customize your online shop.</p>
      </div>
      {/* Step 3 */}
      <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md w-full lg:w-72 transition-transform transform hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4 text-yellow-400 dark:text-yellow-400 flex items-center">
          <Rocket className="w-6 h-6 mr-4"/>
          Launch & Grow
        </h3>
        <p className="text-gray-600 dark:text-gray-300">Publish your store and start attracting customers. Use our analytics to track your growth.</p>
      </div>
      {/* Step 4 */}
      <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md w-full lg:w-72 transition-transform transform hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4 text-orange-400 dark:text-orange-400 flex items-center">
          <UserRoundCog className='mr-4' />
          Get Support
        </h3>
        <p className="text-gray-600 dark:text-gray-300">Access our 24/7 support team to assist you with any questions or issues.</p>
      </div>
    </div>
  </section>
  
  );
};

export default HowItWorks;
