// sidemenu.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  ChevronRight,
  User,
  LogOut,
  Settings,
  PenTool,
  FileText,
  Users,
  PlusCircle,
  List,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/redux";
import { logout, fetchCategories } from "../../lib/features/auth/authSlice"; // Import fetchCategories and useEffect

import { useEffect } from "react"; // Import useEffect

// Import your logo image
import AnantpragyaLogo from "../../../public/logo_4.png";

// Admin-specific items for the side menu
const sideMenuAdminItems = [
  {
    name: "CREATE POST",
    href: "/admin/create_post",
    icon: PenTool,
    requireAuth: true,
    adminOnly: true,
  },
  {
    name: "ALL BLOGS",
    href: "/admin/get_all_blogs",
    icon: FileText,
    requireAuth: true,
    adminOnly: true,
  },
  {
    name: "ALL USERS",
    href: "/admin/list_of_all_user",
    icon: Users,
    requireAuth: true,
    adminOnly: true,
  },
  {
    name: "ADD CATEGORY",
    href: "/admin/create_category",
    icon: PlusCircle,
    requireAuth: true,
    adminOnly: true,
  },
  {
    name: "LIST OF CATEGORY",
    href: "/admin/list_of_catogory",
    icon: List,
    requireAuth: true,
    adminOnly: true,
  },
];

