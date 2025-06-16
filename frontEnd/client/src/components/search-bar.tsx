import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X, Clock, User } from "lucide-react";
import { Link } from "wouter";
import type { Post, Category } from "@shared/schema";

interface SearchBarProps {
  className?: string;
  onSelect?: () => void;
}

export default function SearchBar({ className = "", onSelect }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["/api/posts", { search: searchQuery }],
    enabled: searchQuery.length > 2,
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search submission
      console.log("Searching for:", searchQuery);
      setIsOpen(false);
      onSelect?.();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(value.length > 0);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setSearchQuery("");
    onSelect?.();
  };

  const getCategory = (categoryId: number) => {
    return categories?.find((cat: Category) => cat.id === categoryId);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery.length > 0 && setIsOpen(true)}
          placeholder="खोजें... Search..."
          className="pl-10 pr-10 border-saffron-200 focus:ring-saffron-400 bg-white/80 backdrop-blur-sm font-hindi"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-saffron-400 w-4 h-4" />
        
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 text-gray-400 hover:text-gray-600"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card className="max-h-96 overflow-y-auto shadow-warm-lg">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500 font-hindi">
                  खोजा जा रहा है...
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {searchResults.slice(0, 5).map((post: Post) => {
                    const category = getCategory(post.categoryId);
                    return (
                      <Link
                        key={post.id}
                        href={`/post/${post.slug}`}
                        onClick={handleResultClick}
                        className="block p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          {post.featuredImage && (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-16 h-12 object-cover rounded flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {category && (
                                <Badge
                                  className="text-xs font-hindi"
                                  style={{
                                    backgroundColor: category.color + "20",
                                    color: category.color,
                                  }}
                                >
                                  {category.name}
                                </Badge>
                              )}
                              <div className="flex items-center text-xs text-gray-400">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{post.readTime} मिनट</span>
                              </div>
                            </div>
                            <h4 className="font-medium text-gray-900 font-hindi text-sm leading-5 mb-1 truncate">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-600 font-hindi line-clamp-2">
                              {post.excerpt || post.content.substring(0, 100) + "..."}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <User className="w-3 h-3 mr-1" />
                              <span className="font-hindi">{post.author}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(post.createdAt).toLocaleDateString('hi-IN')}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  
                  {searchResults.length > 5 && (
                    <div className="p-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResultClick}
                        className="font-hindi"
                      >
                        सभी {searchResults.length} परिणाम देखें
                      </Button>
                    </div>
                  )}
                </div>
              ) : searchQuery.length > 2 ? (
                <div className="p-4 text-center text-gray-500 font-hindi">
                  कोई परिणाम नहीं मिला
                  <div className="text-sm text-gray-400 mt-1">
                    "{searchQuery}" के लिए कुछ नहीं मिला
                  </div>
                </div>
              ) : searchQuery.length > 0 ? (
                <div className="p-4 text-center text-gray-500 font-hindi text-sm">
                  खोजने के लिए कम से कम 3 अक्षर टाइप करें
                </div>
              ) : null}
              
              {/* Quick suggestions */}
              {searchQuery.length === 0 && (
                <div className="p-4 border-t border-gray-100">
                  <h5 className="text-sm font-medium text-gray-700 font-hindi mb-3">
                    लोकप्रिय खोजें
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("ध्यान");
                        setIsOpen(false);
                      }}
                      className="text-xs font-hindi"
                    >
                      ध्यान
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("योग");
                        setIsOpen(false);
                      }}
                      className="text-xs font-hindi"
                    >
                      योग
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("दर्शन");
                        setIsOpen(false);
                      }}
                      className="text-xs font-hindi"
                    >
                      दर्शन
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("आयुर्वेद");
                        setIsOpen(false);
                      }}
                      className="text-xs font-hindi"
                    >
                      आयुर्वेद
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
