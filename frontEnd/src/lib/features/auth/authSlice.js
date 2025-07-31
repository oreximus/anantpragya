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

// New helper function to transform categories data
const transformCategories = (categoriesData) => {
  if (!Array.isArray(categoriesData)) return [];
  return categoriesData.map((cat) => ({
    id: cat.id,
    name: cat.name,
    isActive: cat.is_active === 1,
  }));
};

// New helper function to transform posts data
const transformPosts = (postsData) => {
  if (!Array.isArray(postsData)) return [];
  return postsData.map((post) => ({
    id: post.id,
    title: post.title,
    summary: post.summary,
    content: post.post_data, // Map post_data to content
    category: post.postCategory?.name, // Use category name
    categoryId: post.category_id, // Store category ID
    tags: post.tags,
    author: `${post.author?.first_name || ""} ${
      post.author?.last_name || ""
    }`.trim(),
    date: post.created_at,
    readTime: "5 मिनट", // Placeholder, as API doesn't provide this directly
    status: post.status,
    views: 0, // Placeholder, as API doesn't provide this directly
    likes:
      post.activities?.filter((activity) => activity.is_liked === 1).length ||
      0, // Count likes
    image:
      post.files?.[0]?.file_path || "/placeholder.svg?height=200&width=300", // Use first file as image
  }));
};

// New helper function to transform a single post data
const transformSinglePost = (postData) => {
  if (!postData) return null;
  return {
    id: postData.id,
    title: postData.title,
    summary: postData.post_data
      ? postData.post_data.substring(0, 150) + "..."
      : "", // Generate summary from content
    content: postData.post_data,
    category: postData.postCategory?.name,
    categoryId: postData.category_id,
    tags: postData.tags || [], // Assuming tags are directly available as an array
    author: `${postData.author?.first_name || ""} ${
      postData.author?.last_name || ""
    }`.trim(),
    date: postData.created_at,
    readTime: "5 मिनट", // Placeholder
    status: postData.status, // Use actual status from API
    views: 0, // Placeholder
    likes:
      postData.activities?.filter((activity) => activity.is_liked === 1)
        .length || 0,
    image:
      postData.files?.[0]?.file_path || "/placeholder.svg?height=200&width=300",
  };
};

// Helper function to transform comments data
const transformComments = (commentsData) => {
  if (!Array.isArray(commentsData)) return [];
  return commentsData.map((comment) => ({
    id: comment.id,
    postId: comment.post_id,
    comment: comment.comment,
    author: `${comment.author?.first_name || ""} ${
      comment.author?.last_name || ""
    }`.trim(),
    createdAt: comment.created_at,
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

// Fetch Categories
export const fetchCategories = createAsyncThunk(
  "auth/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCategories();
      const transformedData = transformCategories(response.data.data);
      return { ...response.data, data: transformedData };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch categories" }
      );
    }
  }
);

// Create Post
export const createPost = createAsyncThunk(
  "auth/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await authAPI.createPost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Post creation failed" }
      );
    }
  }
);

// Fetch Posts
export const fetchPosts = createAsyncThunk(
  "auth/fetchPosts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await authAPI.getPosts(params);
      const transformedData = transformPosts(response.data.data.rows);
      return {
        ...response.data,
        data: transformedData,
        total: response.data.data.count,
      };
    } catch (error) {
      return rejectWithValue();
      // error.response?.data || { message: "Failed to fetch posts" }
    }
  }
);

// Fetch Post by ID
export const fetchPostById = createAsyncThunk(
  "auth/fetchPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await authAPI.getPostById(postId);
      const transformedData = transformSinglePost(response.data.data);
      return { ...response.data, data: transformedData };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch post" }
      );
    }
  }
);

// Delete Post
export const deletePost = createAsyncThunk(
  "auth/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await authAPI.deletePost(postId);
      return { postId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Post deletion failed" }
      );
    }
  }
);

// Update Post
export const updatePost = createAsyncThunk(
  "auth/updatePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updatePost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Post update failed" }
      );
    }
  }
);

// Post Comment
export const postComment = createAsyncThunk(
  "auth/postComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await authAPI.postComment(commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Comment submission failed" }
      );
    }
  }
);

// Fetch Comments
export const fetchComments = createAsyncThunk(
  "auth/fetchComments",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await authAPI.getComments(postId);
      const transformedData = transformComments(response.data.data.rows);
      return {
        ...response.data,
        data: transformedData,
        total: response.data.data.count,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch comments" }
      );
    }
  }
);

// Post Like/Unlike
export const postLike = createAsyncThunk(
  "auth/postLike",
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAPI.postLike(postId);
      // After a successful like/unlike, re-fetch the likes count to ensure it's accurate
      dispatch(getLikes(postId));
      return { postId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Like/Unlike failed" }
      );
    }
  }
);

