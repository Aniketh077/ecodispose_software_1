import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CollectionCards = () => {
  const collections = [
    {
      title: "Smartphones",
      bgColor: "bg-[#2A4365]",
      imageUrl: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
      exploreUrl: "/products/smartphones",
      types: [
        { name: "iPhone", link: "/products?type=iPhone" },
        { name: "Samsung Galaxy", link: "/products?type=Samsung+Galaxy" },
        { name: "OnePlus", link: "/products?type=OnePlus" },
      ],
    },
    {
      title: "Laptops",
      bgColor: "bg-[#C87941]",
      imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      exploreUrl: "/products/laptops",
      types: [
        { name: "MacBook", link: "/products?type=MacBook" },
        { name: "ThinkPad", link: "/products?type=ThinkPad" },
        { name: "Dell Laptops", link: "/products?type=Dell+Laptop" },
      ],
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.title}
              className={`relative ${collection.bgColor} rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row lg:h-[360px]`}
            >
              <div className="p-8 text-white w-full lg:w-1/2 flex flex-col justify-center z-10 order-2 lg:order-1">
                <h3 className="text-4xl font-bold mb-4">{collection.title}</h3>
                <ul className="space-y-2 mb-6">
                  {collection.types.map((type) => (
                    <li key={type.name}>
                      <Link
                        to={type.link}
                        className="hover:font-normal text-base font-normal"
                      >
                        {type.name}
                      </Link>
                    </li>
                  ))}
                </ul>
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