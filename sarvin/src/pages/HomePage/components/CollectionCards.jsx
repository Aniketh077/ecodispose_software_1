import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../../../store/slices/collectionSlice";
import { fetchCollections as fetchCollectionsWithTypes } from "../../../store/slices/productSlice";

const CollectionCards = () => {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.collections);
  const { collections: collectionsWithTypes } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCollections({ includeInactive: false }));
    dispatch(fetchCollectionsWithTypes());
  }, [dispatch]);

  const bgColors = [
    "bg-green-600",
    "bg-emerald-500",
    "bg-[#2D5F5D]",
    "bg-[#7C3AED]",
    "bg-[#DC2626]",
    "bg-[#059669]"
  ];

  // Comprehensive safety checks to prevent React child errors
  if (!collections || !Array.isArray(collections) || collections.length === 0) {
    return null;
  }

  // Safely process collections with extensive validation
  const displayCollections = collections
    .slice(0, 6)
    .map((collection, index) => {
      // Ensure collection is a valid object with required properties
      if (!collection || typeof collection !== 'object') {
        console.warn('Invalid collection object:', collection);
        return null;
      }

      // Safely extract collection properties as strings only
      const collectionId = String(collection._id || collection.id || '');
      const collectionName = String(collection.name || '');
      const collectionSlug = String(collection.slug || collectionName.toLowerCase().replace(/\s+/g, '-'));
      const collectionImage = String(collection.image || "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg");

      // Skip if essential data is missing
      if (!collectionId || !collectionName) {
        console.warn('Missing essential collection data:', { collectionId, collectionName });
        return null;
      }

      // Safely find matching collection with types
      const collectionWithTypes = Array.isArray(collectionsWithTypes)
        ? collectionsWithTypes.find(c => {
            if (!c || typeof c !== 'object') return false;
            const cId = String(c._id || c.id || '');
            const cName = String(c.name || '');
            return cId === collectionId || cName === collectionName;
          })
        : null;

      // Safely extract types with validation - ensure only strings are used
      const types = [];
      if (collectionWithTypes && Array.isArray(collectionWithTypes.types)) {
        collectionWithTypes.types.slice(0, 3).forEach(type => {
          if (type && typeof type === 'object' && type.name) {
            const typeName = String(type.name);
            if (typeName) {
              types.push({
                name: typeName,
                link: `/products?types=${encodeURIComponent(typeName)}`
              });
            }
          }
        });
      }

      return {
        id: collectionId,
        title: collectionName,
        bgColor: bgColors[index % bgColors.length],
        imageUrl: collectionImage,
        exploreUrl: `/products/${collectionSlug}`,
        types: types
      };
    })
    .filter(Boolean); // Remove null entries

  // Don't render if no valid collections
  if (displayCollections.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our premium certified refurbished electronics across different categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayCollections.map((collection) => (
            <div
              key={collection.id}
              className={`relative ${collection.bgColor} rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row lg:h-[360px]`}
            >
              <div className="p-8 text-white w-full lg:w-1/2 flex flex-col justify-center z-10 order-2 lg:order-1">
                <h3 className="text-4xl font-bold mb-4">{collection.title}</h3>
                {collection.types && collection.types.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {collection.types.map((type, typeIndex) => (
                      <li key={`${collection.id}-type-${typeIndex}`}>
                        <Link
                          to={type.link}
                          className="hover:font-normal text-base font-normal hover:underline"
                        >
                          {type.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  to={collection.exploreUrl}
                  className="font-semibold text-lg flex items-center group whitespace-nowrap"
                >
                  Explore All
                  <ChevronRight
                    size={22}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
              
              <div className="relative lg:absolute lg:right-[-90px] lg:top-0 h-[320px] lg:h-full w-full lg:w-[85%] flex items-center justify-center lg:justify-end order-1 lg:order-2">
                <img
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="h-full w-full object-cover lg:h-auto lg:w-auto lg:max-h-[600px] lg:object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionCards;