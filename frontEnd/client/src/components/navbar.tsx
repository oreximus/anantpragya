import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Settings, Clover } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { href: "/", label: "मुख्य पृष्ठ", en: "Home" },
    { href: "/", label: "ब्लॉग", en: "Blogs" },
    { href: "/about", label: "हमारे बारे में", en: "About" },
    { href: "/contact", label: "संपर्क", en: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-warm border-b border-saffron-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-gold-500 rounded-full flex items-center justify-center">
              <Clover className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-hindi text-saffron-600">
                अनंत प्रज्ञा
              </h1>
              <p className="text-xs text-terracotta-600 font-english">
                Infinite Wisdom
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-saffron-600"
                    : "text-saffron-700 hover:text-saffron-500"
                }`}
              >
                <span className="font-hindi">{item.label}</span>
                <span className="text-sm text-gray-500 ml-1">{item.en}</span>
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-saffron-600 hover:text-saffron-500"
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* CMS Button */}
            <Link href="/cms">
              <Button
                size="sm"
                className="bg-saffron-500 text-white hover:bg-saffron-600 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">CMS</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-saffron-600"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-saffron-100 text-saffron-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-hindi">{item.label}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {item.en}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative max-w-md mx-auto">
              <Input
                type="text"
                placeholder="खोजें... Search..."
                className="pl-10 pr-4 border-saffron-200 focus:ring-saffron-400 font-hindi"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-saffron-400 w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
