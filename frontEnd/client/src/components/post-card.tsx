import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, User } from "lucide-react";
import type { Post, Category } from "@shared/schema";

interface PostCardProps {
  post: Post;
  categories: Category[];
}

export default function PostCard({ post, categories }: PostCardProps) {
  const category = categories.find(cat => cat.id === post.categoryId);
  
  return (
    <Card className="overflow-hidden shadow-warm hover:shadow-warm-lg transition-shadow group">
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          {category && (
            <Badge 
              className="font-hindi"
              style={{ backgroundColor: category.color + "20", color: category.color }}
            >
              {category.name}
            </Badge>
          )}
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="w-3 h-3 mr-1" />
            <span>{post.readTime} मिनट पढ़ें</span>
          </div>
        </div>
        
        <Link href={`/post/${post.slug}`}>
          <h3 className="text-xl font-semibold font-hindi text-gray-800 mb-3 hover:text-saffron-600 transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 font-hindi leading-relaxed mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 150) + "..."}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-saffron-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 font-hindi">{post.author}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('hi-IN')}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="text-saffron-600 hover:text-saffron-500">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
