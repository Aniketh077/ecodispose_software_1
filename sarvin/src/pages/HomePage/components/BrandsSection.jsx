import React from 'react';
import { Link } from 'react-router-dom';

const BrandsSection = ({ types }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Shop by Brand</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse products from your favorite trusted brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {types.map((type) => (
            <Link
              key={type.id || type._id}
              to={`/products?types=${encodeURIComponent(type.name)}`}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="text-center w-full">
                {type.logo ? (
                  <div className="w-full h-20 mx-auto mb-3 flex items-center justify-center">
                    <img
                      src={type.logo}
                      alt={type.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-16 h-16 bg-gray-100 rounded-full items-center justify-center group-hover:bg-[#EBF5FF] transition-colors">
                      <span className="text-2xl font-bold text-[#2A4365]">
                        {type.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#EBF5FF] transition-colors">
                    <span className="text-2xl font-bold text-[#2A4365]">
                      {type.name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#2A4365] transition-colors block">
                  {type.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
