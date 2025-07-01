# Blog API Documentation

## Base URL

```
http://localhost:5001/api
```

## Authentication

Most endpoints require authentication using Bearer tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}, // Response data (if any)
  "errors": [], // Validation errors (if any)
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## Authentication Endpoints

### 1. Register User

- **POST** `/auth/register`
- **Public**: Yes
- **Body**:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```

### 2. Login User

- **POST** `/auth/login`
- **Public**: Yes
- **Body**:

```json
{
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```

### 3. Refresh Token

- **POST** `/auth/refresh-token`
- **Public**: Yes
- **Body**:

```json
{
  "refresh_token": "your_refresh_token"
}
```

### 4. Get Profile

- **GET** `/auth/profile`
- **Auth**: Required

### 5. Update Profile

- **PUT** `/auth/profile`
- **Auth**: Required
- **Body**:

```json
{
  "first_name": "John Updated",
  "last_name": "Doe Updated",
  "email": "john.updated@example.com"
}
```

### 6. Change Password

- **POST** `/auth/change-password`
- **Auth**: Required
- **Body**:

```json
{
  "current_password": "Password123!",
  "new_password": "NewPassword123!"
}
```

### 7. Logout

- **POST** `/auth/logout`
- **Auth**: Required

## Category Management (Master)

### 1. Get All Categories

- **GET** `/master/categories`
- **Public**: Yes
- **Query Parameters**:
  - `page` (optional): Page number
  - `limit` (optional): Items per page
  - `search` (optional): Search term

### 2. Get Category by ID

- **GET** `/master/categories/:id`
- **Public**: Yes

### 3. Create Category

- **POST** `/master/categories`
- **Auth**: Required (Admin only)
- **Body**:

```json
{
  "name": "Programming"
}
```

### 4. Update Category

- **PUT** `/master/categories/:id`
- **Auth**: Required (Admin only)
- **Body**:

```json
{
  "name": "Software Development"
}
```

### 5. Delete Category

- **DELETE** `/master/categories/:id`
- **Auth**: Required (Admin only)

## Blog Posts

### 1. Get All Posts

- **GET** `/blog/posts`
- **Public**: Yes
- **Query Parameters**:
  - `page` (optional): Page number
  - `limit` (optional): Items per page
  - `category_id` (optional): Filter by category
  - `search` (optional): Search in title, content, tags

### 2. Get Post by ID

- **GET** `/blog/posts/:id`
- **Public**: Yes

### 3. Create Post

- **POST** `/blog/posts`
- **Auth**: Required
- **Body**:

```json
{
  "title": "Introduction to React Hooks",
  "content": "React Hooks are a powerful feature...",
  "category_id": "660e8400-e29b-41d4-a716-446655440000",
  "tags": "react,hooks,javascript,frontend"
}
```

### 4. Update Post

- **PUT** `/blog/posts/:id`
- **Auth**: Required (Owner or Admin)
- **Body**:

```json
{
  "title": "Advanced React Hooks Patterns",
  "content": "Updated content...",
  "category_id": "660e8400-e29b-41d4-a716-446655440000",
  "tags": "react,hooks,advanced,patterns"
}
```

### 5. Delete Post

- **DELETE** `/blog/posts/:id`
- **Auth**: Required (Owner or Admin)

### 6. Get My Posts

- **GET** `/blog/my-posts`
- **Auth**: Required
- **Query Parameters**:
  - `page` (optional): Page number
  - `limit` (optional): Items per page
  - `search` (optional): Search term

## Post Activities

### 1. Add Post Activity

- **POST** `/blog/posts/:id/activity`
- **Auth**: Required
- **Body**:

```json
{
  "like_count": 1,
  "comment": "Great article! Very informative.",
  "share_count": 0
}
```

### 2. Get Post Activities

- **GET** `/blog/posts/:id/activities`
- **Public**: Yes
- **Query Parameters**:
  - `page` (optional): Page number
  - `limit` (optional): Items per page

## Admin Only Endpoints

### 1. Get All Posts (Admin)

- **GET** `/blog/all-posts`
- **Auth**: Required (Admin only)
- **Query Parameters**:
  - `page` (optional): Page number
  - `limit` (optional): Items per page
  - `user_id` (optional): Filter by user
  - `category_id` (optional): Filter by category
  - `search` (optional): Search term

### 2. Force Delete Post

- **DELETE** `/blog/posts/:id/force`
- **Auth**: Required (Admin only)

## Health Check

### Health Check

- **GET** `/health`
- **Public**: Yes

## Error Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request / Validation Error
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **409**: Conflict (Resource already exists)
- **500**: Internal Server Error

## Sample UUIDs for Testing

### Users

- Admin User: `550e8400-e29b-41d4-a716-446655440000`
- Regular User: `550e8400-e29b-41d4-a716-446655440001`

### Categories

- Technology: `660e8400-e29b-41d4-a716-446655440000`
- Lifestyle: `660e8400-e29b-41d4-a716-446655440001`
- Travel: `660e8400-e29b-41d4-a716-446655440002`

### Posts

- Post 1: `770e8400-e29b-41d4-a716-446655440000`
- Post 2: `770e8400-e29b-41d4-a716-446655440001`

## Environment Variables Required

```env
NODE_ENV=development
PORT=5001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=anant_pragya_blog
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=info
```
