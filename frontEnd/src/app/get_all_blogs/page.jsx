"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Clock,
  Tag,
  MoreVertical,
  Plus,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/redux";
import {
  fetchCategories, // Import fetchCategories
  fetchPosts, // Import fetchPosts
  deletePost, // Import deletePost
  clearError,
  clearMessage,
} from "../../lib/features/auth/authSlice";

export default function GetAllBlogs() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    user,
    categoriesList,
    categoriesLoading,
    categoriesError,
    postsList, // Get posts from Redux
    postsTotal, // Get total posts count
    postsLoading, // Get posts loading state
    postsError, // Get posts error state
    message,
    error,
  } = useAppSelector((state) => state.auth);

  // Effect to fetch categories only once on component mount or when auth state changes
  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      dispatch(fetchCategories());
    }
  }, [isAuthenticated, user, dispatch]);

  // Memoized function to fetch posts based on current filters and pagination
  const fetchPostsWithFilters = useCallback(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      // This check is already handled by the top-level return, but good for clarity.
      return;
    }

    // If categories are still loading and a specific category is selected, wait.
    // This prevents fetching posts with an invalid categoryId.
    if (
      selectedCategory !== "all" &&
      categoriesList.length === 0 &&
      categoriesLoading
    ) {
      return;
    }

    const categoryId =
      selectedCategory === "all"
        ? undefined
        : categoriesList.find((cat) => cat.name === selectedCategory)?.id;

    dispatch(
      fetchPosts({
        page: currentPage,
        limit: postsPerPage,
        search: searchQuery,
        category_id: categoryId,
      })
    );
  }, [
    isAuthenticated,
    user,
    dispatch,
    selectedCategory, // Trigger re-fetch when category filter changes
    searchQuery, // Trigger re-fetch when search query changes
    currentPage, // Trigger re-fetch when page changes
    categoriesList, // Trigger re-fetch if categoriesList changes (e.g., after initial load)
    categoriesLoading, // Ensure we don't try to use categoriesList before it's potentially loaded
  ]);

  // Effect to trigger fetching posts whenever filters or pagination change
  useEffect(() => {
    fetchPostsWithFilters();
  }, [fetchPostsWithFilters]); // Dependency: the memoized function itself

  // Effect to clear messages/errors after a short delay
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  // Handlers for filter changes that should reset pagination
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset page when category changes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page when search query changes
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1); // Ensure search starts from page 1
    fetchPostsWithFilters(); // Manually trigger fetch on search submit
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            अनधिकृत पहुंच
          </h1>
          <p className="text-gray-600 mb-6">
            आपके पास इस पृष्ठ तक पहुंचने की अनुमति नहीं है।
          </p>
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              मुख्य पृष्ठ पर जाएं
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (postsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">त्रुटि</h1>
          <p className="text-lg">{postsError}</p>
          <button
            onClick={() => dispatch(clearError())}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            पुनः प्रयास करें
          </button>
        </div>
      </div>
    );
  }

  // Apply client-side sorting to the fetched postsList
  const sortedPosts = [...postsList].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date) - new Date(a.date);
      case "title":
        return a.title.localeCompare(b.title);
      case "views":
        return b.views - a.views;
      case "likes":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const handleDeleteBlog = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        await dispatch(deletePost(blogToDelete.id)).unwrap();
        setShowDeleteModal(false);
        setBlogToDelete(null);
        // No need to manually refetch as the reducer updates the state
      } catch (error) {
        console.error("Failed to delete post:", error);
        // Error is already handled by the slice
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            प्रकाशित
          </span>
        );
      case "draft":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            ड्राफ्ट
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            अज्ञात
          </span>
        );
    }
  };

  const getCategoryLabel = (categoryValue) => {
    const category = categoriesList.find((cat) => cat.name === categoryValue);
    return category ? category.name : categoryValue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">वापस जाएं</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1
              className="text-2xl md:text-3xl font-bold text-gray-800"
              style={{
                fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
              }}
            >
              सभी लेख प्रबंधन
            </h1>
          </div>

          <Link href="/create_post">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
              <Plus className="w-5 h-5" />
              <span>नया लेख लिखें</span>
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">कुल लेख</p>
                <p className="text-2xl font-bold text-gray-800">{postsTotal}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">प्रकाशित</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    postsList.filter((blog) => blog.status === "published")
                      .length
                  }
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ड्राफ्ट</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {postsList.filter((blog) => blog.status === "draft").length}
                </p>
              </div>
              <Edit className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">कुल व्यूज</p>
                <p className="text-2xl font-bold text-purple-600">
                  {postsList
                    .reduce((total, blog) => total + blog.views, 0)
                    .toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="लेख खोजें..."
                value={searchQuery}
                onChange={handleSearchChange}
                onBlur={handleSearchSubmit} // Trigger fetch on blur
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }} // Trigger fetch on Enter
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black appearance-none"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                <option value="all">सभी श्रेणियां</option>
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black appearance-none"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                <option value="date">तारीख के अनुसार</option>
                <option value="title">शीर्षक के अनुसार</option>
                <option value="views">व्यूज के अनुसार</option>
                <option value="likes">लाइक्स के अनुसार</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-3">
              <span className="text-sm text-gray-600">
                {sortedPosts.length} में से {postsTotal} लेख
              </span>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
            >
              {/* Blog Image */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(blog.status)}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === blog.id ? null : blog.id
                        )
                      }
                      className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeDropdown === blog.id && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                        <Link
                          href={`/blog/blog_detail?id=${blog.id}&category=${blog.category}`}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Eye className="w-4 h-4" />
                          <span>देखें</span>
                        </Link>
                        <button
                          onClick={() => {
                            router.push(`/edit-post/${blog.id}`);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>संपादित करें</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog)}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>हटाएं</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                    {getCategoryLabel(blog.category)}
                  </span>
                </div>

                <h3
                  className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {blog.summary}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(blog.date).toLocaleDateString("hi-IN")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{blog.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{blog.likes}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/blog_detail?id=${blog.id}&category=${blog.category}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    पूरा पढ़ें →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              कोई लेख नहीं मिला
            </h3>
            <p className="text-gray-600 mb-6">
              आपके फिल्टर के अनुसार कोई लेख उपलब्ध नहीं है।
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setCurrentPage(1);
                // No need to call fetchPostsWithFilters here, as state updates will trigger it via useEffect
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              फिल्टर साफ़ करें
            </button>
          </div>
        )}

        {/* Pagination (Basic example, can be expanded) */}
        {postsTotal > postsPerPage && (
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              पिछला
            </button>
            <span className="flex items-center text-gray-700">
              पृष्ठ {currentPage} का {Math.ceil(postsTotal / postsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage * postsPerPage >= postsTotal}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              अगला
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3
              className="text-xl font-bold text-gray-800 mb-4"
              style={{
                fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
              }}
            >
              लेख हटाएं
            </h3>
            <p className="text-gray-600 mb-6">
              क्या आप वाकई "{blogToDelete?.title}" लेख को हटाना चाहते हैं? यह
              क्रिया पूर्ववत नहीं की जा सकती।
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                रद्द करें
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                हटाएं
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
