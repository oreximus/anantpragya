import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import type { Post, Comment, Category } from "@shared/schema";

export default function BlogPost() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: ""
  });

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: [`/api/posts/slug/${slug}`],
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: [`/api/posts/${post?.id}/comments`],
    enabled: !!post?.id,
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const createCommentMutation = useMutation({
    mutationFn: async (commentData: typeof commentForm) => {
      const response = await apiRequest("POST", `/api/posts/${post.id}/comments`, commentData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${post.id}/comments`] });
      setCommentForm({ name: "", email: "", content: "" });
      toast({
        title: "टिप्पणी भेजी गई",
        description: "आपकी टिप्पणी सफलतापूर्वक भेजी गई है। अनुमोदन के बाद यह दिखाई देगी।",
      });
    },
    onError: () => {
      toast({
        title: "त्रुटि",
        description: "टिप्पणी भेजने में समस्या हुई। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      });
    },
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.content) {
      toast({
        title: "अधूरी जानकारी",
        description: "कृपया सभी फील्ड भरें।",
        variant: "destructive",
      });
      return;
    }
    createCommentMutation.mutate(commentForm);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "लिंक कॉपी किया गया",
        description: "पोस्ट का लिंक क्लिपबोर्ड में कॉपी हो गया है।",
      });
    }
  };

  const getCategory = (categoryId: number) => {
    return categories?.find((cat: Category) => cat.id === categoryId);
  };

  if (postLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-4 w-48 mb-4" />
          <Skeleton className="h-8 w-24 mb-6" />
          <Skeleton className="h-12 w-full mb-6" />
          <div className="flex items-center space-x-4 mb-8">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
        <Skeleton className="h-96 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold font-hindi mb-4">पोस्ट नहीं मिला</h1>
            <p className="text-gray-600 mb-4">क्षमा करें, यह पोस्ट उपलब्ध नहीं है।</p>
            <Button onClick={() => setLocation("/")} variant="outline">
              होम पर वापस जाएं
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const category = getCategory(post.categoryId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Post Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="text-saffron-600 hover:text-saffron-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            मुख्य पृष्ठ
          </Button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 font-hindi">ब्लॉग</span>
          {category && (
            <>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500 font-hindi">{category.name}</span>
            </>
          )}
        </div>
        
        {category && (
          <div className="mb-6">
            <Badge 
              className="font-hindi"
              style={{ backgroundColor: category.color + "20", color: category.color }}
            >
              {category.name}
            </Badge>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold font-hindi text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{post.author[0]}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 font-hindi">{post.author}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('hi-IN')} • {post.readTime} मिनट पढ़ें
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-saffron-600">
              <Heart className="w-4 h-4 mr-2" />
              24
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-saffron-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              {comments?.length || 0}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare} className="text-gray-600 hover:text-saffron-600">
              <Share2 className="w-4 h-4 mr-2" />
              साझा करें
            </Button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-96 object-cover rounded-2xl shadow-warm-lg mb-8"
        />
      )}

      {/* Post Content */}
      <article className="prose-hindi prose-lg max-w-none mb-12">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-hindi">
          {post.content}
        </div>
      </article>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-gray-600 font-hindi">टैग्स:</span>
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="font-hindi">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Comments Section */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold font-hindi text-gray-800 mb-6">
          टिप्पणियां <span className="text-sm text-gray-500">({comments?.length || 0})</span>
        </h3>
        
        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <Textarea
            value={commentForm.content}
            onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
            placeholder="अपनी टिप्पणी यहाँ लिखें..."
            className="mb-4 font-hindi"
            rows={4}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Input
                type="text"
                placeholder="आपका नाम"
                value={commentForm.name}
                onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                className="font-hindi"
              />
              <Input
                type="email"
                placeholder="ईमेल"
                value={commentForm.email}
                onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <Button 
              type="submit" 
              disabled={createCommentMutation.isPending}
              className="bg-saffron-500 hover:bg-saffron-600 font-hindi"
            >
              {createCommentMutation.isPending ? "भेजा जा रहा..." : "टिप्पणी भेजें"}
            </Button>
          </div>
        </form>
        
        {/* Comments List */}
        <div className="space-y-6">
          {commentsLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : comments && comments.length > 0 ? (
            comments
              .filter((comment: Comment) => comment.approved)
              .map((comment: Comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{comment.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900 font-hindi">{comment.name}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString('hi-IN')}
                          </span>
                        </div>
                        <p className="text-gray-700 font-hindi leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <p className="text-gray-500 font-hindi text-center py-8">
              अभी तक कोई टिप्पणी नहीं है। पहली टिप्पणी आप करें!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
