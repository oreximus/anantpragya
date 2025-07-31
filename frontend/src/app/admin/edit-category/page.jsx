"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { updateCategory } from "../../../lib/features/auth/authAPI";

export default function EditCategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("id");
  const initialName = searchParams.get("name");

  useEffect(() => {
    if (initialName) {
      setCategoryName(decodeURIComponent(initialName));
    }
  }, [initialName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      setMessage({
        type: "error",
        text: "Category ID is missing. Please go back and try again.",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await updateCategory({
        id: categoryId,
        name: categoryName,
      });

      if (response.data.status) {
        setMessage({
          type: "success",
          text: response.data.message || "Category updated successfully!",
        });
        // Redirect after a short delay
        setTimeout(() => router.push("/admin/list_of_catogory"), 2000);
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to update category.",
        });
      }
    } catch (error) {
      console.error("Failed to update category:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to update category. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!categoryId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">त्रुटि</h1>
            <p className="text-gray-600 mb-6">
              Category ID नहीं मिली। कृपया वापस जाकर पुनः प्रयास करें।
            </p>
            <Link href="/admin/list_of_catogory">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                श्रेणियों की सूची पर जाएं
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin/list_of_catogory"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">वापस</span>
          </Link>
          <h1
            className="text-3xl font-bold text-gray-800"
            style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
          >
            श्रेणी संपादित करें
          </h1>
          <div className="w-10" /> {/* Spacer for alignment */}
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

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Category ID:</strong> {categoryId}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              श्रेणी का नाम *
            </label>
            <input
              id="categoryName"
              type="text"
              placeholder="उदाहरण: प्रेरणादायक विचार"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>
              {isLoading ? "अपडेट हो रहा है..." : "श्रेणी अपडेट करें"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