// Common navigation items that are also shown in the side menu
const commonSideMenuItems = [
  { name: "HOME", href: "/" },
  { name: "ALL BLOGS", href: "/blogs" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
];

export default function SideMenu({ isMenuOpen, closeMenu }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, categoriesList, categoriesLoading } =
    useAppSelector((state) => state.auth);

  // Fetch categories when the component mounts or when the menu is opened
  useEffect(() => {
    if (isMenuOpen && categoriesList.length === 0 && !categoriesLoading) {
      dispatch(fetchCategories());
    }
  }, [isMenuOpen, categoriesList.length, categoriesLoading, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    closeMenu();
  };

  const handleMenuItemClick = (item) => {
    if (item.requireAuth && !isAuthenticated) {
      router.push("/login");
      closeMenu();
      return;
    }

    if (item.adminOnly && user?.role !== "admin") {
      alert("आपके पास इस सुविधा तक पहुंचने की अनुमति नहीं है।");
      closeMenu();
      return;
    }

    if (item.href) {
      router.push(item.href);
      closeMenu();
    }
  };

  const isActiveRoute = (href) => {
    if (href === "/") return pathname === "/";
    // Special handling for category pages to match /common route
    if (href.startsWith("/common?categoryId=")) {
      const categoryIdFromHref = new URLSearchParams(href.split("?")[1]).get(
        "categoryId"
      );
      // Get the current categoryId from the window's actual URL search params
      const currentCategoryId = new URLSearchParams(window.location.search).get(
        "categoryId"
      );
      return pathname === "/common" && currentCategoryId === categoryIdFromHref;
    }
    return pathname.startsWith(href);
  };

  const getMenuItemLabel = (itemName) => {
    // This is already good for static items.
    // For dynamic categories, we will use their 'name' property directly.
    switch (itemName) {
      case "CREATE POST":
        return "लेख लिखें";
      case "ALL BLOGS":
        return "सभी लेख";
      case "ALL USERS":
        return "सभी उपयोगकर्ता";
      case "ADD CATEGORY":
        return "श्रेणी जोड़ें";
      case "LIST OF CATEGORY":
        return "श्रेणियों की सूची";
      case "HOME":
        return "होम";
      case "ABOUT US":
        return "हमारे बारे में";
      case "CONTACT US":
        return "संपर्क करें";
      default:
        return itemName; // For dynamic categories, return their actual name
    }
  };

  // Combine static and dynamic categories for rendering
  const allCategories = categoriesList.map((cat) => ({
    name: cat.name.toUpperCase(), // Convert to uppercase for consistency
    href: `/common?categoryId=${cat.id}`,
    isDynamic: true, // Flag to identify dynamic categories
  }));

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } max-h-screen overflow-hidden`}
    >
      <div className="flex flex-col h-full">
        {/* Menu Header - Fixed */}
        <div className="flex-shrink-0 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="flex items-center space-x-3"
              onClick={closeMenu}
            >
              <Image
                src={AnantpragyaLogo || "/placeholder.svg"}
                alt="अनंतप्रज्ञा Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              aria-label="Close menu"
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
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {user.email}
                  </p>
                  {user.role === "admin" && (
                    <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                      एडमिन
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
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
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Link href="/login" onClick={closeMenu} className="flex-1">
                <button className="w-full bg-white text-blue-600 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 border border-blue-200 transform hover:scale-105 active:scale-95">
                  LOGIN
                </button>
              </Link>
              <Link href="/signup" onClick={closeMenu} className="flex-1">
                <button className="w-full bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm">
                  SIGN UP
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation Items for Side Menu */}
          <div className="py-2">
            <p className="px-4 sm:px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Navigation
            </p>
            {commonSideMenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleMenuItemClick(item)}
                className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-gray-700 hover:bg-gray-50 transition-all duration-200 group cursor-pointer ${
                  isActiveRoute(item.href)
                    ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600"
                    : ""
                }`}
              >
                <span
                  className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                    isActiveRoute(item.href)
                      ? "text-blue-600"
                      : "group-hover:text-blue-600"
                  }`}
                  style={{
                    fontFamily: ["HOME", "ABOUT US", "CONTACT US"].includes(
                      item.name
                    )
                      ? "Noto Sans Devanagari, Arial, sans-serif"
                      : "inherit",
                  }}
                >
                  {getMenuItemLabel(item.name)}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
              </Link>
            ))}
          </div>

          {/* Dynamic Categories */}
          <div className="py-2 border-t border-gray-100">
            <p className="px-4 sm:px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Categories
            </p>
            {categoriesLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              allCategories.map((item) => (
                <Link
                  key={item.name} // Use name or unique ID from category for key
                  href={item.href}
                  onClick={() => handleMenuItemClick(item)}
                  className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-gray-700 hover:bg-gray-50 transition-all duration-200 group cursor-pointer ${
                    isActiveRoute(item.href)
                      ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600"
                      : ""
                  }`}
                >
                  <span
                    className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                      isActiveRoute(item.href)
                        ? "text-blue-600"
                        : "group-hover:text-blue-600"
                    }`}
                    style={{
                      fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                    }}
                  >
                    {getMenuItemLabel(item.name)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                </Link>
              ))
            )}
          </div>

          {/* Admin Panel Items for Side Menu */}
          {sideMenuAdminItems.some(
            (item) =>
              item.requireAuth &&
              isAuthenticated &&
              (item.adminOnly ? user?.role === "admin" : true)
          ) && (
            <div className="py-2 border-t border-gray-100">
              <p className="px-4 sm:px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Admin Panel
              </p>
              {sideMenuAdminItems.map((item) => {
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
                    className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-gray-700 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group cursor-pointer ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l-4 border-l-blue-600"
                        : ""
                    }`}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      {ItemIcon && (
                        <ItemIcon
                          className={`w-5 h-5 transition-colors duration-200 flex-shrink-0 ${
                            isActive
                              ? "text-blue-600"
                              : "text-gray-400 group-hover:text-blue-600"
                          }`}
                        />
                      )}
                      <span
                        className={`text-sm sm:text-base font-medium transition-colors duration-200 truncate ${
                          isActive
                            ? "text-blue-600"
                            : "group-hover:text-blue-600"
                        }`}
                        style={{
                          fontFamily: [
                            "CREATE POST",
                            "ALL BLOGS",
                            "ALL USERS",
                            "ADD CATEGORY",
                            "LIST OF CATEGORY",
                          ].includes(item.name)
                            ? "Noto Sans Devanagari, Arial, sans-serif"
                            : "inherit",
                        }}
                      >
                        {getMenuItemLabel(item.name)}
                      </span>
                    </div>
                    {item.hasSubmenu && (
                      <ChevronRight
                        className={`w-4 h-4 transition-all duration-200 transform group-hover:translate-x-1 flex-shrink-0 ${
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
          )}
        </div>
      </div>
    </div>
  );
}
