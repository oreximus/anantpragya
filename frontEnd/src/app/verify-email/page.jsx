"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/redux";
import {
  verifyEmail,
  resendVerification,
  clearError,
  clearMessage,
} from "../../lib/features/auth/authSlice";
import { Suspense } from "react";

function VerifyEmailContent() {
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { isLoading, error, message, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user?.is_email_verified) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    // Clear error and message when component mounts
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      alert("कृपया सभी फील्ड भरें");
      return;
    }

    try {
      await dispatch(
        verifyEmail({
          email: email,
          otp: otp,
        })
      ).unwrap();

      // Redirect to login after successful verification
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    try {
      await dispatch(resendVerification(email)).unwrap();
      setResendCooldown(60); // 60 seconds cooldown
    } catch (error) {
      console.error("Resend verification failed:", error);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            अमान्य अनुरोध
          </h1>
          <p className="text-gray-600 mb-6">
            ईमेल पता नहीं मिला। कृपया पुनः साइन अप करें।
          </p>
          <Link href="/signup">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              साइन अप करें
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/signup"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">वापस जाएं</span>
        </Link>

        {/* Verify Email Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-2xl font-bold text-gray-800 mb-2"
              style={{ fontFamily: "Noto Sans Devanagari, Arial, sans-serif" }}
            >
              ईमेल सत्यापन
            </h1>
            <p className="text-gray-600">
              हमने आपके ईमेल पर एक सत्यापन कोड भेजा है
            </p>
            <p className="text-sm text-blue-600 mt-2 font-medium">{email}</p>
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

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                सत्यापन कोड
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-2xl font-mono tracking-widest"
                placeholder="000000"
                maxLength={6}
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                6 अंकों का कोड दर्ज करें
              </p>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  सत्यापन हो रहा है...
                </div>
              ) : (
                "ईमेल सत्यापित करें"
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-3">कोड नहीं मिला?</p>
            <button
              onClick={handleResendOTP}
              disabled={resendCooldown > 0 || isLoading}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4" />
              <span>
                {resendCooldown > 0
                  ? `${resendCooldown} सेकंड में दोबारा भेजें`
                  : "कोड दोबारा भेजें"}
              </span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            पहले से सत्यापित है?{" "}
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
  );
}

export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
