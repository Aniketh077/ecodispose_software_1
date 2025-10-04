import React from 'react';
import { Link } from 'react-router-dom';

const BrandsSection = ({ types }) => {
  // Add safety checks to prevent React child errors
  if (!types || !Array.isArray(types) || types.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Shop by Brand</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse certified refurbished products from your favorite trusted brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {types.map((type) => {
            // Ensure we have valid data before rendering
            const typeId = type._id || type.id;
            const typeName = type.name || 'Unknown Brand';
            const typeLogo = type.logo;

            if (!typeId || !typeName) {
              return null;
            }

            return (
              <Link
                key={typeId}
                to={`/products?types=${encodeURIComponent(typeName)}`}
                className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-center w-full">
                  {typeLogo ? (
                    <div className="w-full h-20 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={typeLogo}
                        alt={typeName}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-16 h-16 bg-gray-100 rounded-full items-center justify-center group-hover:bg-green-50 transition-colors">
                        <span className="text-2xl font-bold text-green-700">
                          {typeName.charAt(0)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                      <span className="text-2xl font-bold text-green-700">
                        {typeName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors block">
                    {typeName}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;