import { 
  categories, 
  posts, 
  comments, 
  settings,
  type Category, 
  type InsertCategory,
  type Post,
  type InsertPost,
  type Comment,
  type InsertComment,
  type Settings,
  type InsertSettings
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  // Posts
  getPosts(status?: string, categoryId?: number, search?: string): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getFeaturedPosts(limit?: number): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;

  // Comments
  getCommentsByPostId(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  approveComment(id: number): Promise<boolean>;
  deleteComment(id: number): Promise<boolean>;

  // Settings
  getSettings(): Promise<Settings>;
  updateSettings(settings: Partial<InsertSettings>): Promise<Settings>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private settings: Settings;
  private categoryIdCounter: number;
  private postIdCounter: number;
  private commentIdCounter: number;

  constructor() {
    this.categories = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.categoryIdCounter = 1;
    this.postIdCounter = 1;
    this.commentIdCounter = 1;

    // Initialize default settings
    this.settings = {
      id: 1,
      siteName: "अनंत प्रज्ञा",
      siteTagline: "आध्यात्मिक ज्ञान और जीवन के सत्य की खोज",
      siteDescription: "प्राचीन भारतीय ज्ञान परंपरा और आधुनिक जीवन के मध्य सेतु का काम करने वाला यह मंच है",
      primaryColor: "#FF6B35",
      fontSize: "medium"
    };

    // Initialize default categories
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    const defaultCategories = [
      { name: "ध्यान", description: "मन की शांति और आत्म-साक्षात्कार", color: "#FF6B35", slug: "dhyan" },
      { name: "दर्शन", description: "भारतीय दर्शन और जीवन के सत्य", color: "#FFD700", slug: "darshan" },
      { name: "योग", description: "शरीर और आत्मा का मिलन", color: "#E07A5F", slug: "yoga" },
      { name: "आयुर्वेद", description: "प्राकृतिक चिकित्सा और स्वास्थ्य", color: "#32CD32", slug: "ayurveda" }
    ];

    defaultCategories.forEach(cat => {
      const id = this.categoryIdCounter++;
      this.categories.set(id, { ...cat, id });
    });

    // Add sample posts
    const samplePosts = [
      {
        title: "ध्यान की शक्ति: मन की शांति का मार्ग",
        slug: "dhyan-ki-shakti",
        content: "प्राचीन भारतीय संस्कृति में ध्यान का स्थान सर्वोपरि रहा है। यह न केवल आध्यात्मिक विकास का साधन है बल्कि मानसिक स्वास्थ्य और शारीरिक कल्याण का भी महत्वपूर्ण उपाय है।",
        excerpt: "प्राचीन भारतीय परंपरा में ध्यान का महत्व और आधुनिक जीवन में इसकी प्रासंगिकता पर विस्तृत चर्चा",
        featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        categoryId: 1,
        author: "आचार्य विवेक",
        status: "published",
        tags: ["ध्यान", "योग", "मन की शांति"],
        metaDescription: "ध्यान की शक्ति और मन की शांति के लिए प्राचीन भारतीय तकनीकों को समझें",
        focusKeyword: "ध्यान",
        readTime: 5,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        title: "वेदांत दर्शन: सत्य की खोज में",
        slug: "vedanta-darshan",
        content: "भारतीय दर्शन की समृद्ध परंपरा में वेदांत का स्थान और जीवन में इसका व्यावहारिक प्रयोग",
        excerpt: "भारतीय दर्शन की समृद्ध परंपरा में वेदांत का स्थान और जीवन में इसका व्यावहारिक प्रयोग",
        featuredImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
        categoryId: 2,
        author: "स्वामी तेजानंद",
        status: "published",
        tags: ["वेदांत", "दर्शन", "आत्मा"],
        metaDescription: "वेदांत दर्शन के मूल सिद्धांत और आधुनिक जीवन में इनका प्रयोग",
        focusKeyword: "वेदांत",
        readTime: 8,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        title: "योग: शरीर और आत्मा का मिलन",
        slug: "yoga-sharir-aatma",
        content: "योग के आठ अंगों की विस्तृत व्याख्या और दैनिक जीवन में इनका समावेश कैसे करें",
        excerpt: "योग के आठ अंगों की विस्तृत व्याख्या और दैनिक जीवन में इनका समावेश कैसे करें",
        featuredImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        categoryId: 3,
        author: "प्रिया शर्मा",
        status: "published",
        tags: ["योग", "अष्टांग", "प्राणायाम"],
        metaDescription: "योग के आठ अंग और उनका दैनिक जीवन में व्यावहारिक प्रयोग",
        focusKeyword: "योग",
        readTime: 6,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];

    samplePosts.forEach(post => {
      const id = this.postIdCounter++;
      this.posts.set(id, { ...post, id });
    });
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { 
      ...category, 
      id,
      color: category.color || "#FF6B35",
      description: category.description || null
    };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const existing = this.categories.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...category };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Posts
  async getPosts(status?: string, categoryId?: number, search?: string): Promise<Post[]> {
    let posts = Array.from(this.posts.values());
    
    if (status) {
      posts = posts.filter(post => post.status === status);
    }
    
    if (categoryId) {
      posts = posts.filter(post => post.categoryId === categoryId);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower)
      );
    }
    
    return posts.sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  async getPostById(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    return Array.from(this.posts.values()).find(post => post.slug === slug);
  }

  async getFeaturedPosts(limit: number = 3): Promise<Post[]> {
    const publishedPosts = Array.from(this.posts.values())
      .filter(post => post.status === "published")
      .sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      });
    
    return publishedPosts.slice(0, limit);
  }

  async createPost(post: InsertPost): Promise<Post> {
    const id = this.postIdCounter++;
    const now = new Date();
    const newPost: Post = { 
      ...post, 
      id, 
      status: post.status || "draft",
      excerpt: post.excerpt || null,
      featuredImage: post.featuredImage || null,
      categoryId: post.categoryId || null,
      tags: post.tags || null,
      metaDescription: post.metaDescription || null,
      focusKeyword: post.focusKeyword || null,
      readTime: post.readTime || 5,
      createdAt: now, 
      updatedAt: now 
    };
    this.posts.set(id, newPost);
    return newPost;
  }

  async updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined> {
    const existing = this.posts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...post, updatedAt: new Date() };
    this.posts.set(id, updated);
    return updated;
  }

  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }

  // Comments
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const id = this.commentIdCounter++;
    const newComment: Comment = { 
      id,
      name: comment.name,
      email: comment.email,
      content: comment.content,
      postId: comment.postId || null,
      approved: false, 
      createdAt: new Date() 
    };
    this.comments.set(id, newComment);
    return newComment;
  }

  async approveComment(id: number): Promise<boolean> {
    const comment = this.comments.get(id);
    if (!comment) return false;
    
    comment.approved = true;
    this.comments.set(id, comment);
    return true;
  }

  async deleteComment(id: number): Promise<boolean> {
    return this.comments.delete(id);
  }

  // Settings
  async getSettings(): Promise<Settings> {
    return this.settings;
  }

  async updateSettings(settings: Partial<InsertSettings>): Promise<Settings> {
    this.settings = { ...this.settings, ...settings };
    return this.settings;
  }
}

export const storage = new MemStorage();
