# Spiritual Blogging Platform - अनंत प्रज्ञा

## Overview

This is a full-stack spiritual blogging platform built with React, Express, and TypeScript. The application focuses on sharing spiritual wisdom and ancient Indian knowledge with a modern, bilingual interface supporting both Hindi and English. The platform includes a content management system (CMS) for creating and managing blog posts, categories, and comments.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI components with custom styling
- **Styling**: Tailwind CSS with custom spiritual color theme (saffron, gold, terracotta)
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Data Layer**: Abstract storage interface with in-memory implementation
- **Database**: Designed for PostgreSQL with Drizzle ORM
- **API**: RESTful endpoints for posts, categories, comments, and settings
- **Session Management**: PostgreSQL session store integration ready

### Database Schema
The application uses Drizzle ORM with PostgreSQL dialect and includes:
- **Categories**: Blog categories with color coding and slugs
- **Posts**: Blog posts with rich content, SEO fields, and status management
- **Comments**: User comments with moderation system
- **Settings**: Site-wide configuration options

## Key Components

### Content Management
- Rich text editor with Hindi/English language toggle
- Post creation and editing with SEO optimization fields
- Category management with color-coded organization
- Comment moderation system
- Draft/published status workflow

### User Interface
- Bilingual support (Hindi/English) with appropriate fonts
- Responsive design with spiritual Indian color palette
- Search functionality with real-time results
- Spiritual themed UI elements (lotus patterns, warm shadows)
- Mobile-optimized navigation with sheet components

### API Structure
- **Posts API**: CRUD operations with filtering by status, category, and search
- **Categories API**: Management of blog categories
- **Comments API**: Comment submission and moderation
- **Settings API**: Site configuration management

## Data Flow

1. **Content Creation**: Authors use the CMS interface to create posts with rich text editor
2. **Content Storage**: Posts are stored with metadata including SEO fields and categorization
3. **Content Display**: Public-facing pages render posts with proper formatting and navigation
4. **User Interaction**: Visitors can search, browse by category, and submit comments
5. **Moderation**: Comments require approval before being displayed publicly

## External Dependencies

### Core Dependencies
- **Drizzle ORM**: Database operations and migrations
- **Neon Database**: Serverless PostgreSQL (via @neondatabase/serverless)
- **TanStack Query**: Server state management and caching
- **Radix UI**: Accessible component library
- **React Hook Form**: Form handling with validation

### Development Tools
- **TypeScript**: Type safety across the application
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Production bundling for server code

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: PostgreSQL with migrations via Drizzle Kit
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Static assets built with Vite and served from `/dist/public`
- **Backend**: Node.js server bundled with ESBuild
- **Database**: PostgreSQL with connection pooling
- **Deployment**: Configured for autoscale deployment on Replit

### Build Commands
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Production server
- `npm run db:push`: Database schema migration

## Changelog

- June 16, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.