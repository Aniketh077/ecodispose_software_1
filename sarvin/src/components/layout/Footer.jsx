import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import FAQModal from '../FAQModal/FAQModal';

const Footer = () => {
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const handleFAQClick = (e) => {
    e.preventDefault();
    setIsFAQModalOpen(true);
  };

  const closeFAQModal = () => {
    setIsFAQModalOpen(false);
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center mb-4">
                <div className="bg-primary-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                  SARVIN
                </div>
              </Link>
              <p className="text-gray-400 mb-6 text-sm">
                Premium refurbished electronics that are good for your wallet and the planet. Every device is thoroughly tested and certified.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2.5">
                <li><Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">All Products</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Contact</Link></li>
                <li>
                  <button
                    onClick={handleFAQClick}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-left text-sm"
                  >
                    FAQs
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
              <ul className="space-y-2.5">
                <li><Link to="/orders" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Track Order</Link></li>
                <li><Link to="/cart" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Shopping Cart</Link></li>
                <li><Link to="/account" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">My Account</Link></li>
                <li><a href="tel:8008030203" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">+91 1234567890</span>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">support@sarvin.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">123 Business St, City, State 12345</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Sarvin. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link to="/returns" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  Return Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <FAQModal isOpen={isFAQModalOpen} onClose={closeFAQModal} />
    </>
  );
};

export default Footer;
