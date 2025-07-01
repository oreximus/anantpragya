# Postman Collection Setup Guide

## 📋 **Collection Overview**

This updated Postman collection includes **complete email verification functionality** with 25+ endpoints organized into logical groups:

### **Collection Structure:**

1. **Authentication & Email Verification** (7 endpoints)
2. **User Profile Management** (4 endpoints)
3. **Categories (Master)** (5 endpoints)
4. **Blog Posts** (6 endpoints)
5. **Post Activities** (2 endpoints)
6. **Admin Only** (2 endpoints)
7. **System** (1 endpoint)

## 🚀 **Quick Setup**

### **1. Import Collection**

- Download `postman-collection-updated.json`
- Import into Postman
- Collection variables are pre-configured

### **2. Configure Environment Variables**

Set these collection variables:

- `baseUrl`: `http://localhost:5001/api`
- `testEmail`: Your test email address
- `accessToken`: Auto-populated after login
- `refreshToken`: Auto-populated after login

### **3. Email Configuration**

Ensure your `.env` file has email settings:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Blog Platform
```

## 📧 **Email Verification Workflow**

### **Complete Registration Flow:**

1. **Register User** → Account created (unverified)
2. **Check Email** → Receive 6-digit OTP
3. **Verify Email** → Account activated
4. **Login** → Get access tokens
5. **Access Protected Routes** → Full functionality

### **Password Reset Flow:**

1. **Forgot Password** → Request reset
2. **Check Email** → Receive reset OTP
3. **Reset Password** → Set new password
4. **Login** → Use new credentials

## 🔧 **New Features in Updated Collection**

### **Enhanced Authentication:**

- ✅ Email verification with OTP
- ✅ Resend verification email
- ✅ Password reset with OTP
- ✅ Email change re-verification
- ✅ Automatic token management

### **Smart Test Scripts:**

- ✅ Auto-save tokens after login
- ✅ Clear tokens on logout
- ✅ Validation messages in console
- ✅ Email verification status checks

### **Improved Error Handling:**

- ✅ Detailed error messages
- ✅ Status code validation
- ✅ User-friendly console logs

## 📝 **Testing Scenarios**

### **Scenario 1: New User Registration**

```
1. POST /auth/register (with your email)
2. Check your email for OTP
3. POST /auth/verify-email (with OTP)
4. POST /auth/login
5. Access protected endpoints
```

### **Scenario 2: Password Reset**

```
1. POST /auth/forgot-password
2. Check email for reset OTP
3. POST /auth/reset-password
4. POST /auth/login (with new password)
```

### **Scenario 3: Email Change**

```
1. PUT /auth/profile (change email)
2. Check new email for verification
3. POST /auth/verify-email (verify new email)
```

## 🎯 **Sample Test Data**

### **User Registration:**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "your-test-email@gmail.com",
  "password": "Password123!"
}
```

### **Blog Post Creation:**

```json
{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a powerful runtime...",
  "category_id": "660e8400-e29b-41d4-a716-446655440000",
  "tags": "nodejs,javascript,backend"
}
```

## 🔍 **Console Output Examples**

### **Successful Registration:**

```
✅ User registered successfully. Check email for OTP.
```

### **Email Verification:**

```
✅ Email verified successfully. You can now login.
```

### **Login Attempt (Unverified):**

```
❌ Email not verified. Please verify your email first.
```

## 🛠️ **Troubleshooting**

### **Common Issues:**

1. **Email not received:**

   - Check spam folder
   - Verify SMTP configuration
   - Use "Resend Verification Email"

2. **OTP expired:**

   - OTPs expire in 10 minutes
   - Request new OTP via resend endpoint

3. **Login fails after registration:**

   - Ensure email is verified first
   - Check verification status in response

4. **Token issues:**
   - Tokens auto-refresh in collection
   - Manual refresh via refresh-token endpoint

## 📊 **Collection Statistics**

- **Total Endpoints:** 27
- **Public Endpoints:** 12
- **Protected Endpoints:** 13
- **Admin Only:** 2
- **Email Features:** 6
- **Auto-Tests:** 15+

## 🎉 **Ready to Use!**

The collection is production-ready with:

- ✅ Complete email verification system
- ✅ Comprehensive error handling
- ✅ Automatic token management
- ✅ Real-world test scenarios
- ✅ Detailed documentation

Import and start testing your email-verified blog API! 🚀