// Get Likes for a Post
export const getLikes = createAsyncThunk(
  "auth/getLikes",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await authAPI.getLikes(postId);
      // The API response for getLikes directly provides 'like_count'
      return { postId, likeCount: response.data.data.like_count };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch likes" }
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
  usersList: [],
  usersListLoading: false,
  usersListError: null,
  usersTotal: 0,
  categoriesList: [],
  categoriesLoading: false,
  categoriesError: null,
  postCreationLoading: false,
  postsList: [],
  postsTotal: 0,
  postsLoading: false,
  postsError: null,
  currentPost: null, // New state for the single blog post
  currentPostLoading: false, // New loading state for the single blog post
  currentPostError: null, // New error state for the single blog post
  commentLoading: false,
  commentError: null,
  commentSuccess: null,
  commentsList: [], // New state for comments
  commentsTotal: 0, // New state for comments count
  commentsLoading: false, // New loading state for comments
  commentsError: null, // New error state for comments
  likeLoading: false, // New loading state for like/unlike
  likeError: null, // New error state for like/unlike
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.usersListError = null; // Clear user list error too
      state.categoriesError = null; // Clear categories error too
      state.postsError = null; // Clear posts error too
      state.currentPostError = null; // Clear current post error
      state.commentError = null; // Clear comment error
      state.commentsError = null; // Clear comments list error
      state.likeError = null; // Clear like error
    },
    clearMessage: (state) => {
      state.message = null;
      state.commentSuccess = null; // Clear comment success message
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
      state.usersList = []; // Clear user list on logout
      state.usersTotal = 0;
      state.categoriesList = []; // Clear categories on logout
      state.postsList = []; // Clear posts on logout
      state.postsTotal = 0;
      state.commentsList = []; // Clear comments on logout
      state.commentsTotal = 0;
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
    // New reducer to clear comments list
    clearComments: (state) => {
      state.commentsList = [];
      state.commentsTotal = 0;
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
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesList = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError =
          action.payload?.message || "Failed to fetch categories";
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.postCreationLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postCreationLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postCreationLoading = false;
        state.error = action.payload?.message || "Post creation failed";
      })

      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.postsLoading = true;
        state.postsError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.postsList = action.payload.data;
        state.postsTotal = action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.postsLoading = false;
        // state.postsError = action.payload?.message || "Failed to fetch posts";
        state.postsList = [];
        state.postsTotal = 0;
      })
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsList = state.postsList.filter(
          (post) => post.id !== action.payload.postId
        );
        state.postsTotal = state.postsTotal - 1;
        state.message = action.payload.message;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Post deletion failed";
      })
      // Fetch Post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.currentPostLoading = true;
        state.currentPostError = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPostLoading = false;
        state.currentPost = action.payload.data;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.currentPostLoading = false;
        state.currentPostError =
          action.payload?.message || "Failed to fetch post";
      })
      .addCase(postComment.pending, (state) => {
        state.commentLoading = true;
        state.commentError = null;
        state.commentSuccess = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentSuccess = action.payload.message;
        // If the API returns the new comment, you can add it to commentsList here
        // For now, we'll just trigger a refetch of comments after success
      })
      .addCase(postComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentError =
          action.payload?.message || "Comment submission failed";
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsLoading = true;
        state.commentsError = null;
        state.commentsList = []; // Clear comments list on pending
        state.commentsTotal = 0; // Reset total as well
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsLoading = false;
        state.commentsList = action.payload.data;
        state.commentsTotal = action.payload.total;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.commentsError =
          action.payload?.message || "Failed to fetch comments";
      })
      .addCase(postLike.pending, (state) => {
        state.likeLoading = true;
        state.likeError = null;
      })
      .addCase(postLike.fulfilled, (state, action) => {
        state.likeLoading = false;
        // The like count is now updated via the getLikes thunk dispatch in postLike
        // No direct state manipulation for likes count here anymore
      })
      .addCase(postLike.rejected, (state, action) => {
        state.likeLoading = false;
        state.likeError = action.payload?.message || "Like/Unlike failed";
      })
      // New case for getLikes
      .addCase(getLikes.pending, (state) => {
        state.likeLoading = true; // Use likeLoading for fetching likes as well
        state.likeError = null;
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.likeLoading = false;
        if (
          state.currentPost &&
          state.currentPost.id === action.payload.postId
        ) {
          state.currentPost.likes = action.payload.likeCount;
        }
      })
      .addCase(getLikes.rejected, (state, action) => {
        state.likeLoading = false;
        state.likeError = action.payload?.message || "Failed to fetch likes";
      })
      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.postCreationLoading = true; // Reusing this for update loading
        state.error = null;
        state.message = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postCreationLoading = false;
        state.message = action.payload.message;
        // Optionally update the currentPost in state if needed, or refetch
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.postCreationLoading = false;
        state.error = action.payload?.message || "Post update failed";
      });
  },
});

export const {
  clearError,
  clearMessage,
  logout,
  setUser,
  deleteUserSuccess,
  clearComments,
} = authSlice.actions;
export default authSlice.reducer;
