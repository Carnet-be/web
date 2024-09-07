import React from 'react';
import FeatureCards from './FeatureCard';
import HowItWorks from './HowItWorks';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import SimpleSection from './SimpleSection';
import SuccessStories from './SuccessStories';
import PricingSection from './PricingSection';

// Define the props for the Section component
interface ImageContentSectionProps {
imageSrc: string;
title: string;
description: string;
}

// The Section component
const ImageContentSection: React.FC<ImageContentSectionProps> = ({ imageSrc, title, description }) => {
    return (
    <section className="py-16 dark:bg-gray-900 mt-56" id='About-section'>
        <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto px-6">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-6">
                <img src={imageSrc} alt={title}
                    className="w-full h-auto  rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-200 transition-transform duration-300 ease-in-out" />
            </div>

            <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4 mx-8 text-gray-900 dark:text-gray-100">{title}</h2>
                <p className="text-lg text-gray-600 mx-8 dark:text-gray-400">{description}</p>
                <ul className="mt-6 mx-8 space-y-4 ">
                    <li className="items-center ml-4 flex">
                        <CheckCircle className="text-yellow-500 w-6 h-6 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">User-Friendly Interface</span>
                    </li>
                    <li className=" flex items-center ml-4">
                        <ShieldCheck className="text-yellow-500 w-6 h-6 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">Advanced Security Features</span>
                    </li>
                </ul>

            </div>
        </div>
    </section>

    );
    };

    // The Main component
    export const Main: React.FC = () => {
    return (
    <>
        <main className="text-center pt-24 px-10 md-p-0 bg-[#fdedd021] dark:bg-gray-900 text-gray-900 dark:text-gray-200 ">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
                {/* Text Section */}
                <div>
                    <h1 className="text-5xl font-bold my-6">
                        Launch Your Online Shop Today
                    </h1>
                    <p className="text-lg mb-10">
                        Say goodbye to complexity and hello to success. Build your online shop, streamline your
                        business, and create your dream store effortlessly.
                    </p>
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            className="bg-yellow-400 font-medium text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:text-gray-800">
                            Start My Shop
                        </button>
                        <button
                            className="bg-transparent border-2 font-medium border-yellow-400 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                            How It Works
                        </button>

                    </div>
                </div>
                {/* Image Section */}
                <div className="hidden md:flex justify-center">
                    <img src="/HomepageImages/home1.png" alt="App Preview" className="w-3/4" />
                </div>
            </div>
            
        </main>
         <FeatureCards />
        <ImageContentSection imageSrc="/HomepageImages/pageaccueil.jpg" title="Why Choose Us?"
            description="Our platform provides a seamless and efficient solution for creating and managing your online store. With user-friendly tools, customizable templates, and dedicated support, you can quickly build a professional-looking shop and start selling with ease." />
        <HowItWorks />
        <SimpleSection />
        <SuccessStories />
        <PricingSection />
    </>
    );
    };

    export default Main;
