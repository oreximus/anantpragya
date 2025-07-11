"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  ImageIcon,
  Type,
  Tag,
  Calendar,
  User,
  Upload,
  X,
  Plus,
} from "lucide-react";
import { useAppSelector } from "../../lib/hooks/redux";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    tags: [],
    featuredImage: null,
    status: "draft", // draft, published
  });
  const [newTag, setNewTag] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const categories = [
    { value: "inspirational", label: "प्रेरणादायक" },
    { value: "believe", label: "विश्वास" },
    { value: "guidance", label: "मार्गदर्शन" },
    { value: "hard_work", label: "कड़ी मेहनत" },
    { value: "health", label: "स्वास्थ्य" },
    { value: "habits", label: "आदतें" },
    { value: "big_dreams", label: "बड़े सपने" },
    { value: "relationship", label: "संबंध" },
    { value: "decision_process", label: "निर्णय प्रक्रिया" },
    { value: "spiritual", label: "आध्यात्मिक" },
    { value: "meditation", label: "ध्यान" },
    { value: "yoga", label: "योग" },
    { value: "lifestyle", label: "जीवनशैली" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: null,
    }));
    setImagePreview(null);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      console.log("Post data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("लेख सफलतापूर्वक सहेजा गया!");
      router.push("/blogs");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("लेख सहेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setFormData((prev) => ({ ...prev, status: "draft" }));
    handleSubmit();
  };

  const handlePublish = async () => {
    setFormData((prev) => ({ ...prev, status: "published" }));
    handleSubmit();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">वापस जाएं</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>{isPreview ? "संपादन" : "पूर्वावलोकन"}</span>
            </button>
          </div>
        </div>

        {!isPreview ? (
          /* Create/Edit Form */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
              <h1
                className="text-2xl font-bold text-gray-800"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                नया लेख लिखें
              </h1>
              <p className="text-gray-600 mt-2">
                अपने विचारों को साझा करें और दूसरों को प्रेरित करें
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  शीर्षक *
                </label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                    placeholder="लेख का शीर्षक दर्ज करें"
                    style={{
                      fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                    }}
                    required
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  सारांश *
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-black"
                  placeholder="लेख का संक्षिप्त सारांश लिखें (2-3 वाक्य)"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                  required
                />
              </div>

              {/* Category and Tags Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    श्रेणी *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                      required
                    >
                      <option value="">श्रेणी चुनें</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    टैग्स
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                      placeholder="टैग जोड़ें"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-blue-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मुख्य चित्र
                </label>
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      चित्र अपलोड करने के लिए क्लिक करें या खींचकर छोड़ें
                    </p>
                    <label className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>चित्र चुनें</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मुख्य सामग्री *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-black"
                  placeholder="अपना लेख यहाँ लिखें..."
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  न्यूनतम 500 शब्द लिखें। अपने विचारों को स्पष्ट और प्रेरणादायक
                  तरीके से व्यक्त करें।
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>ड्राफ्ट सहेजें</span>
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={
                    isSubmitting ||
                    !formData.title ||
                    !formData.content ||
                    !formData.category
                  }
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>प्रकाशित हो रहा है...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>प्रकाशित करें</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Preview */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Preview Header */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
              <h2
                className="text-2xl font-bold text-gray-800"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                पूर्वावलोकन
              </h2>
              <p className="text-gray-600 mt-2">
                आपका लेख कैसा दिखेगा इसका पूर्वावलोकन
              </p>
            </div>

            <div className="p-6">
              {/* Preview Content */}
              <div className="max-w-4xl mx-auto">
                {/* Category Badge */}
                {formData.category && (
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {
                        categories.find(
                          (cat) => cat.value === formData.category
                        )?.label
                      }
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1
                  className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  {formData.title || "लेख का शीर्षक"}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>
                      {user?.first_name} {user?.last_name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString("hi-IN")}</span>
                  </div>
                </div>

                {/* Featured Image */}
                {imagePreview && (
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt={formData.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </div>
                )}

                {/* Summary */}
                {formData.summary && (
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
                    <p
                      className="text-lg text-gray-700 leading-relaxed"
                      style={{
                        fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                      }}
                    >
                      {formData.summary}
                    </p>
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed text-lg whitespace-pre-line"
                    style={{
                      fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                    }}
                  >
                    {formData.content || "लेख की मुख्य सामग्री यहाँ दिखेगी..."}
                  </div>
                </div>

                {/* Tags */}
                {formData.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      टैग्स:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
