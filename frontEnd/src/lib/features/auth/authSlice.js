import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "./authAPI";

// Helper function to transform user data from API response (is_admin: 0/1 to role: "user"/"admin")
const transformUserData = (userData) => {
  if (!userData) return null;
  return {
    ...userData,
    role: userData.is_admin === 1 ? "admin" : "user",
  };
};

// Helper function to transform a list of users from API response
const transformUserList = (userList) => {
  if (!Array.isArray(userList)) return [];
  return userList.map((user) => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.is_admin === 1 ? "admin" : "member", // Map is_admin to role
    status: user.is_active === 1 ? "active" : "inactive", // Map is_active to status
    registrationDate: user.created_at,
    lastLogin: user.updated_at, // Using updated_at as a proxy for lastLogin
    image: "/placeholder.svg?height=50&width=50", // Placeholder image
    phone: user.phone_no,
  }));
};

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      const transformedData = transformUserData(response.data.data); // Transform data here
      return { ...response.data, data: transformedData }; // Return transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

// Verify Email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyEmail(verificationData);
      const transformedData = transformUserData(response.data.data); // Transform data here

      // Store access token and transformed user data in localStorage
      if (transformedData.access_token) {
        localStorage.setItem("access_token", transformedData.access_token);
        localStorage.setItem("user_data", JSON.stringify(transformedData));
      }

      return { ...response.data, data: transformedData }; // Return transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Email verification failed" }
      );
    }
  }
);

// Resend Verification
export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.resendVerification(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Resend verification failed" }
      );
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      const transformedData = transformUserData(response.data.data); // Transform data here

      // Store access token and transformed user data in localStorage
      if (transformedData.access_token) {
        localStorage.setItem("access_token", transformedData.access_token);
        localStorage.setItem("user_data", JSON.stringify(transformedData));
      }

      return { ...response.data, data: transformedData }; // Return transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Forgot password failed" }
      );
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await authAPI.resetPassword(resetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Password reset failed" }
      );
    }
  }
);

// Get User Profile
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getUserProfile();
      const transformedData = transformUserData(response.data.data); // Transform data here

      // Update stored user data in localStorage
      localStorage.setItem("user_data", JSON.stringify(transformedData));

      return { ...response.data, data: transformedData }; // Return transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateUserProfile(profileData);
      const transformedData = transformUserData(response.data.data); // Transform data here

      // Update stored user data
      localStorage.setItem("user_data", JSON.stringify(transformedData));

      return { ...response.data, data: transformedData }; // Return transformed data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Profile update failed" }
      );
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authAPI.changePassword(passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Password change failed" }
      );
    }
  }
);

// Fetch All Users
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await authAPI.getAllUsers(params);
      const transformedData = transformUserList(response.data.data);
      return { ...response.data, data: transformedData };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch users" }
      );
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  message: null,
  emailVerificationSent: false,
  passwordResetSent: false,
  profileLoading: false,
  passwordChangeLoading: false,
  usersList: [], // New state for list of users
  usersListLoading: false, // Loading state for user list
  usersListError: null, // Error state for user list
  usersTotal: 0, // Total count of users
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.usersListError = null; // Clear user list error too
    },
    clearMessage: (state) => {
      state.message = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
      state.usersList = []; // Clear user list on logout
      state.usersTotal = 0;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_data");
    },
    setUser: (state, action) => {
      // Ensure user data loaded from localStorage is also transformed
      state.user = transformUserData(action.payload);
      state.isAuthenticated = true;
    },
    // New reducer for simulating user deletion
    deleteUserSuccess: (state, action) => {
      state.usersList = state.usersList.filter(
        (user) => user.id !== action.payload
      );
      state.usersTotal = state.usersTotal - 1;
      state.message = "User deleted successfully (simulated)";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data; // Data is already transformed by the thunk
        state.message = action.payload.message;
        state.emailVerificationSent = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data; // Data is already transformed by the thunk
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.emailVerificationSent = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Email verification failed";
      })

      // Resend Verification
      .addCase(resendVerification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Resend verification failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data; // Data is already transformed by the thunk
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.passwordResetSent = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Forgot password failed";
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.passwordResetSent = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Password reset failed";
      })

      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload.data; // Data is already transformed by the thunk
        state.message = action.payload.message;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload?.message || "Failed to fetch profile";
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload.data; // Data is already transformed by the thunk
        state.message = action.payload.message;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload?.message || "Profile update failed";
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.passwordChangeLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.passwordChangeLoading = false;
        state.message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordChangeLoading = false;
        state.error = action.payload?.message || "Password change failed";
      })

      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersListLoading = true;
        state.usersListError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersListLoading = false;
        state.usersList = action.payload.data;
        state.usersTotal = action.payload.total; // Assuming 'total' field exists in API response
        state.message = action.payload.message;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersListLoading = false;
        state.usersListError =
          action.payload?.message || "Failed to fetch users";
      });
  },
});

export const { clearError, clearMessage, logout, setUser, deleteUserSuccess } =
  authSlice.actions;
export default authSlice.reducer;
