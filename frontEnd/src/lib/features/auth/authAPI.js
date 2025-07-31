import api from "../../axios";

export const register = async (userData) => {
  return await api.post("/auth/register", {
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    phone_no: userData.phone,
    password: userData.password,
    confirm_password: userData.confirmPassword,
  });
};

export const verifyEmail = async (verificationData) => {
  return await api.post("/auth/verify-email-otp", {
    email: verificationData.email,
    otp: verificationData.otp,
  });
};

export const resendVerification = async (email) => {
  return await api.post("/auth/resend-verification", {
    email: email,
  });
};

export const login = async (credentials) => {
  return await api.post("/auth/login", {
    email: credentials.email,
    password: credentials.password,
  });
};

export const forgotPassword = async (email) => {
  return await api.post("/auth/forgot-password", {
    email: email,
  });
};

export const resetPassword = async (resetData) => {
  return await api.post("/auth/reset-password", {
    email: resetData.email,
    otp: resetData.resetToken,
    new_password: resetData.newPassword,
    confirm_password: resetData.confirmPassword,
  });
};

// Profile APIs
export const getUserProfile = async () => {
  return await api.get("/auth/profile");
};

export const updateUserProfile = async (profileData) => {
  return await api.post("/auth/update-profile", {
    first_name: profileData.firstName,
    last_name: profileData.lastName,
    email: profileData.email,
    phone_no: profileData.phone,
  });
};

export const changePassword = async (passwordData) => {
  return await api.post("/auth/change-password", {
    current_password: passwordData.currentPassword,
    new_password: passwordData.newPassword,
    confirm_password: passwordData.confirmPassword,
  });
};

export const getAllUsers = async (params) => {
  return await api.get("/user/list", { params });
};

export const getCategories = async () => {
  return await api.get("/post/categories");
};

// Category Management APIs
export const createCategory = async (categoryData) => {
  return await api.post("/post/create-category", {
    name: categoryData.name,
  });
};

export const updateCategory = async (categoryData) => {
  return await api.put("/post/update-category", {
    id: categoryData.id,
    name: categoryData.name,
  });
};

export const deleteCategory = (categoryId) => {
  console.log(categoryId, "<===this is categoryId");
  return api.delete("/post/delete-category", {
    data: { id: categoryId },
  });
};

export const createPost = async (postData) => {
  return await api.post("/post/create", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePost = async (postData) => {
  return await api.put("/post/update", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPosts = async (params) => {
  return await api.get("/post/list", { params });
};

export const deletePost = async (postId) => {
  return await api.delete("/post/delete", {
    data: { id: postId },
  });
};

export const getPostById = async (postId) => {
  console.log(postId, "=======post========");
  return await api.get(`/post/${postId}`);
};

export const getComments = async (postId) => {
  console.log(postId, "=======comment========");
  return await api.get(`/post/comments/${postId}`);
};

export const postComment = async (commentData) => {
  // postId is not defined here, it should be commentData.post_id if you want to log it
  console.log(commentData.post_id, "=======comment post========");
  return await api.post("/post/comment", {
    post_id: commentData.post_id,
    comment: commentData.comment,
  });
};

export const postLike = async (postId) => {
  console.log(postId, "=======like========");
  return await api.post("/post/like", { post_id: postId });
};

export const getLikes = async (postId) => {
  console.log(postId, "=======get likes========");
  return await api.get(`/post/likes/${postId}`);
};
