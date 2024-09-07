import React from 'react';

const testimonials = [
  {
    quote: "After using this, I cannot imagine going back to the old way of doing things.",
    author: "Mathew",
    handle: "@heymatt_oo",
    imageUrl: "/path/to/avatar1.jpg", // Remplacez par le chemin réel de l'image
  },
  {
    quote: "This is the best thing since sliced bread. I cannot believe I did not think of it myself.",
    author: "Parl Coppa",
    handle: "@coppalipse",
    imageUrl: "/path/to/avatar2.jpg", // Remplacez par le chemin réel de l'image
  },
  {
    quote: "Can easily recommend!",
    author: "Alex",
    handle: "@alex",
    imageUrl: "/path/to/avatar3.jpg", // Remplacez par le chemin réel de l'image
  },
  {
    quote: "Perfect for my use case",
    author: "Joshua",
    handle: "@joshua",
    imageUrl: "/path/to/avatar4.jpg", // Remplacez par le chemin réel de l'image
  },
  {
    quote: "Excellent product!",
    author: "Mandy",
    handle: "@mandy",
    imageUrl: "/path/to/avatar5.jpg", // Remplacez par le chemin réel de l'image
  },
  {
    quote: "I am very happy with the results.",
    author: "Sam",
    handle: "@sama",
    imageUrl: "/path/to/avatar6.jpg", // Remplacez par le chemin réel de l'image
  },
];

const SuccessStories: React.FC = () => {
  return (
    <section className="bg-[#fdedd021] dark:bg-gray-900 py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Start Building Your Success Story Today!</h3>
          <p className="text-gray-700 dark:text-gray-300">Join our platform to create your own online shop and experience the same satisfaction as our successful customers. Our easy-to-use tools and powerful features will help you achieve your business goals.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-start">
              <p className="text-gray-800 dark:text-gray-100 font-semibold mb-4">“{testimonial.quote}”</p>
              <div className="flex items-center">
                <img src={testimonial.imageUrl} alt={testimonial.author} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="text-gray-900 dark:text-white font-bold">{testimonial.author}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-orange-500 text-white py-3 px-6 rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-800">
          Read more testimonials
        </button>
      </div>
    </section>
  );
};

export default SuccessStories;
