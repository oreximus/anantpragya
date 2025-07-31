"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/redux";
import {
  forgotPassword,
  clearError,
  clearMessage,
} from "../../lib/features/auth/authSlice";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error, message, passwordResetSent } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (passwordResetSent) {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    }
  }, [passwordResetSent, email, router]);

  useEffect(() => {
    // Clear error and message when component mounts
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("कृपया ईमेल पता दर्ज करें");
      return;
    }

    try {
      await dispatch(forgotPassword(email)).unwrap();
    } catch (error) {
      console.error("Forgot password failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/login"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">वापस जाएं</span>
        </Link>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-2xl font-bold text-gray-800 mb-2"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              पासवर्ड भूल गए?
            </h1>
            <p className="text-gray-600">
              चिंता न करें, हम आपको पासवर्ड रीसेट करने में मदद करेंगे
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{message}</p>
            </div>
          )}

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ईमेल पता
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="आपका ईमेल पता दर्ज करें"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                हम आपके ईमेल पर पासवर्ड रीसेट कोड भेजेंगे
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  भेजा जा रहा है...
                </div>
              ) : (
                "रीसेट कोड भेजें"
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              पासवर्ड याद आ गया?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                लॉग इन करें
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
