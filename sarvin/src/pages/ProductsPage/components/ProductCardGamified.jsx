import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Trophy, Gift, Timer, Eye, Flame, Crown, Sparkles } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';
import { useToast } from '../../../contexts/ToastContext';

const ProductCardGamified = ({ product, viewMode = 'grid', onView, userLevel = 1, showGamification = true }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [justViewed, setJustViewed] = useState(false);

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  // Gamification features
  const isHotDeal = discountPercentage > 30;
  const isNewArrival = product.newArrival;
  const isFeatured = product.featured;
  const isLowStock = product.stock > 0 && product.stock <= 3;
  const isHighRated = product.rating >= 4.5;

  // Level-based benefits
  const getLevelBenefit = () => {
    if (userLevel >= 5) return { text: 'VIP 5% Extra Off', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (userLevel >= 3) return { text: 'Level 3+ Bonus', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (userLevel >= 2) return { text: 'Level 2 Perk', color: 'text-green-600', bg: 'bg-green-100' };
    return null;
  };

  const levelBenefit = getLevelBenefit();

  const handleCardClick = () => {
    if (onView) {
      onView();
      setJustViewed(true);
      setShowPointsAnimation(true);
      setTimeout(() => setShowPointsAnimation(false), 2000);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(product, 1);
      showToast('Added to cart! +10 points earned!', 'success');
      
      // Trigger points animation
      setShowPointsAnimation(true);
      setTimeout(() => setShowPointsAnimation(false), 2000);
    } catch (error) {
      showToast('Please login to add items to cart', 'error');
    }
  };

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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 relative group">
        {/* Gamification Badges */}
        <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1">
          {isHotDeal && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
              <Flame className="h-3 w-3 mr-1" />
              HOT
            </div>
          )}
          {isHighRated && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Crown className="h-3 w-3 mr-1" />
              TOP
            </div>
          )}
          {levelBenefit && (
            <div className={`${levelBenefit.bg} ${levelBenefit.color} px-2 py-1 rounded-full text-xs font-bold flex items-center`}>
              <Trophy className="h-3 w-3 mr-1" />
              {levelBenefit.text}
            </div>
          )}
        </div>

        {/* Points Animation */}
        {showPointsAnimation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
              +5 points!
            </div>
          </div>
        )}

        <div className="flex">
          <div className="w-48 h-48 flex-shrink-0 relative">
            <Link to={`/product/${product._id}`} onClick={handleCardClick}>
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110 ${
                  product.stock === 0 ? 'opacity-50' : ''
                }`}
              />
            </Link>
            {product.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold rounded-md transform -rotate-12 shadow-lg">
                  SOLD OUT
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 p-6">
            <Link to={`/product/${product._id}`} onClick={handleCardClick}>
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
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center transform hover:scale-105 ${
                  product.stock === 0
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group relative transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gamification Badges */}
      {showGamification && (
        <>
          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
            {isHotDeal && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center animate-pulse shadow-lg">
                <Flame className="h-3 w-3 mr-1" />
                HOT DEAL
              </div>
            )}
            {isHighRated && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                <Crown className="h-3 w-3 mr-1" />
                TOP RATED
              </div>
            )}
            {isLowStock && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                ONLY {product.stock} LEFT!
              </div>
            )}
          </div>
          
          {/* Sparkle Effects */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="absolute top-4 right-4 h-4 w-4 text-yellow-400 animate-ping" />
            <Sparkles className="absolute bottom-4 left-4 h-3 w-3 text-blue-400 animate-ping" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="absolute top-1/2 left-1/2 h-2 w-2 text-purple-400 animate-ping" style={{ animationDelay: '1s' }} />
          </div>
        </>
      )}

      {/* Points Animation */}
      {showPointsAnimation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce shadow-lg">
            +5 points!
          </div>
        </div>
      )}

      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <div className="aspect-square bg-gray-50 p-4">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-contain transition-all duration-500 ${
                isHovered ? 'scale-110 rotate-1' : 'scale-100'
              } ${
                product.stock === 0 ? 'opacity-50' : ''
              }`}
            />
            
            {/* Hover Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-110">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            )}
          </div>
        </Link>
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold rounded-md transform -rotate-12 shadow-lg">
              SOLD OUT
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 relative">
        {/* Product Type */}
        <div className="text-xs text-gray-500 mb-1">
          {(() => {
            if (product && product.type) {
              if (typeof product.type === 'string' && product.type.trim()) {
                return product.type.trim();
              } else if (typeof product.type === 'object' && product.type.name) {
                return String(product.type.name).trim();
              }
            }
            return 'Certified Refurbished';
          })()}
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold mb-2 line-clamp-2 hover:text-green-700 transition-colors" onClick={handleCardClick}>
            {product && product.name ? String(product.name) : 'Product'}
          </h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {renderStars(product.rating || 0)}
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviewCount || 0})
            </span>
          </div>
          {isHighRated && (
            <div className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
              ⭐ TOP RATED
            </div>
          )}
        </div>
        
        {/* Price with Gamification */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {product.discountPrice ? (
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-lg font-bold text-green-700">
                    ₹{product.discountPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>
                {discountPercentage > 0 && (
                  <div className="flex items-center mt-1">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {discountPercentage}% OFF
                    </span>
                    {isHotDeal && (
                      <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        🔥 MEGA SAVE
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-green-700">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Gamified Features */}
        <div className="space-y-2 mb-3">
          {isLowStock && (
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-2 animate-pulse">
              <div className="flex items-center text-orange-800">
                <Timer className="h-4 w-4 mr-2" />
                <span className="text-xs font-bold">HURRY! Only {product.stock} left</span>
              </div>
            </div>
          )}
          
          {isFeatured && (
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-2">
              <div className="flex items-center text-purple-800">
                <Star className="h-4 w-4 mr-2" />
                <span className="text-xs font-bold">STAFF PICK</span>
              </div>
            </div>
          )}

          {isNewArrival && (
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-2">
              <div className="flex items-center text-blue-800">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-xs font-bold">JUST ARRIVED</span>
              </div>
            </div>
          )}

          {levelBenefit && (
            <div className={`${levelBenefit.bg} border border-purple-300 rounded-lg p-2`}>
              <div className={`flex items-center ${levelBenefit.color}`}>
                <Trophy className="h-4 w-4 mr-2" />
                <span className="text-xs font-bold">{levelBenefit.text}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded-md transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
            product.stock === 0
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {/* Button Shine Effect */}
          {product.stock > 0 && isHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
          )}
          
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock === 0 ? 'Sold Out' : (
            <>
              Add to Cart
              {isHotDeal && <span className="ml-2 text-xs">🔥</span>}
              <span className="ml-2 text-xs opacity-75">+10 XP</span>
            </>
          )}
        </button>

        {/* Gamification Progress Indicator */}
        {justViewed && (
          <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-800 font-medium">Product viewed!</span>
              <span className="text-green-600 font-bold">+5 XP</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardGamified;