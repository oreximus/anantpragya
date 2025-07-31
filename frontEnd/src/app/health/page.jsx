"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Activity,
  Apple,
  Brain,
  Clock,
  User,
  Calendar,
  BookOpen,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks/redux";
import { fetchPosts, clearError } from "../../lib/features/auth/authSlice";

export default function Health() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId"); // Get categoryId from URL

  const { postsList, postsLoading, postsError } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchPosts({ category_id: categoryId }));
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (postsError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [postsError, dispatch]);

  // Loading state
  if (postsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Error state
  if (postsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">त्रुटि</h1>
          <p className="text-lg">{postsError}</p>
          <button
            onClick={() => dispatch(fetchPosts({ category_id: categoryId }))}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            पुनः प्रयास करें
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-teal-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">वापस जाएं</span>
          </Link>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              स्वास्थ्य
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              स्वस्थ जीवन जीने के लिए संपूर्ण गाइड। यहाँ मिलेंगे स्वास्थ्य से
              जुड़े सभी सवालों के जवाब और व्यावहारिक सुझाव।
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              स्वास्थ्य गाइड
            </h2>
            <p className="text-gray-600 text-lg">
              शारीरिक और मानसिक स्वास्थ्य के लिए संपूर्ण जानकारी
            </p>
          </div>

          {postsList.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                कोई लेख उपलब्ध नहीं है
              </h3>
              <p className="text-gray-600 mb-6">
                वर्तमान में इस श्रेणी में कोई लेख प्रकाशित नहीं किए गए हैं।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsList.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
                >
                  <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        article.image || "/placeholder.svg?height=400&width=600"
                      }
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(article.date).toLocaleDateString("hi-IN")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3
                      className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors"
                      style={{
                        fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                      }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.summary}
                    </p>
                    <Link
                      href={`/blogs/blog_detail?id=${article.id}&category=${article.category}`}
                    >
                      <button className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 transition-colors group">
                        <span>पूरा पढ़ें</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            स्वस्थ जीवन की शुरुआत करें
          </h2>
          <p className="text-green-100 text-lg mb-8 leading-relaxed">
            आज से ही अपने स्वास्थ्य की देखभाल शुरू करें और खुशहाल जीवन जिएं
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                हेल्थ गाइड पाएं
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-all">
                डॉक्टर से सलाह
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
