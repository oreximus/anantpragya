# Blog Backend API

A comprehensive Node.js/Express.js blog backend API with JWT authentication, role-based access control, and MySQL database integration using Sequelize ORM.

## Features

- **Authentication & Authorization**

  - JWT-based authentication
  - Role-based access control (Admin/User)
  - Password hashing with bcrypt
  - Token refresh mechanism

- **Blog Management**

  - Create, read, update, delete posts
  - Category management
  - Post activities (likes, comments, shares)
  - File attachments support
  - Search and pagination

- **Security**

  - Helmet for security headers
  - CORS configuration
  - Rate limiting
  - Input validation with Joi
  - SQL injection protection

- **Logging & Monitoring**
  - Winston logging system
  - Request logging with Morgan
  - Error handling middleware

## Project Structure

```
src/
├── config/
│   ├── database.js          # Database configuration
│   └── jwt.js              # JWT configuration
├── controllers/
│   ├── auth.controller.js   # Authentication controllers
│   ├── blog.controller.js   # Blog controllers
│   └── master.controller.js # Master data controllers
├── middleware/
│   ├── auth.js             # Authentication middleware
│   ├── validation.js       # Validation middleware
│   └── errorHandler.js     # Error handling middleware
├── models/
│   ├── index.js            # Model associations
│   ├── auth.model.js       # User model
│   ├── blog.model.js       # Blog-related models
│   └── master.model.js     # Category model
├── routes/
│   ├── index.js            # Main router
│   ├── auth.route.js       # Authentication routes
│   ├── blog.route.js       # Blog routes
│   └── master.route.js     # Master data routes
├── services/
│   ├── auth.service.js     # Authentication services
│   ├── blog.service.js     # Blog services
│   └── master.service.js   # Master data services
├── utils/
│   ├── logger.js           # Winston logger configuration
│   ├── response.js         # API response helper
│   └── helpers.js          # Utility functions
└── validation_schema/
    ├── auth.schema.js      # Authentication validation schemas
    ├── blog.schema.js      # Blog validation schemas
    └── master.schema.js    # Master data validation schemas
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install express cors helmet express-rate-limit compression morgan bcryptjs jsonwebtoken joi winston sequelize mysql2 uuid cross-env
```

3. Set up environment variables:

   - Copy `.env.development` or `.env.production` and configure your database and JWT settings
   - Create a `logs` directory in the project root

4. Set up the database:

   - Create a MySQL database
   - Import the provided SQL schema from `database/schema.sql`

5. Start the server:

```bash
# Development
cross-env NODE_ENV=development node server.js

# Production
cross-env NODE_ENV=production node server.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `POST /api/auth/change-password` - Change password (Protected)
- `POST /api/auth/logout` - User logout (Protected)

### Blog Management

- `GET /api/blog/posts` - Get all posts (Public)
- `GET /api/blog/posts/:id` - Get post by ID (Public)
- `POST /api/blog/posts` - Create new post (Protected)
- `PUT /api/blog/posts/:id` - Update post (Protected)
- `DELETE /api/blog/posts/:id` - Delete post (Protected)
- `GET /api/blog/my-posts` - Get user's posts (Protected)
- `POST /api/blog/posts/:id/activity` - Add post activity (Protected)
- `GET /api/blog/posts/:id/activities` - Get post activities (Protected)
- `DELETE /api/blog/posts/:id/force` - Force delete post (Admin only)
- `GET /api/blog/all-posts` - Get all posts for admin (Admin only)

### Master Data

- `GET /api/master/categories` - Get all categories (Public)
- `GET /api/master/categories/:id` - Get category by ID (Public)
- `POST /api/master/categories` - Create category (Admin only)
- `PUT /api/master/categories/:id` - Update category (Admin only)
- `DELETE /api/master/categories/:id` - Delete category (Admin only)

## Database Schema

The application uses the following main tables:

- `users` - User accounts with role-based access
- `category` - Blog post categories
- `post` - Blog posts
- `post_activity` - User interactions with posts
- `post_data` - File attachments for posts

## Environment Variables

### Development (.env.development)

- `NODE_ENV=development`
- `PORT=5000`
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN`
- `ALLOWED_ORIGINS`
- `LOG_LEVEL=debug`

### Production (.env.production)

- `NODE_ENV=production`
- Similar to development but with production values

## Role-Based Access Control

- **Admin (role: 0)**: Full access to all endpoints
- **Normal User (role: 1)**: Limited access, can only manage own posts

## Error Handling

The API includes comprehensive error handling with:

- Validation errors
- Authentication errors
- Authorization errors
- Database errors
- Generic server errors

All errors are logged using Winston and returned in a consistent JSON format.

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT token-based authentication
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation and sanitization
- SQL injection protection via Sequelize ORM
- Security headers via Helmet

## Logging

Winston logging system with:

- File-based logging (error.log, combined.log)
- Console logging in development
- Log rotation (5MB max file size, 5 files max)
- Different log levels for different environments
