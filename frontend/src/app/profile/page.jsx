"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  Eye,
  EyeOff,
  Save,
  Lock,
  Phone,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/redux";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  clearError,
  clearMessage,
} from "../../lib/features/auth/authSlice";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    profileLoading,
    passwordChangeLoading,
    error,
    message,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Fetch user profile on component mount
    dispatch(getUserProfile());
  }, [dispatch, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone_no || "",
      });
    }
  }, [user]);

  useEffect(() => {
    // Clear error and message when component mounts
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateUserProfile(profileData)).unwrap();
      // Profile updated successfully
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते");
      return;
    }

    try {
      await dispatch(
        changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        })
      ).unwrap();

      // Clear password form on success
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change failed:", error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">वापस जाएं</span>
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1
                className="text-3xl font-bold text-gray-800 mb-2"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    सदस्य बने:{" "}
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("hi-IN")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span
                    className={
                      user?.is_email_verified
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {user?.is_email_verified
                      ? "ईमेल सत्यापित"
                      : "ईमेल असत्यापित"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                प्रोफाइल जानकारी
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === "password"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                पासवर्ड बदलें
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      पहला नाम
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="पहला नाम"
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      अंतिम नाम
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="अंतिम नाम"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ईमेल पता
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="ईमेल पता"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    फोन नंबर
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="फोन नंबर"
                    />
                  </div>
                </div>

                {/* Update Button */}
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {profileLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>अपडेट हो रहा है...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>प्रोफाइल अपडेट करें</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Password Tab */}
            {activeTab === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    वर्तमान पासवर्ड
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-12 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="वर्तमान पासवर्ड"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    नया पासवर्ड
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-12 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="नया पासवर्ड"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    नया पासवर्ड की पुष्टि करें
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full pl-10 pr-12 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="नया पासवर्ड दोबारा दर्ज करें"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Change Password Button */}
                <button
                  type="submit"
                  disabled={passwordChangeLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {passwordChangeLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>पासवर्ड बदला जा रहा है...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>पासवर्ड बदलें</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
