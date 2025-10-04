import React from 'react';
import { Link } from 'react-router-dom';

const ProductBreadcrumb = ({ product, collectionName }) => {
  // Ensure collectionName is a string
  const safeCollectionName = typeof collectionName === 'string' ? collectionName : 
                            (collectionName && typeof collectionName === 'object' && collectionName.name) ? 
                            String(collectionName.name) : 'Unknown';

  return (
    <nav className="py-4">
      <ol className="flex text-sm overflow-x-auto whitespace-nowrap">
        <li className="flex items-center">
          <Link to="/" className="text-gray-500 hover:text-green-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>
        <li className="flex items-center">
          <Link to="/products" className="text-gray-500 hover:text-green-700">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>
        {safeCollectionName && safeCollectionName !== 'Unknown' && (
          <li className="flex items-center">
            <Link
              to={`/products/${safeCollectionName.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-500 hover:text-green-700"
            >
              {safeCollectionName}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
        )}
        <li className="text-gray-900 font-medium">{String(product.name || 'Product')}</li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;