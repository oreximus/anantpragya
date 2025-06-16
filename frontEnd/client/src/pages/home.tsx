import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import PostCard from "@/components/post-card";
import SearchBar from "@/components/search-bar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Post, Category } from "@shared/schema";

export default function Home() {
  const { data: featuredPosts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/posts/featured"],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: settings } = useQuery({
    queryKey: ["/api/settings"],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-saffron-50 to-gold-50 rounded-3xl shadow-warm-lg mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold font-hindi text-saffron-600 mb-6">
            {settings?.siteName || "अनंत प्रज्ञा"}
          </h1>
          <p className="text-xl text-saffron-700 mb-4 font-hindi">
            {settings?.siteTagline || "आध्यात्मिक ज्ञान और जीवन के सत्य की खोज"}
          </p>
          <p className="text-lg text-terracotta-600 mb-8 font-english">
            Exploring spiritual wisdom and life's deeper truths through ancient Indian philosophy
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <SearchBar />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-saffron-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-hindi">योग</span>
            <span className="bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-hindi">ध्यान</span>
            <span className="bg-terracotta-100 text-terracotta-700 px-4 py-2 rounded-full text-sm font-hindi">दर्शन</span>
            <span className="bg-saffron-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-hindi">आयुर्वेद</span>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-hindi text-saffron-600">
            विशेष लेख <span className="text-lg text-gray-500 font-english ml-2">Featured Posts</span>
          </h2>
          <Link href="/posts" className="text-saffron-600 hover:text-saffron-500 font-medium font-hindi">
            सभी देखें →
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))
          ) : (
            featuredPosts?.map((post: Post) => (
              <PostCard key={post.id} post={post} categories={categories || []} />
            ))
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold font-hindi text-saffron-600 mb-8">
          श्रेणियां <span className="text-lg text-gray-500 font-english ml-2">Categories</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6 text-center">
                <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
                <Skeleton className="h-5 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </Card>
            ))
          ) : (
            categories?.map((category: Category) => (
              <Card key={category.id} className="p-6 text-center shadow-warm hover:shadow-warm-lg transition-shadow cursor-pointer group">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: category.color + "20" }}
                >
                  <span className="text-xl" style={{ color: category.color }}>
                    {category.name === "ध्यान" && "🧘"}
                    {category.name === "दर्शन" && "📖"}
                    {category.name === "योग" && "🕉️"}
                    {category.name === "आयुर्वेद" && "🌿"}
                  </span>
                </div>
                <h3 className="font-semibold font-hindi text-gray-800 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">24 लेख</p>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
