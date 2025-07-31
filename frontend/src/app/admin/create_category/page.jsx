"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { createCategory } from "../../../lib/features/auth/authAPI";

export default function AddCategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await createCategory({
        name: categoryName,
      });

      if (response.data.status) {
        setMessage({
          type: "success",
          text: response.data.message || "Category added successfully!",
        });
        setCategoryName("");
        setCategoryDescription("");
        // Redirect after a short delay
        setTimeout(() => router.push("/admin/list_of_catogory"), 2000);
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to add category.",
        });
      }
    } catch (error) {
      console.error("Failed to add category:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to add category. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            नई श्रेणी जोड़ें
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
          <div>
            <label
              htmlFor="categoryDescription"
              className="block text-sm font-medium text-gray-700"
            >
              विवरण (वैकल्पिक)
            </label>
            <textarea
              id="categoryDescription"
              placeholder="इस श्रेणी के बारे में संक्षिप्त विवरण लिखें।"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            />
            <p className="mt-1 text-xs text-gray-500">
              नोट: वर्तमान में केवल श्रेणी का नाम API में भेजा जाता है।
            </p>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <PlusCircle className="w-5 h-5" />
            )}
            <span>{isLoading ? "जोड़ रहा है..." : "श्रेणी जोड़ें"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
