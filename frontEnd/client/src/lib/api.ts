import { apiRequest } from "./queryClient";
import type { 
  Post, 
  Category, 
  Comment, 
  Settings,
  InsertPost, 
  InsertCategory, 
  InsertComment, 
  InsertSettings 
} from "@shared/schema";

// Posts API
export const postsApi = {
  getAll: async (params?: { status?: string; categoryId?: number; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.categoryId) searchParams.append('categoryId', params.categoryId.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const response = await apiRequest("GET", `/api/posts?${searchParams.toString()}`);
    return response.json();
  },

  getFeatured: async (limit?: number) => {
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append('limit', limit.toString());
    
    const response = await apiRequest("GET", `/api/posts/featured?${searchParams.toString()}`);
    return response.json();
  },

  getById: async (id: number): Promise<Post> => {
    const response = await apiRequest("GET", `/api/posts/${id}`);
    return response.json();
  },

  getBySlug: async (slug: string): Promise<Post> => {
    const response = await apiRequest("GET", `/api/posts/slug/${slug}`);
    return response.json();
  },

  create: async (data: InsertPost): Promise<Post> => {
    const response = await apiRequest("POST", "/api/posts", data);
    return response.json();
  },

  update: async (id: number, data: Partial<InsertPost>): Promise<Post> => {
    const response = await apiRequest("PUT", `/api/posts/${id}`, data);
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest("DELETE", `/api/posts/${id}`);
  },
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiRequest("GET", "/api/categories");
    return response.json();
  },

  getById: async (id: number): Promise<Category> => {
    const response = await apiRequest("GET", `/api/categories/${id}`);
    return response.json();
  },

  create: async (data: InsertCategory): Promise<Category> => {
    const response = await apiRequest("POST", "/api/categories", data);
    return response.json();
  },

  update: async (id: number, data: Partial<InsertCategory>): Promise<Category> => {
    const response = await apiRequest("PUT", `/api/categories/${id}`, data);
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest("DELETE", `/api/categories/${id}`);
  },
};

// Comments API
export const commentsApi = {
  getByPostId: async (postId: number): Promise<Comment[]> => {
    const response = await apiRequest("GET", `/api/posts/${postId}/comments`);
    return response.json();
  },

  create: async (postId: number, data: InsertComment): Promise<Comment> => {
    const response = await apiRequest("POST", `/api/posts/${postId}/comments`, data);
    return response.json();
  },

  approve: async (id: number): Promise<void> => {
    await apiRequest("PUT", `/api/comments/${id}/approve`);
  },

  delete: async (id: number): Promise<void> => {
    await apiRequest("DELETE", `/api/comments/${id}`);
  },
};

// Settings API
export const settingsApi = {
  get: async (): Promise<Settings> => {
    const response = await apiRequest("GET", "/api/settings");
    return response.json();
  },

  update: async (data: Partial<InsertSettings>): Promise<Settings> => {
    const response = await apiRequest("PUT", "/api/settings", data);
    return response.json();
  },
};

// Search API
export const searchApi = {
  posts: async (query: string, filters?: { categoryId?: number; limit?: number }) => {
    const searchParams = new URLSearchParams({
      search: query,
    });
    
    if (filters?.categoryId) {
      searchParams.append('categoryId', filters.categoryId.toString());
    }
    
    const response = await apiRequest("GET", `/api/posts?${searchParams.toString()}`);
    const results = await response.json();
    
    // Limit results if specified
    if (filters?.limit) {
      return results.slice(0, filters.limit);
    }
    
    return results;
  },

  categories: async (query: string) => {
    const response = await apiRequest("GET", "/api/categories");
    const categories = await response.json();
    
    // Filter categories by name match
    return categories.filter((category: Category) =>
      category.name.toLowerCase().includes(query.toLowerCase()) ||
      category.description?.toLowerCase().includes(query.toLowerCase())
    );
  },
};

// Statistics API (for dashboard)
export const statsApi = {
  getOverview: async () => {
    try {
      const [posts, categories] = await Promise.all([
        postsApi.getAll(),
        categoriesApi.getAll(),
      ]);

      const publishedPosts = posts.filter((post: Post) => post.status === 'published');
      const draftPosts = posts.filter((post: Post) => post.status === 'draft');

      return {
        totalPosts: posts.length,
        publishedPosts: publishedPosts.length,
        draftPosts: draftPosts.length,
        totalCategories: categories.length,
        recentPosts: posts
          .sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5),
      };
    } catch (error) {
      console.error("Error fetching stats overview:", error);
      throw error;
    }
  },
};

// File upload utilities (for future image upload functionality)
export const uploadApi = {
  uploadImage: async (file: File): Promise<{ url: string }> => {
    // For now, return a placeholder URL
    // In a real implementation, this would upload to a cloud service
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ url: reader.result as string });
      };
      reader.readAsDataURL(file);
    });
  },

  deleteImage: async (url: string): Promise<void> => {
    // Placeholder for image deletion
    console.log("Deleting image:", url);
  },
};

// Utility functions
export const apiUtils = {
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },

  formatDate: (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  calculateReadTime: (content: string): number => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(readTime, 1); // Minimum 1 minute
  },

  extractExcerpt: (content: string, maxLength: number = 150): string => {
    if (content.length <= maxLength) return content;
    
    const truncated = content.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  },

  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  sanitizeHtml: (html: string): string => {
    // Basic HTML sanitization - in production, use a proper library like DOMPurify
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '');
  },
};

export default {
  posts: postsApi,
  categories: categoriesApi,
  comments: commentsApi,
  settings: settingsApi,
  search: searchApi,
  stats: statsApi,
  upload: uploadApi,
  utils: apiUtils,
};
