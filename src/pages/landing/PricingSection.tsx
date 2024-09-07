import React from 'react';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Lite',
    price: 29,
    period: 'Month',
    description: 'This is our most affordable plan to get started!',
    features: ['Unlimited sending', 'Email marketing', 'Send newsletters', 'Up to 5 users'],
  },
  {
    name: 'Plus',
    price: 89,
    period: 'Month',
    description: '89% of our clients choose this plan. Get the best value.',
    features: ['Unlimited sending', 'Email marketing', 'Send newsletters', 'Up to 25 users'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 159,
    period: 'Month',
    description: 'For larger businesses or those seeking advanced services.',
    features: ['Unlimited sending', 'Email marketing', 'Send newsletters', 'Up to 50 users'],
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-12 mt-16" id="pricing-section">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">No contracts, no surprise fees.</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`max-w-xs w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${plan.popular ? 'border-2 border-yellow-500 dark:border-yellow-400' : ''}`}
            >
              <div className={`mb-4 ${plan.popular ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-800 dark:text-gray-100'} text-xl font-semibold`}>{plan.name}</div>
              <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                ${plan.price} <span className="text-lg text-gray-500 dark:text-gray-400">/ {plan.period}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">{plan.description}</p>
              <ul className="mt-4 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                    <span className="inline-block w-3 h-3 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 px-4 rounded ${plan.popular ? 'bg-orange-500 dark:bg-orange-600 text-white' : 'bg-yellow-300 dark:bg-yellow-500 text-white'} hover:opacity-90 transition-opacity duration-300`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
