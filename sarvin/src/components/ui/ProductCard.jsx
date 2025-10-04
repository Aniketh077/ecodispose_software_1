import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-yellow-500 fill-yellow-500"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex">
          <div className="w-48 h-48 flex-shrink-0">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </Link>
          </div>
          <div className="flex-1 p-6">
            <Link to={`/product/${product._id}`}>
              <h3 className="text-lg font-semibold mb-2 hover:text-green-700">
                {product.name}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {renderStars(product.rating || 0)}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviewCount || 0})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-green-700">
                      ₹{product.discountPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ₹{product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-green-700">
                    ₹{product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <div className="aspect-square bg-gray-50 p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
            {discountPercentage}% OFF
          </div>
        )}
        {product.newArrival && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded">
            CERTIFIED
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">
          {product.type?.name || product.type || 'Refurbished'}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold mb-2 line-clamp-2 hover:text-green-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {renderStars(product.rating || 0)}
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviewCount || 0})
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          {product.discountPrice ? (
            <div>
              <span className="text-lg font-bold text-green-700">
                ₹{product.discountPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ₹{product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-green-700">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;