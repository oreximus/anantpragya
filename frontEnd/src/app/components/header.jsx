"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Menu,
  Search,
  X,
  ChevronRight,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Settings,
  PenTool,
  FileText,
  Users,
} from "lucide-react"; // Added Users icon
import { useAppSelector, useAppDispatch } from "../../lib/hooks/redux";
import { logout } from "../../lib/features/auth/authSlice";

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
  {
    name: "CREATE POST",
    href: "/create-post",
    icon: PenTool,
    requireAuth: true,
    adminOnly: true,
  },
  {
    name: "ALL BLOGS",
    href: "/get_all_blogs",
    icon: FileText,
    requireAuth: true,
    adminOnly: true,
  },
  {
    name: "ALL USERS",
    href: "/list_of_all_user",
    icon: Users,
    requireAuth: true,
    adminOnly: true,
  }, // New item
];

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sideMenuContainer, setSideMenuContainer] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Find the side menu container in the layout
    const container = document.querySelector(".fixed.top-0.left-0.h-full");
    setSideMenuContainer(container);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
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

  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName);
    setTimeout(() => setActiveNavItem(""), 300);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    closeMenu();
    closeUserMenu();
  };

  const handleMenuItemClick = (item) => {
    // Check if item requires authentication
    if (item.requireAuth && !isAuthenticated) {
      router.push("/login");
      closeMenu();
      return;
    }

    // Check if item is admin only
    if (item.adminOnly && user?.role !== "admin") {
      alert("आपके पास इस सुविधा तक पहुंचने की अनुमति नहीं है।");
      closeMenu();
      return;
    }

    // Navigate to the item's href if it exists
    if (item.href) {
      router.push(item.href);
      closeMenu();
    }
  };

  const isActiveRoute = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const getMenuItemLabel = (itemName) => {
    switch (itemName) {
      case "CREATE POST":
        return "लेख लिखें";
      case "ALL BLOGS":
        return "सभी लेख";
      case "ALL USERS": // New case
        return "सभी उपयोगकर्ता";
      default:
        return itemName;
    }
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

        {/* User Info or Auth Buttons */}
        {isAuthenticated && user ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.role === "admin" && (
                  <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                    एडमिन
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Link href="/profile" onClick={closeMenu} className="flex-1">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
                  <Settings className="w-4 h-4" />
                  <span>प्रोफाइल</span>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span>लॉग आउट</span>
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {sideMenuItems.map((item, index) => {
          // Check if item should be shown based on authentication and admin status
          if (item.requireAuth && !isAuthenticated) {
            return null;
          }
          if (item.adminOnly && user?.role !== "admin") {
            return null;
          }

          const ItemIcon = item.icon;
          const isActive = item.href && isActiveRoute(item.href);

          return (
            <div
              key={item.name}
              className={`flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-gray-50 border-b border-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group cursor-pointer ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-l-4 border-l-blue-600"
                  : ""
              }`}
              onClick={() => handleMenuItemClick(item)}
            >
              <div className="flex items-center space-x-3">
                {ItemIcon && (
                  <ItemIcon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-blue-600"
                    }`}
                  />
                )}
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-blue-600" : "group-hover:text-blue-600"
                  }`}
                  style={{
                    fontFamily:
                      item.name === "CREATE POST" ||
                      item.name === "ALL BLOGS" ||
                      item.name === "ALL USERS" // Added ALL USERS
                        ? "Noto Sans Devanagari, Arial, sans-serif"
                        : "inherit",
                  }}
                >
                  {getMenuItemLabel(item.name)}
                </span>
              </div>
              {item.hasSubmenu && (
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-200 transform group-hover:translate-x-1 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-blue-600"
                  }`}
                />
              )}
            </div>
          );
        })}
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

          {/* Right Side - Auth, Live TV */}
          <div className="flex items-center space-x-2">
            {/* Auth Buttons or User Menu */}
            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center space-x-3 relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 active:scale-95"
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
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>प्रोफाइल सेटिंग्स</span>
                    </Link>
                    {user.role === "admin" && (
                      <>
                        <Link
                          href="/create-post"
                          onClick={closeUserMenu}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <PenTool className="w-4 h-4" />
                          <span>लेख लिखें</span>
                        </Link>
                        <Link
                          href="/get-all-blogs"
                          onClick={closeUserMenu}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          <span>सभी लेख</span>
                        </Link>
                        <Link // New dropdown menu item
                          href="/list_of_all_users"
                          onClick={closeUserMenu}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Users className="w-4 h-4" />
                          <span>सभी उपयोगकर्ता</span>
                        </Link>
                      </>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
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
            )}

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

      {/* Overlay for user menu */}
      {showUserMenu && (
        <div className="fixed inset-0 z-30" onClick={closeUserMenu} />
      )}
    </>
  );
}
