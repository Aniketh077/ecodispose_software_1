import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import Button from "../ui/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledNavOpen, setIsScrolledNavOpen] = useState(false); // For scrolled desktop menu
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuBreakpoint, setIsMobileMenuBreakpoint] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuCloseTimeoutRef = useRef(null);

  const { cart } = useCart();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const scrolledNavRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleScrolledNav = () => setIsScrolledNavOpen(!isScrolledNavOpen);

  const handleProfileMenuEnter = () => {
    clearTimeout(menuCloseTimeoutRef.current);
    setIsProfileMenuOpen(true);
  };

  const handleProfileMenuLeave = () => {
    menuCloseTimeoutRef.current = setTimeout(() => {
      setIsProfileMenuOpen(false);
    }, 200);
  };

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

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileMenuBreakpoint(window.innerWidth < 1024); // Adjusted breakpoint for new layout
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY <= 50) {
        setIsScrolledNavOpen(false); // Close scrolled nav when returning to top
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    setActiveDropdown(null);
    setIsScrolledNavOpen(false);
  }, [location]);

  // Handle clicking outside of menus to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        isScrolledNavOpen &&
        scrolledNavRef.current &&
        !scrolledNavRef.current.contains(event.target)
      ) {
        setIsScrolledNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen, isScrolledNavOpen]);

  // Navigation menu data
  const smartphonesMenu = {
    types: [
      {
        name: "iPhone",
        path: "/products?type=iPhone",
      },
      { name: "Samsung Galaxy", path: "/products?type=Samsung+Galaxy" },
      { name: "OnePlus", path: "/products?type=OnePlus" },
    ],
    conditions: [
      { name: "Like New", path: "/products?condition=Like+New" },
      { name: "Excellent", path: "/products?condition=Excellent" },
      { name: "Good", path: "/products?condition=Good" },
    ],
    images: [
      {
        name: "iPhone",
        path: "/products?type=iPhone",
        src: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
        alt: "Refurbished iPhone",
      },
      {
        name: "Samsung Galaxy",
        path: "/products?type=Samsung+Galaxy",
        src: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
        alt: "Refurbished Samsung Galaxy",
      },
    ],
  };

  const laptopsMenu = {
    types: [
      { name: "MacBook", path: "/products?type=MacBook" },
      { name: "ThinkPad", path: "/products?type=ThinkPad" },
      { name: "Dell Laptop", path: "/products?type=Dell+Laptop" },
    ],
    images: [
      {
        name: "MacBook",
        path: "/products?type=MacBook",
        src: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
        alt: "Refurbished MacBook",
      },
      {
        name: "ThinkPad",
        path: "/products?type=ThinkPad",
        src: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg",
        alt: "Refurbished ThinkPad",
      },
    ],
  };

  const DesktopNavLinks = () => (
    <ul className="flex items-center justify-center space-x-6 xl:space-x-8">
      <li>
        <Link to="/" className="text-sm font-medium transition-colors hover:text-[#C87941] text-[#01364a]">
          Home
        </Link>
      </li>
      <li>
        <Link to="/products" className="text-sm font-medium transition-colors hover:text-[#C87941] text-[#01364a]">
          All Products
        </Link>
      </li>
      <li className="relative group">
        <Link to="/products/smartphones" className="text-sm font-medium transition-colors hover:text-[#C87941] text-[#01364a] flex items-center">
          Smartphones
          <ChevronDown className="ml-1 h-3 w-3 relative top-[3px]" />
        </Link>
        <div className="absolute left-[-6rem] top-full mt-2 bg-white shadow-lg rounded-md p-6 z-50 transition-all duration-300 transform opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2" style={{ minWidth: "800px" }}>
          <div className="flex justify-between items-start space-x-8">
            <div className="flex space-x-12">
              <div>
                <h4 className="font-semibold text-sm mb-2 text-[#01364a]">Brands</h4>
                <ul className="space-y-1.5 mt-2">
                  {smartphonesMenu.types.map((item) => (
                    <li key={item.name}><Link to={item.path} className="block text-sm text-gray-600 hover:text-[#C87941]">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 text-[#01364a]">Condition</h4>
                <ul className="space-y-1.5 mt-2">
                  {smartphonesMenu.conditions.map((item) => (
                    <li key={item.name}><Link to={item.path} className="block text-sm text-gray-600 hover:text-[#C87941]">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex space-x-6 pl-8 border-l border-gray-200">
              {smartphonesMenu.images.map((image) => (
                <Link to={image.path} key={image.name} className="block text-center hover:opacity-90 transition-opacity">
                  <div className="w-44 h-44 flex items-center justify-center rounded-md overflow-hidden">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2">{image.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </li>
      <li className="relative group">
        <Link to="/products/laptops" className="text-sm font-medium transition-colors hover:text-[#C87941] text-[#01364a] flex items-center">
          Laptops <ChevronDown className="ml-1 h-3 w-3 relative top-[3px]" />
        </Link>
        <div className="absolute left-[-6rem] top-full mt-2 bg-white shadow-lg rounded-md p-6 z-50 transition-all duration-300 transform opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2" style={{ minWidth: "600px" }}>
          <div className="flex justify-between items-start space-x-8">
            <div>
              <h4 className="font-semibold text-sm mb-2 text-[#01364a]">Brands</h4>
              <ul className="space-y-1.5 mt-2">
                {laptopsMenu.types.map((item) => (
                  <li key={item.name}><Link to={item.path} className="block text-sm text-gray-600 hover:text-[#C87941]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-6 pl-8 border-l border-gray-200">
              {laptopsMenu.images.map((image) => (
                <Link to={image.path} key={image.name} className="block text-center hover:opacity-90 transition-opacity">
                  <div className="w-44 h-44 flex items-center justify-center rounded-md overflow-hidden">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-medium text-[#01364a] mt-2">{image.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </li>
      <li><Link to="/products?filter=new" className="text-sm font-medium transition-colors hover:text-[#C87941] text-[#01364a]">New Arrivals</Link></li>
      <li><Link to="/products?filter=featured" className="text-sm font-medium transition-colors hover:text-[#C87941] text-[#01364a]">Featured Products</Link></li>
      <li><Link to="/about" className="text-sm font-medium transition-colors hover:text-[#C87941] text-[#01364a]">About</Link></li>
      <li><Link to="/contact" className="text-sm font-medium transition-colors hover:text-[#C87941] text-[#01364a]">Contact</Link></li>
    </ul>
  );

  return (
    <header className="fixed top-0 z-50 w-full bg-white  transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Top Bar (Logo, Search, Icons) --- */}
       {/* --- Top Bar (Logo, Search, Icons) --- */}
        <div className="flex items-center justify-between py-2">

          {/* === LEFT SECTION: Mobile Menu & Logo / Desktop Logo & Scrolled Nav === */}
          <div className="flex justify-start items-center lg:w-auto">
             {/* Mobile Menu Toggle */}
             <button className="lg:hidden p-2 -ml-2 text-[#01364a]" onClick={toggleMenu} aria-label="Open mobile menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-11" />}
             </button>
             {/* MOBILE LOGO MOVED HERE */}
             <Link to="/" className="lg:hidden flex items-center flex-shrink-0">
                <img src="/logo_light.png" alt="Cashify" className="h-12 w-auto object-contain" style={{ maxWidth: "130px" }} />
             </Link>
             {/* Desktop Left Content */}
             <div className="hidden lg:flex items-center space-x-4">
                {isScrolled && (
                    <button onClick={toggleScrolledNav} className="p-2 -ml-2 rounded-full hover:bg-gray-100" aria-label="Open navigation menu">
                        {isScrolledNavOpen ? <X className="h-6 w-6 text-[#01364a]" /> : <Menu className="h-6 w-6 text-[#01364a]" />}
                    </button>
                )}
                <Link to="/" className="flex items-center flex-shrink-0">
                    <img src="/logo_light.png" alt="Cashify" className="h-12 w-auto object-contain" style={{ maxWidth: "130px" }} />
                </Link>
             </div>
          </div>

          {/* === CENTER SECTION: Desktop Search (Mobile logo removed) === */}
          <div className="hidden lg:flex lg:flex-1 lg:px-8 lg:w-auto justify-center">
             {/* Desktop Search Bar */}
             <div className="w-full">
                <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                    <input
                    <img src="/logo_light.png" alt="Cashify" className="h-12 w-auto object-contain" style={{ maxWidth: "130px" }} />
                        placeholder="What are you looking for?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 border border-gray-300 rounded-md pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#01364a]"
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-[#01364a] hover:bg-opacity-90 rounded-r-md" aria-label="Search">
                        <Search className="h-5 w-5 text-white" />
                    </button>
                </form>
             </div>
          </div>
          
          {/* === RIGHT SECTION: Icons & Desktop Contact === */}
          <div className="flex items-center justify-end space-x-2 md:space-x-4 lg:w-auto flex-1">
           <div className="hidden lg:block text-right">
  <p className="text-sm font-semibold text-[#01364a] whitespace-nowrap">
    <a href="tel:9310979906" className="flex items-center justify-end hover:underline">
      <Phone Width={3} className="h-3 w-3 mr-1 mt-1 " />
      <span>9310979906 (sales & service)</span>
    </a>
  </p>
  <p className="text-xs text-[#01374ae1]">Mon - Sat  | 8am - 8pm</p>
</div>
             
             <Link to="/cart" className="relative p-2 text-[#01364a] hover:text-[#C87941]" aria-label={`Cart with ${cart.items.length} items`}>
                <ShoppingCart className="h-6 w-6" />
                {cart.items.length > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C87941] text-xs font-bold text-white">
                        {cart.items.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                )}
             </Link>

             <div ref={profileMenuRef} className="relative profile-menu" onMouseEnter={handleProfileMenuEnter} onMouseLeave={handleProfileMenuLeave}>
                <button onClick={toggleProfileMenu} className="flex items-center p-2 text-[#01364a] hover:text-[#C87941]" aria-label="User account menu">
                    <User className="h-6 w-6" />
                    {/* {isAuthenticated && <ChevronDown className="h-4 w-4 ml-1" />} */}
                </button>
                {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg border border-gray-100 z-30">
                        {isAuthenticated ? (
                            <>
                                <div className="border-b border-gray-100 px-4 py-2">
                                    <p className="text-sm font-medium text-[#01364a] truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    {isAdmin && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#01364a] text-white mt-1">Admin</span>}
                                </div>
                                {isAdmin && <Link to="/admin" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><Settings className="mr-2 h-4 w-4" />Admin Dashboard</Link>}
                                <Link to="/account" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><User className="mr-2 h-4 w-4" />My Account</Link>
                                <Link to="/orders" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><Package className="mr-2 h-4 w-4" />My Orders</Link>
                                <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"><LogOut className="mr-2 h-4 w-4" />Sign out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign in</Link>
                                <Link to="/register" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create account</Link>
                            </>
                        )}
                    </div>
                )}
             </div>
          </div>
        </div>

        {/* --- Bottom Nav Bar (Desktop, not scrolled) --- */}
        <div className={`hidden lg:block transition-all duration-300 ease-in-out ${isScrolled ? 'h-0 opacity-0 invisible' : 'opacity-100 visible translate-y-0 py-4'}`}>
          <DesktopNavLinks />
        </div>
      </div>

      {/* --- Scrolled Navigation Dropdown (Desktop) --- */}
      {!isMobileMenuBreakpoint && isScrolledNavOpen && (
        <div ref={scrolledNavRef} className="absolute top-full left-0 w-full bg-white shadow-lg ">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <DesktopNavLinks />
          </div>
        </div>
      )}

      {/* --- Mobile Menu (Original Logic, unchanged) --- */}
      {isMobileMenuBreakpoint && isMenuOpen && (
       <div className="mt-4">
             <form onSubmit={handleSearch} className="mb-4 flex items-center">
               <div className="relative w-full">
                 <input
                   type="text"
                   placeholder="Search products..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-3 text-sm focus:border-[#C87941] focus:outline-none focus:ring-1 focus:ring-[#C87941]"
                 />
                 <button
                   type="submit"
                   className="absolute right-0 top-0 flex h-full items-center justify-center px-3 text-gray-500"
                 >
                   <Search className="h-4 w-4" />
                 </button>
               </div>
             </form>
             <ul className="divide-y divide-gray-100 rounded-lg bg-white border border-gray-200 max-h-fit overflow-y-auto">
               <li>
                 <Link
                   to="/"
                   className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                 >
                   Home
                 </Link>
               </li>
               <li>
                 <Link
                   to="/products"
                   className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                 >
                   All Products
                 </Link>
               </li>

               {/* Cooking Appliances Mobile Submenu */}
               <li className="relative">
                 <button
                   onClick={() =>
                     setActiveDropdown(
                       activeDropdown === "smartphones-mobile"
                         ? null
                         : "smartphones-mobile"
                     )
                   }
                   className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                 >
                   Smartphones{" "}
                   <ChevronDown
                     className={`h-4 w-4 transition-transform ${
                       activeDropdown === "smartphones-mobile" ? "rotate-180" : ""
                     }`}
                   />
                 </button>
                 {activeDropdown === "smartphones-mobile" && (
                   <div className="bg-gray-50 px-4 py-2">
                     <h4 className="font-semibold text-xs mb-2 text-gray-700">
                       Brands
                     </h4>
                     <ul className="space-y-1 mb-3">
                       {smartphonesMenu.types.map((item) => (
                         <li key={item.name}>
                           <Link
                             to={item.path}
                             className="block text-sm text-gray-600 hover:text-[#C87941] pl-2 py-1"
                           >
                             {item.name}
                           </Link>
                         </li>
                       ))}
                     </ul>
                     <h4 className="font-semibold text-xs mb-2 text-gray-700">
                       Condition
                     </h4>
                     <ul className="space-y-1">
                       {smartphonesMenu.conditions.map((item) => (
                         <li key={item.name}>
                           <Link
                             to={item.path}
                             className="block text-sm text-gray-600 hover:text-[#C87941] pl-2 py-1"
                           >
                             {item.name}
                           </Link>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
               </li>

               {/* Laptops Mobile Submenu */}
               <li className="relative">
                 <button
                   onClick={() =>
                     setActiveDropdown(
                       activeDropdown === "laptops-mobile" ? null : "laptops-mobile"
                     )
                   }
                   className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                 >
                   Laptops{" "}
                   <ChevronDown
                     className={`h-4 w-4 transition-transform ${
                       activeDropdown === "laptops-mobile" ? "rotate-180" : ""
                     }`}
                   />
                 </button>
                 {activeDropdown === "laptops-mobile" && (
                   <div className="bg-gray-50 px-4 py-2">
                     <h4 className="font-semibold text-xs mb-2 text-gray-700">
                       Brands
                     </h4>
                     <ul className="space-y-1">
                       {laptopsMenu.types.map((item) => (
                         <li key={item.name}>
                           <Link
                             to={item.path}
                             className="block text-sm text-gray-600 hover:text-[#C87941] pl-2 py-1"
                           >
                             {item.name}
                           </Link>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
               </li>

               <li>
                 <Link
                   to="/products?filter=featured"
                   className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                 >
                   Featured Products
                 </Link>
               </li>
               <li>
                 <Link
                   to="/products?filter=new"
                   className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                 >
                   New Arrivals
                 </Link>
               </li>
               <li>
                 <Link
                   to="/about"
                   className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                 >
                   About
                 </Link>
               </li>
               <li>
                 <Link
                   to="/contact"
                   className="block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                 >
                   Contact
                 </Link>
               </li>
               {!isAuthenticated ? (
                 <li className="px-4 py-3">
                   <div className="flex flex-col space-y-2">
                     <Button
                       fullWidth
                       onClick={() => navigate("/login")}
                       variant="primary"
                     >
                       Sign In
                     </Button>
                     <Button
                       fullWidth
                       onClick={() => navigate("/register")}
                       variant="outline"
                     >
                       Create Account
                     </Button>
                   </div>
                 </li>
               ) : (
                 <li className="px-4 py-3">
                   <div className="flex flex-col space-y-2">
                     {isAdmin && (
                       <Button
                         fullWidth
                         onClick={() => navigate("/admin")}
                         variant="primary"
                       >
                         Admin Dashboard
                       </Button>
                     )}
                     <Button
                       fullWidth
                       onClick={() => navigate("/account")}
                       variant="outline"
                     >
                       My Account
                     </Button>
                     <Button
                       fullWidth
                       onClick={handleLogout}
                       variant="outline"
                       leftIcon={<LogOut className="h-4 w-4" />}
                     >
                       Sign Out
                     </Button>
                   </div>
                 </li>
               )}
             </ul>
           </div>
      )}
    </header>
  );
};

export default Header;