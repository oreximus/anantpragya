"use client";
import { useState, useEffect } from "react";
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
  Clock,
  Tag,
  MoreVertical,
  Plus,
  Users,
  UserCheck,
  UserX,
  Briefcase,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks/redux";
import {
  fetchAllUsers,
  deleteUserSuccess,
} from "../../../lib/features/auth/authSlice"; // Import the new thunk and action

export default function ListOfAllUsers() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("registrationDate");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    isAuthenticated,
    user,
    usersList,
    usersListLoading,
    usersListError,
    usersTotal,
  } = useAppSelector((state) => state.auth);

  const roles = [
    { value: "all", label: "सभी भूमिकाएं" },
    { value: "admin", label: "व्यवस्थापक" },
    { value: "member", label: "सदस्य" },
  ];

  useEffect(() => {
    // Check if user is admin
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/");
      return;
    }

    // Fetch users from API
    const params = {
      page: 1, // Assuming a single page for now, or add pagination state
      limit: 100, // Fetch a reasonable limit to allow client-side filtering
      search: searchQuery,
    };
    dispatch(fetchAllUsers(params));
  }, [isAuthenticated, user, router, dispatch, searchQuery]); // Re-fetch when search query changes

  useEffect(() => {
    let currentUsers = [...usersList]; // Use usersList from Redux store

    // Client-side filtering by role
    if (selectedRole !== "all") {
      currentUsers = currentUsers.filter((u) => u.role === selectedRole);
    }

    // Filter by search query (already passed to API, but also apply client-side for robustness if API search is limited)
    if (searchQuery) {
      currentUsers = currentUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort users
    currentUsers = [...currentUsers].sort((a, b) => {
      switch (sortBy) {
        case "registrationDate":
          return new Date(b.registrationDate) - new Date(a.registrationDate);
        case "name":
          return a.name.localeCompare(b.name);
        case "role":
          return a.role.localeCompare(b.role);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredUsers(currentUsers);
  }, [usersList, selectedRole, searchQuery, sortBy]); // Re-filter when usersList or filter/sort criteria change

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      // In a real application, you would dispatch an action to delete the user via API
      // For now, simulate deletion from the local state (usersList)
      dispatch(deleteUserSuccess(userToDelete.id)); // Simulate deletion
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            सक्रिय
          </span>
        );
      case "inactive":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            निष्क्रिय
          </span>
        );
      case "pending": // Keep pending for consistency, though API doesn't directly provide it
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            लंबित
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

  const getRoleLabel = (roleValue) => {
    const role = roles.find((r) => r.value === roleValue);
    return role ? role.label : roleValue;
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

  if (usersListLoading) {
    // Use usersListLoading from Redux
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (usersListError) {
    // Display error if fetching failed
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">त्रुटि</h1>
          <p className="text-gray-600 mb-6">
            उपयोगकर्ताओं को लोड करने में त्रुटि हुई: {usersListError}
          </p>
          <button
            onClick={() => dispatch(fetchAllUsers({ page: 1, limit: 100 }))} // Retry fetching
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            पुनः प्रयास करें
          </button>
        </div>
      </div>
    );
  }

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
              सभी उपयोगकर्ता प्रबंधन
            </h1>
          </div>

          <Link href="/create-user">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
              <Plus className="w-5 h-5" />
              <span>नया उपयोगकर्ता जोड़ें</span>
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">कुल उपयोगकर्ता</p>
                <p className="text-2xl font-bold text-gray-800">
                  {usersTotal} {/* Use usersTotal from Redux */}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">सक्रिय</p>
                <p className="text-2xl font-bold text-green-600">
                  {usersList.filter((u) => u.status === "active").length}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">निष्क्रिय</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {usersList.filter((u) => u.status === "inactive").length}
                </p>
              </div>
              <UserX className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">कुल भूमिकाएं</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(usersList.map((u) => u.role)).size}
                </p>
              </div>
              <Briefcase className="w-8 h-8 text-purple-600" />
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
                placeholder="उपयोगकर्ता खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black appearance-none"
                style={{
                  fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                }}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
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
                <option value="registrationDate">पंजीकरण तिथि के अनुसार</option>
                <option value="name">नाम के अनुसार</option>
                <option value="role">भूमिका के अनुसार</option>
                <option value="status">स्थिति के अनुसार</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-3">
              <span className="text-sm text-gray-600">
                {filteredUsers.length} में से {usersTotal} उपयोगकर्ता
              </span>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
            >
              {/* User Image/Avatar */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden flex items-center justify-center">
                <img
                  src={user.image || "/placeholder.svg?height=100&width=100"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover group-hover:scale-105 transition-transform duration-300 border-4 border-white shadow-md"
                />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(user.status)}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === user.id ? null : user.id
                        )
                      }
                      className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                    {activeDropdown === user.id && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                        <Link
                          href={`/user/user_detail?id=${user.id}`}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Eye className="w-4 h-4" />
                          <span>देखें</span>
                        </Link>
                        <button
                          onClick={() => {
                            router.push(`/edit-user/${user.id}`);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>संपादित करें</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
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

              {/* User Content */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                    {getRoleLabel(user.role)}
                  </span>
                </div>

                <h3
                  className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1"
                  style={{
                    fontFamily: "Noto Sans Devanagari, Arial, sans-serif",
                  }}
                >
                  {user.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-1 text-sm">
                  {user.email}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        पंजीकरण:{" "}
                        {new Date(user.registrationDate).toLocaleDateString(
                          "hi-IN"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      अंतिम लॉगिन:{" "}
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("hi-IN")
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Link
                    href={`/user/user_detail?id=${user.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    प्रोफ़ाइल देखें →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              कोई उपयोगकर्ता नहीं मिला
            </h3>
            <p className="text-gray-600 mb-6">
              आपके फिल्टर के अनुसार कोई उपयोगकर्ता उपलब्ध नहीं है।
            </p>
            <button
              onClick={() => {
                setSelectedRole("all");
                setSearchQuery("");
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              फिल्टर साफ़ करें
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
              उपयोगकर्ता हटाएं
            </h3>
            <p className="text-gray-600 mb-6">
              क्या आप वाकई "{userToDelete?.name}" उपयोगकर्ता को हटाना चाहते हैं?
              यह क्रिया पूर्ववत नहीं की जा सकती।
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
