import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Phone,
  Heart,
} from "lucide-react";
import { fetchCollections } from "../../store/slices/collectionSlice";
import { fetchCollections as fetchCollectionsWithTypes } from "../../store/slices/productSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { cart } = useCart();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.collections);
  const { collections: collectionsWithTypes } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCollections({ includeInactive: false }));
    dispatch(fetchCollectionsWithTypes());
  }, [dispatch]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

  const getCollectionMenu = (collectionName) => {
    const collection = Array.isArray(collections)
      ? collections.find(c => c.name.toLowerCase() === collectionName.toLowerCase())
      : null;

    const collectionWithTypes = Array.isArray(collectionsWithTypes)
      ? collectionsWithTypes.find(c => c.name?.toLowerCase() === collectionName.toLowerCase())
      : null;

    const types = collectionWithTypes?.types?.slice(0, 5).map(type => ({
      name: type.name,
      path: `/products?types=${encodeURIComponent(type.name)}`
    })) || [];

    return { types, collection };
  };

  const smartphonesMenu = getCollectionMenu('Smartphones');
  const laptopsMenu = getCollectionMenu('Laptops');

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 1234567890
              </span>
              <span className="hidden md:inline">Free shipping on orders above ₹999</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <span>Welcome, {user?.name || user?.email}!</span>
              ) : (
                <>
                  <Link to="/login" className="hover:text-primary-100 transition">Login</Link>
                  <span>|</span>
                  <Link to="/register" className="hover:text-primary-100 transition">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
              SARVIN
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2.5 rounded-r-lg hover:bg-primary-700 transition"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 hover:text-primary-600 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              <span className="hidden lg:inline text-sm font-medium">Cart</span>
            </Link>

            {/* Profile Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 hover:text-primary-600 transition"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden lg:inline text-sm font-medium">Account</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      My Orders
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 hover:text-primary-600 transition"
              >
                <User className="h-6 w-6" />
                <span className="hidden lg:inline text-sm font-medium">Login</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="lg:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden lg:flex items-center justify-center border-t border-gray-200 py-3">
          <ul className="flex items-center space-x-8">
            <li>
              <Link
                to="/"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition"
              >
                All Products
              </Link>
            </li>

            {/* Dynamic Collection Dropdowns */}
            {Array.isArray(collections) && collections.slice(0, 5).map((collection) => {
              const menuData = getCollectionMenu(collection.name);
              return (
                <li key={collection._id} className="relative group">
                  <Link
                    to={`/products?collection=${encodeURIComponent(collection.name)}`}
                    className="text-sm font-medium text-gray-700 hover:text-primary-600 transition flex items-center"
                  >
                    {collection.name}
                    {menuData.types.length > 0 && <ChevronDown className="ml-1 h-3 w-3" />}
                  </Link>
                  {menuData.types.length > 0 && (
                    <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <h4 className="font-semibold text-sm mb-2 text-gray-900">Brands</h4>
                      <ul className="space-y-2">
                        {menuData.types.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.path}
                              className="block text-sm text-gray-600 hover:text-primary-600 transition"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}

            <li>
              <Link
                to="/contact"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b border-gray-200">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-r-lg"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          <nav className="py-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  All Products
                </Link>
              </li>

              {/* Mobile Collections */}
              {Array.isArray(collections) && collections.map((collection) => (
                <li key={collection._id}>
                  <Link
                    to={`/products?collection=${encodeURIComponent(collection.name)}`}
                    className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
