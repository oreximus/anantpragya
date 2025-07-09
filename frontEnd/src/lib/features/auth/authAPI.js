import api from "../../axios";

export const register = async (userData) => {
  return await api.post("/auth/register", {
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    password: userData.password,
  });
};

export const verifyEmail = async (verificationData) => {
  return await api.post("/auth/verify-email", {
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
    otp: resetData.otp,
    new_password: resetData.newPassword,
  });
};

export const refreshToken = async (refreshToken) => {
  return await api.post("/auth/refresh-token", {
    refresh_token: refreshToken,
  });
};

// New Profile APIs
export const getUserProfile = async () => {
  return await api.get("/auth/profile");
};

export const updateUserProfile = async (profileData) => {
  return await api.put("/auth/profile", {
    first_name: profileData.firstName,
    last_name: profileData.lastName,
    email: profileData.email,
  });
};

export const changePassword = async (passwordData) => {
  return await api.put("/auth/change-password", {
    current_password: passwordData.currentPassword,
    new_password: passwordData.newPassword,
  });
};
