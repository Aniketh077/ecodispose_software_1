import React from 'react';
import { Truck, Shield, CircleCheck as CheckCircle, Leaf, Award, RefreshCw } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Quality Tested',
      description: 'Every device goes through rigorous 40-point quality checks and certification'
    },
    {
      icon: Shield,
      title: 'Certified Warranty',
      description: 'Up to 12 months warranty on all certified refurbished electronics'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Reduce e-waste and carbon footprint with sustainable refurbished tech'
    },
    {
      icon: Award,
      title: 'Great Savings',
      description: 'Save up to 60% compared to brand new devices with same quality'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Why Choose Refurbished?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Premium quality electronics at unbeatable prices. Good for your wallet, great for the planet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-xl">
                <benefit.icon className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;