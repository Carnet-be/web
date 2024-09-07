import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Clock10, Lock, Palette, Smartphone } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md text-center max-w-sm mx-auto">
    <CardHeader className="flex items-center justify-center space-x-4 mb-4">
      <div className="text-3xl text-orange-400">{icon}</div>
      <div>
        <CardTitle className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          {description}
        </CardDescription>
      </div>
    </CardHeader>
  </Card>
  );
};

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: <Palette /> as React.ReactNode, 
      title: 'Easy Customization',
      description: 'Tailor your shop to reflect your brand with intuitive drag-and-drop tools.',
    },
    {
      icon: <Smartphone /> as React.ReactNode,
      title: 'Mobile-Ready Designs',
      description: 'Reach customers on any device with fully responsive and beautiful templates.',
    },
    {
      icon: <Lock /> as React.ReactNode,
      title: 'Secure Payments',
      description: 'Accept payments confidently with built-in security and multiple payment options.',
    },
    {
      icon: <Clock10 /> as React.ReactNode,
      title: '24/7 Support',
      description: 'Get the help you need, whenever you need it, with round-the-clock customer support.',
    },
  ];

  return (
    <div className="flex justify-center items-center  mx-10 scroll-mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
