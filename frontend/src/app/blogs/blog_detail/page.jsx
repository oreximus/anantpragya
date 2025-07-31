"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"; // Import useRouter
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  BookOpen,
  Heart,
  Send,
} from "lucide-react";
import { Suspense } from "react";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks/redux";
import {
  fetchPostById,
  fetchPosts,
  clearError,
  postComment, // Import the new thunk
  fetchComments, // Import fetchComments thunk
  postLike, // Import postLike thunk
  clearMessage, // Import clearMessage for comment success
  getLikes, // Import getLikes thunk
} from "../../../lib/features/auth/authSlice";

function BlogDetailContent() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize useRouter
  const postId = searchParams.get("id");

  const {
    currentPost,
    currentPostLoading,
    currentPostError,
    postsList,
    postsLoading,
    postsError: relatedPostsError,
    isAuthenticated, // Get authentication status
    commentLoading, // Get comment loading status
    commentError, // Get comment error status
    commentSuccess, // Get comment success status
    commentsList, // Get comments list
    commentsTotal, // Get comments count
    commentsLoading, // Get comments loading status
    commentsError, // Get comments error status
    likeLoading, // Get like loading status
    likeError, // Get like loading status
  } = useAppSelector((state) => state.auth);

  const [commentText, setCommentText] = useState(""); // State for comment input
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
      dispatch(fetchComments(postId)); // Fetch comments when post ID is available
      dispatch(getLikes(postId)); // Fetch likes when post ID is available
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (currentPost && currentPost.categoryId) {
      dispatch(fetchPosts({ category_id: currentPost.categoryId }));
    }
  }, [dispatch, currentPost]);

  useEffect(() => {
    if (currentPostError || relatedPostsError || commentsError || likeError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentPostError, relatedPostsError, commentsError, likeError, dispatch]);

  useEffect(() => {
    if (commentSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000); // Clear success message after 3 seconds
      dispatch(fetchComments(postId)); // Refetch comments after successful post
      return () => clearTimeout(timer);
    }
  }, [commentSuccess, dispatch, postId]);

  // Handle comment submission
  const handlePostComment = async () => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }
    if (!commentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    if (!postId) {
      alert("Post ID is missing. Cannot post comment.");
      return;
    }

    try {
      await dispatch(postComment({ post_id: postId, comment: commentText }));
      setCommentText(""); // Clear input on successful submission
    } catch (error) {
      // Error handling is done via Redux state (commentError)
      console.error("Failed to post comment:", error);
    }
  };

  // Handle like/unlike
  const handlePostLike = async () => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }
    if (!postId) {
      alert("Post ID is missing. Cannot like/unlike post.");
      return;
    }
    try {
      await dispatch(postLike(postId));
    } catch (error) {
      console.error("Failed to like/unlike post:", error);
    }
  };

  // No need to fetch likes here anymore as it's done in the initial useEffect for postId
  // useEffect(() => {
  //   if (postId) {
  //     dispatch(getLikes(postId));
  //   }
  // }, [dispatch, postId]);

  // Loading state for main post
  if (currentPostLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state for main post
  if (currentPostError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">त्रुटि</h1>
          <p className="text-lg">{currentPostError}</p>
          <button
            onClick={() => dispatch(fetchPostById(postId))}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            पुनः प्रयास करें
          </button>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            लेख नहीं मिला
          </h1>
          <Link href="/blogs">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              वापस जाएं
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter and sort related blogs
  const relatedBlogs = postsList
    .filter((post) => post.id !== currentPost.id) // Exclude the current post
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by most recent
    .slice(0, 3); // Get only the 3 most recent

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">वापस जाएं</span>
          </Link>

          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {currentPost.category}
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            {currentPost.title}
          </h1>

          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{currentPost.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(currentPost.date).toLocaleDateString("hi-IN")}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{currentPost.readTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>साझा करें</span>
            </button>

            <button
              onClick={handlePostLike}
              disabled={likeLoading}
              className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>पसंद ({currentPost.likes})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Blog Image */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={currentPost.image || "/placeholder.svg"}
            alt={currentPost.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-700 leading-relaxed text-lg whitespace-pre-line"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            {currentPost.content}
          </div>
        </div>

        {/* Comment Section */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Comments Header */}
            <div className="border-b border-gray-200 p-4">
              <h2
                className="text-xl font-semibold text-gray-900"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                टिप्पणियाँ ({commentsTotal})
              </h2>
            </div>

            {showShareModal && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setShowShareModal(false);
                      setCopySuccess(false);
                    }}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
                  >
                    ×
                  </button>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    लिंक साझा करें
                  </h3>

                  <div className="bg-gray-100 text-sm text-gray-700 px-4 py-2 rounded mb-4 break-all">
                    {typeof window !== "undefined" && window.location.href}
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopySuccess(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full font-medium"
                  >
                    लिंक कॉपी करें
                  </button>

                  {copySuccess && (
                    <p className="text-green-600 text-sm mt-3 text-center">
                      लिंक सफलतापूर्वक कॉपी हो गया!
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Comments List */}
            <div className="max-h-96 overflow-y-auto">
              {commentsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : commentsList.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500 text-sm">
                    कोई टिप्पणी नहीं। पहले टिप्पणी करें!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {commentsList.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 hover:bg-gray-50 transition-colors flex items-start space-x-3"
                    >
                      {/* Avatar */}
                      <div className="w-9 h-9 border rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500">
                        {comment.author ? (
                          comment.author.charAt(0).toUpperCase()
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>

                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {comment.author || "अज्ञात लेखक"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "hi-IN",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed break-words">
                          {comment.comment}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <button className="hover:underline">पसंद करें</button>
                          <button className="hover:underline">उत्तर दें</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                {/* User Avatar */}
                <div className="w-9 h-9 border rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-500">
                  <User className="w-4 h-4" />
                </div>

                {/* Input Field */}
                <div className="flex-1 flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="टिप्पणी जोड़ें..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      !commentLoading &&
                      handlePostComment()
                    }
                    className="flex-1 border-none outline-none text-sm text-gray-900 placeholder-gray-500 bg-transparent focus:ring-0 focus:ring-offset-0"
                    disabled={commentLoading}
                  />

                  <button
                    onClick={handlePostComment}
                    disabled={commentLoading || !commentText.trim()}
                    className="p-2 text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors"
                  >
                    {commentLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Success/Error Messages */}
              {commentSuccess && (
                <div className="mt-2 text-green-600 text-xs">
                  {commentSuccess}
                </div>
              )}
              {commentError && (
                <div className="mt-2 text-red-600 text-xs">{commentError}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                संबंधित लेख
              </h2>
              <p className="text-gray-600">इसी विषय पर और भी रोचक लेख पढ़ें</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <div
                  key={relatedBlog.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                    <img
                      src={relatedBlog.image || "/placeholder.svg"}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {relatedBlog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{relatedBlog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{relatedBlog.readTime}</span>
                      </div>
                    </div>
                    <h3
                      className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors"
                      style={{
                        fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                      }}
                    >
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {relatedBlog.summary}
                    </p>
                    <Link
                      href={`/blogs/blog_detail?id=${relatedBlog.id}&category=${relatedBlog.category}`}
                    >
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors group">
                        <span>पूरा पढ़ें</span>
                        <BookOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-6"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            और भी प्रेरणादायक लेख पढ़ें
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            अनंतप्रज्ञा के साथ अपनी आध्यात्मिक यात्रा जारी रखें
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blogs">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                सभी लेख देखें
              </button>
            </Link>
            <Link href="/signup">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
                न्यूज़लेटर सब्सक्राइब करें
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogDetail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <BlogDetailContent />
    </Suspense>
  );
}
