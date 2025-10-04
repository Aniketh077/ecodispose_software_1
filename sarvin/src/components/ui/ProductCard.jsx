import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import Button from "./Button";
import { ShoppingCart, Heart, Star, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const getConditionBadge = (condition) => {
  const badges = {
    'Like New': { bg: 'bg-green-500', text: 'Like New', icon: Award },
    'Excellent': { bg: 'bg-blue-500', text: 'Excellent', icon: Award },
    'Good': { bg: 'bg-orange-500', text: 'Good', icon: Award },
    'Fair': { bg: 'bg-yellow-500', text: 'Fair', icon: Award }
  };
  return badges[condition] || badges['Good'];
};

const calculateSavings = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

const ProductCard = ({ product, viewMode = "grid" }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;

    setIsAdding(true);
    setError(null);

    try {
      await addToCart(product, 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(error.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  const productId = product._id || product.id;
  const itemInCart = isInCart(productId);
  const quantity = getItemQuantity(productId);

  const conditionBadgeList = getConditionBadge(product.condition);
  const currentPriceList = product.discountPrice || product.price;
  const savingsPercentList = calculateSavings(product.originalPrice, currentPriceList);
  const ConditionIconList = conditionBadgeList.icon;

  if (viewMode === "list") {
    return (
      <div className="group relative flex flex-col md:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-300 transition-all">
        {/* Success/Error indicators */}
        {showSuccess && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center">
            <CheckCircle size={16} className="mr-2" />
            Added to cart!
          </div>
        )}

        {error && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center max-w-xs text-sm">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 z-10 bg-primary-600 px-2 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1 shadow-md">
          <Shield size={12} />
          Certified
        </div>

        <div className={`absolute right-2 top-2 z-10 ${conditionBadgeList.bg} px-2 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1 shadow-md`}>
          <ConditionIconList size={12} />
          {conditionBadgeList.text}
        </div>

        {savingsPercentList > 0 && (
          <div className="absolute left-2 top-10 z-10 bg-gradient-to-r from-orange-600 to-orange-500 px-2 py-1 rounded-md text-xs font-semibold text-white shadow-md">
            Save {savingsPercentList}%
          </div>
        )}

        {product.newArrival && (
          <div className="absolute right-2 top-10 z-10 bg-gradient-to-r from-purple-600 to-purple-500 px-2 py-1 rounded-md text-xs font-semibold text-white shadow-md">
            NEW
          </div>
        )}

        {/* Image Section */}
        <div className="md:w-1/3 h-60 md:h-auto relative overflow-hidden bg-gray-100">
          <Link to={`/product/${productId}`} className="block h-full">
            <img
              src={
                product.image || product.images[0] || "/placeholder-image.jpg"
              }
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Details Section */}
        <div className="p-6 flex-1 flex flex-col">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              {product.type?.name || product.collection?.name}
            </p>
            <Link to={`/product/${productId}`}>
              <h3 className="text-lg font-medium mb-2 group-hover:text-primary-600">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-orange-400 text-orange-400" />
                <span className="text-sm font-medium">
                  {product.rating || 0}
                </span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                {product.reviewCount || 0} reviews
              </span>
            </div>

            <div className="mb-4">
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-xl font-semibold">
                    ₹{product.discountPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-semibold">
                  ₹{product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>

            {product.features?.length > 0 && (
              <div className="space-y-1 mb-4">
                {product.features.slice(0, 3).map((feature, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    • {feature}
                  </p>
                ))}
              </div>
            )}

            {/* Stock indicator */}
            {product.stock === 0 && (
              <div className="text-sm text-red-500 mb-3">Out of stock</div>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <div className="text-sm text-orange-500 mb-3">
                Only {product.stock} left
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/product/${productId}`;
              }}
              className="w-full sm:w-auto"
            >
              View Details
            </Button>

            <Button
              variant={itemInCart ? "outline" : "primary"}
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              leftIcon={<ShoppingCart size={16} />}
              className="w-full sm:w-auto"
            >
              {isAdding
                ? "Adding..."
                : product.stock === 0
                ? "Out of Stock"
                : itemInCart
                ? `In Cart (${quantity})`
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default grid view
  const conditionBadge = getConditionBadge(product.condition);
  const currentPrice = product.discountPrice || product.price;
  const savingsPercent = calculateSavings(product.originalPrice, currentPrice);
  const ConditionIcon = conditionBadge.icon;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary-300">
      {/* Certified Refurbished Badge */}
      <div className="absolute left-2 top-2 z-10 bg-primary-600 px-2 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1 shadow-md">
        <Shield size={12} />
        Certified
      </div>

      {/* Condition Badge */}
      <div className={`absolute right-2 top-2 z-10 ${conditionBadge.bg} px-2 py-1 rounded-md text-xs font-semibold text-white flex items-center gap-1 shadow-md`}>
        <ConditionIcon size={12} />
        {conditionBadge.text}
      </div>

      {/* Savings Badge */}
      {savingsPercent > 0 && (
        <div className="absolute left-2 top-10 z-10 bg-gradient-to-r from-orange-600 to-orange-500 px-2 py-1 rounded-md text-xs font-semibold text-white shadow-md">
          Save {savingsPercent}%
        </div>
      )}

      {product.newArrival && (
        <div className="absolute right-2 top-10 z-10 bg-gradient-to-r from-purple-600 to-purple-500 px-2 py-1 rounded-md text-xs font-semibold text-white shadow-md">
          NEW
        </div>
      )}

      {/* Success/Error indicators */}
      {showSuccess && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center">
          <CheckCircle size={16} className="mr-2" />
          Added to cart!
        </div>
      )}

      {error && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center max-w-xs text-sm">
          <AlertCircle size={16} className="mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      <Link to={`/product/${productId}`} className="block">
        <div className="relative h-60 overflow-hidden bg-gray-100 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <div className="mb-1 text-sm text-gray-500">
            {product.type?.name || product.type}
          </div>
          <h3 className="mb-2 text-base font-medium line-clamp-2 group-hover:text-primary-600 transition-colors">
            {truncateText(product.name, 50)}
          </h3>

          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-orange-400 text-orange-400" />
              <span className="text-sm font-medium">{product.rating || 0}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                {product.reviewCount || 0} reviews
              </span>
            </div>
          </div>

          {/* Warranty Badge */}
          {product.warranty && (
            <div className="mb-3 flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit">
              <Shield size={12} className="mr-1" />
              {product.warranty} Warranty
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary-600">
                  ₹{currentPrice.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > currentPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock indicator */}
              {product.stock === 0 && (
                <div className="text-xs text-red-500 mt-1">Out of stock</div>
              )}
              {product.stock > 0 && product.stock <= 5 && (
                <div className="text-xs text-orange-500 mt-1">
                  Only {product.stock} left
                </div>
              )}
            </div>

            <div className="flex flex-col items-end">
              {itemInCart ? (
                <div className="text-xs text-primary-600 mb-1">
                  In cart ({quantity})
                </div>
              ) : null}

              <Button
                size="sm"
                variant="primary"
                onClick={handleAddToCart}
                disabled={isAdding || product.stock === 0}
                leftIcon={<ShoppingCart size={16} />}
                className={`transition-opacity duration-300 ${
                  product.stock === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {isAdding
                  ? "Adding..."
                  : product.stock === 0
                  ? "Out of Stock"
                  : "Add"}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
