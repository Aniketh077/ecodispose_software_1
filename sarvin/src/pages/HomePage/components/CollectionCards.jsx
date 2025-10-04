import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Laptop, Smartphone, Tablet, Gamepad2, Watch, Speaker } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../../../store/slices/collectionSlice";

const CollectionCards = () => {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.collections);

  useEffect(() => {
    dispatch(fetchCollections({ includeInactive: false }));
  }, [dispatch]);

  const iconMap = {
    laptop: Laptop,
    laptops: Laptop,
    smartphone: Smartphone,
    smartphones: Smartphone,
    tablet: Tablet,
    tablets: Tablet,
    gaming: Gamepad2,
    smartwatch: Watch,
    speaker: Speaker,
  };

  const getIconForCollection = (name) => {
    const lowerName = name.toLowerCase();
    for (const key in iconMap) {
      if (lowerName.includes(key)) {
        return iconMap[key];
      }
    }
    return Laptop;
  };

  if (!collections || !Array.isArray(collections) || collections.length === 0) {
    return null;
  }

  const displayCollections = collections.slice(0, 8);

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Browse our collection of refurbished electronics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayCollections.map((collection) => {
            const Icon = getIconForCollection(collection.name);
            const slug = collection.slug || collection.name.toLowerCase().replace(/\s+/g, '-');

            return (
              <Link
                key={collection._id || collection.id}
                to={`/products?collection=${encodeURIComponent(collection.name)}`}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-200 hover:border-primary-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                    {collection.image ? (
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain"
                      />
                    ) : (
                      <Icon className="w-12 h-12 md:w-16 md:h-16 text-primary-600" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-base md:text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                      Sell {collection.name}
                    </h3>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-primary-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </Link>
            );
          })}

          {/* "Sell More" Card */}
          <Link
            to="/products"
            className="group relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center justify-center text-center h-full space-y-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-white animate-bounce"></div>
                <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <h3 className="font-bold text-lg md:text-xl text-white">
                Sell More
              </h3>
              <p className="text-white text-sm opacity-90">View All Categories</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionCards;
