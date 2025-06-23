"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Menu, Search, X, ChevronRight, LogIn, UserPlus } from "lucide-react";

const navigationItems = [
  { name: "HOME", href: "/" },
  { name: "INSPIRATIONAL", href: "/inspirational" },
  { name: "BELIEVE", href: "/believe" },
  { name: "GUIDANCE", href: "/guidance" },
  { name: "HARD WORK", href: "/hard_work" },
  { name: "HEALTH", href: "/health" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
];

const sideMenuItems = [
  { name: "VIDEOS", hasSubmenu: true },
  { name: "INDIA", hasSubmenu: true },
  { name: "WEB STORIES", hasSubmenu: true },
  { name: "ENTERTAINMENT", hasSubmenu: true },
  { name: "SPORTS", hasSubmenu: true },
  { name: "PHOTOS", hasSubmenu: true },
  { name: "LIFESTYLE", hasSubmenu: true },
  { name: "EDUCATION", hasSubmenu: true },
  { name: "TECHNOLOGY", hasSubmenu: true },
  { name: "BUSINESS", hasSubmenu: true },
  { name: "WORLD", hasSubmenu: true },
  { name: "ASTROLOGY", hasSubmenu: true },
  { name: "HEALTH", hasSubmenu: true },
];

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sideMenuContainer, setSideMenuContainer] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    // Find the side menu container in the layout
    const container = document.querySelector(".fixed.top-0.left-0.h-full");
    setSideMenuContainer(container);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName);
    setTimeout(() => setActiveNavItem(""), 300);
  };

  const isActiveRoute = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Side Menu Content Component
  const SideMenuContent = () => (
    <div className="h-full overflow-y-auto">
      {/* Menu Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span
                className="text-sm font-bold text-white"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                अ
              </span>
            </div>
            <span
              className="text-lg font-bold text-gray-800"
              style={{
                fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
              }}
            >
              अनंतप्रज्ञा
            </span>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex space-x-2">
          <Link href="/login" onClick={closeMenu}>
            <button className="flex-1 bg-white text-blue-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 border border-blue-200 transform hover:scale-105 active:scale-95">
              LOGIN
            </button>
          </Link>
          <Link href="/signup" onClick={closeMenu}>
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm">
              SIGN UP
            </button>
          </Link>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {sideMenuItems.map((item, index) => (
          <Link
            key={item.name}
            href={`/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-gray-50 border-b border-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group"
            onClick={closeMenu}
          >
            <span className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-200">
              {item.name}
            </span>
            {item.hasSubmenu && (
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all duration-200 transform group-hover:translate-x-1" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <header className="w-full bg-white/95 shadow-sm border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm">
        {/* Top Header */}
        <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-4 relative">
          {/* Left Side - Menu and Search */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMenu}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                isMenuOpen ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
              aria-label="Toggle menu"
            >
              <div
                className={`transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* Search - either button or expanded search bar */}
            {!isSearchOpen ? (
              <button
                onClick={toggleSearch}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-gray-700"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-lg animate-in slide-in-from-left-2 duration-300">
                <Search className="w-4 h-4 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="खोजें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-3 py-2 bg-transparent text-gray-700 placeholder-gray-400 border-none outline-none text-sm"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                  autoFocus
                />
                <button
                  onClick={closeSearch}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-r-lg transition-all duration-200"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Center - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 transform group-hover:scale-105">
                <span
                  className="text-xl font-bold text-white"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  अ
                </span>
              </div>
              <span
                className="text-2xl font-bold text-gray-800 hidden sm:block group-hover:text-blue-600 transition-colors duration-200"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                अनंतप्रज्ञा
              </span>
            </Link>
          </div>

          {/* Right Side - Language, Auth, Live TV */}
          <div className="flex items-center space-x-2">
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95">
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm font-medium">Login</span>
                </button>
              </Link>
              <Link href="/signup">
                <button className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Up</span>
                </button>
              </Link>
            </div>

            <button className="bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
              LIVE TV
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center overflow-x-auto scrollbar-hide">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavItemClick(item.name)}
                  className={`
                    relative px-6 py-3 text-white text-sm font-medium whitespace-nowrap
                    transition-[transform,background-color] duration-300 ease-in-out
                    transform hover:scale-105 active:scale-95 group
                    hover:bg-white/10
                    ${
                      index !== navigationItems.length - 1
                        ? "border-r border-blue-500/30"
                        : ""
                    }
                    ${
                      isActiveRoute(item.href) ? "bg-white/20 shadow-inner" : ""
                    }
                    ${
                      activeNavItem === item.name ? "bg-white/30 scale-105" : ""
                    }
                  `}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Active indicator */}
                  {isActiveRoute(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full animate-in slide-in-from-bottom-1 duration-300"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Render Side Menu Content in Portal */}
      {sideMenuContainer &&
        createPortal(<SideMenuContent />, sideMenuContainer)}
    </>
  );
}
