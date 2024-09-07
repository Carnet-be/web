import { Button } from '@/components/ui/button';
import React from 'react';

const SimpleSection: React.FC = () => {
return (
<section className="bg-white dark:bg-gray-900 py-10 px-4 mt-16">
    <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Build Your Online Store Effortlessly
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            With our SaaS platform, creating and managing your online store is easier than ever. Customize your shop,
            add products, and start selling quickly all without worrying about the technical details. Let us handle the
            complexities while you focus on growing your business.
        </p>
        <Button
            className="mt-8 bg-orange-500 text-white p-6 font-semibold text-lg rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-500">
            Start Your Free Trial
        </Button>
    </div>
</section>

);
};

export default SimpleSection;
