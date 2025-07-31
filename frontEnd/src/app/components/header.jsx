"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Menu,
  Search,
  X,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/redux";
import { logout } from "../../lib/features/auth/authSlice";
import SideMenu from "./sidemenu"; // Import the new SideMenu component

// Import your logo image
import AnantpragyaLogo from "../../../public/logo_4.png";

// Main navigation items for the header (these are static in the header)
const navigationItems = [
  { name: "HOME", href: "/" },
  {
    id: "650e8400-e29b-41d4-a716-446655440007",
    name: "INSPIRATIONAL",
    href: "/inspirational?categoryId=650e8400-e29b-41d4-a716-446655440007",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440008",
    name: "BELIEVE",
    href: "/believe?categoryId=650e8400-e29b-41d4-a716-446655440008",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440009",
    name: "GUIDANCE",
    href: "/guidance?categoryId=650e8400-e29b-41d4-a716-446655440009",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440010",
    name: "SOCIAL ISSUES",
    href: "/social_issues?categoryId=650e8400-e29b-41d4-a716-446655440010",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440011",
    name: "HEALTH",
    href: "/health?categoryId=650e8400-e29b-41d4-a716-446655440011",
  },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
];

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sideMenuContainer, setSideMenuContainer] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Ensure the side menu portal root exists. If not, create one.
    let container = document.querySelector("#side-menu-portal-root");
    if (!container) {
      container = document.createElement("div");
      container.id = "side-menu-portal-root";
      // Append to body or a suitable parent element (e.g., the main layout div)
      document.body.appendChild(container);
    }
    setSideMenuContainer(container);
  }, []);

  useEffect(() => {
    const handleScrollOrResize = () => {
      closeMenu();
      closeSearch();
      closeUserMenu();
      setShowMobileUserMenu(false);
    };

    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (showUserMenu) setShowUserMenu(false);
    if (showMobileUserMenu) setShowMobileUserMenu(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (showUserMenu) setShowUserMenu(false);
    if (showMobileUserMenu) setShowMobileUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
    if (showMobileUserMenu) setShowMobileUserMenu(false);
  };

  const toggleMobileUserMenu = () => {
    setShowMobileUserMenu(!showMobileUserMenu);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
    if (showUserMenu) setShowUserMenu(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const closeUserMenu = () => {
    setShowUserMenu(false);
  };

  const closeMobileUserMenu = () => {
    setShowMobileUserMenu(false);
  };

  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName);
    setTimeout(() => setActiveNavItem(""), 300);
    // This function is for the main header navigation, no need to close side menu here.
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    closeMenu(); // Close side menu if open
    closeUserMenu(); // Close desktop user menu
    closeMobileUserMenu(); // Close mobile user menu
  };

  const isActiveRoute = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="w-full bg-white/95 shadow-sm border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm">
        {/* Top Header */}
        <div className="flex items-center justify-between w-full max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 relative">
          {/* Left Side - Menu and Search */}
          <div className="flex items-center space-x-2 sm:space-x-3">
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

            {/* Search Button (always visible) */}
            {/* <button
              onClick={toggleSearch}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-gray-700"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button> */}
          </div>

          {/* Center - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center justify-center h-full">
              <Image
                src={AnantpragyaLogo || "/placeholder.svg"}
                alt="अनंतप्रज्ञा Logo"
                width={120}
                height={30}
                className="h-8 w-auto sm:h-9 md:h-10 lg:h-11"
              />
            </Link>
          </div>

          {/* Right Side - Auth, Live TV */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile-specific User/Auth */}
            {isAuthenticated && user ? (
              <div className="md:hidden relative">
                <button
                  onClick={toggleMobileUserMenu}
                  className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  aria-label="User actions"
                >
                  <User className="w-5 h-5 text-blue-600" />
                </button>
                {showMobileUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 text-gray-800 text-sm font-medium border-b border-gray-100">
                      {user.first_name} {user.last_name}
                    </div>
                    <Link
                      href="/profile"
                      onClick={closeMobileUserMenu}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      <span>प्रोफाइल सेटिंग्स</span>
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>लॉग आउट</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="md:hidden">
                <Link href="/login">
                  <button className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                    <LogIn className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            )}

            {/* Desktop User/Auth */}
            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center space-x-3 relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.first_name}
                  </span>
                  {user.role === "admin" && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Admin
                    </span>
                  )}
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/profile"
                      onClick={closeUserMenu}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      <span>प्रोफाइल सेटिंग्स</span>
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>लॉग आउट</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm">
                    <LogIn className="w-4 h-4" />
                    <span className="font-medium">Login</span>
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md text-sm">
                    <UserPlus className="w-4 h-4" />
                    <span className="font-medium">Sign Up</span>
                  </button>
                </Link>
              </div>
            )}

            <Link
              href="https://www.youtube.com/BrahmendraGupta"
              className="hidden sm:block"
            >
              <button className="bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                You Tube
              </button>
            </Link>
          </div>
        </div>

        {/* Search Overlay (for mobile and tablet) */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-start justify-center p-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="w-full max-w-md flex items-center bg-white border border-gray-300 rounded-lg shadow-lg mt-16 sm:mt-24">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-3 bg-transparent text-gray-700 placeholder-gray-400 border-none outline-none text-base"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
                autoFocus
              />
              <button
                onClick={closeSearch}
                className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-r-lg transition-all duration-200"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Navigation Bar (Desktop only) */}
        <nav className="hidden lg:block bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center overflow-x-auto scrollbar-hide">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavItemClick(item.name)}
                  className={`
    relative px-6 py-3 text-white text-sm font-medium whitespace-nowrap
    transition-all duration-200 ease-in-out
    hover:bg-white/20 hover:shadow-lg
    ${index !== navigationItems.length - 1 ? "border-r border-blue-500/30" : ""}
    ${isActiveRoute(item.href) ? "bg-white/20 shadow-inner" : ""}
    ${activeNavItem === item.name ? "bg-white/30" : ""}
  `}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Active indicator */}
                  {isActiveRoute(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded"></div>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Render Side Menu Content in Portal */}
      {sideMenuContainer &&
        createPortal(
          <SideMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />,
          sideMenuContainer
        )}

      {/* Overlay for user menu (desktop) */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-30 hidden md:block"
          onClick={closeUserMenu}
        />
      )}

      {/* Overlay for mobile user menu */}
      {showMobileUserMenu && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={closeMobileUserMenu}
        />
      )}

      {/* Overlay for side menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
          onClick={closeMenu}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />
      )}
    </>
  );
}
