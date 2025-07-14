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
    reset_token: resetData.resetToken,
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

export const createPost = async (postData) => {
  return await api.post("/post/create", postData, {
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
