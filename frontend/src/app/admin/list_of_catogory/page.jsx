"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, PlusCircle, List, Loader2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks/redux";
import { fetchCategories } from "../../../lib/features/auth/authSlice";
import { deleteCategory } from "../../../lib/features/auth/authAPI";

export default function ListCategoriesPage() {
  const dispatch = useAppDispatch();
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    categoriesList: categories,
    categoriesLoading: isLoading,
    categoriesError: error,
    isAuthenticated,
    user,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      dispatch(fetchCategories());
    }
  }, [isAuthenticated, user, dispatch]);

  // page.jsx - inside handleDelete function
  const handleDelete = async (categoryId, categoryName) => {
    if (!confirm(`क्या आप वाकई "${categoryName}" श्रेणी को हटाना चाहते हैं?`)) {
      return;
    }

    setDeletingId(categoryId);
    setMessage({ type: "", text: "" });

    try {
      console.log(categoryId, "<===this is cate id");
      // AWAIT the response here
      const response = await deleteCategory(categoryId);

      console.log(response.data, "<===Final response!"); // Access data from the awaited response

      if (response.data.status) {
        setMessage({
          type: "success",
          text: response.data.message || "Category deleted successfully!",
        });
        // Re-fetch categories to update the list
        dispatch(fetchCategories());
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to delete category.",
        });
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to delete category. Please try again.",
      });
    } finally {
      setDeletingId(null);
      // Clear message after 5 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-3xl font-bold text-gray-800"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            श्रेणियों की सूची
          </h1>
          <Link href="/admin/create_category">
            <button className="inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PlusCircle className="w-5 h-5" />
              <span>नई श्रेणी जोड़ें</span>
            </button>
          </Link>
        </div>

        {message.text && (
          <div
            className={`p-3 rounded-md mb-6 text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">
              श्रेणियाँ लोड हो रही हैं...
            </span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">
            <p>{error}</p>
            <button
              onClick={() => dispatch(fetchCategories())}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              पुनः प्रयास करें
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <List className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-semibold mb-2">कोई श्रेणी नहीं मिली।</p>
            <p>नई श्रेणी जोड़ने के लिए ऊपर दिए गए बटन का उपयोग करें।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-gray-800 mb-2"
                    style={{
                      fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                    }}
                  >
                    {category.name}
                  </h3>
                  <div className="flex items-center mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.is_active ? "सक्रिय" : "निष्क्रिय"}
                    </span>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/admin/edit-category?id=${
                        category.id
                      }&name=${encodeURIComponent(category.name)}`}
                    >
                      <button className="inline-flex items-center justify-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id, category.name)}
                      disabled={deletingId === category.id}
                      className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === category.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
