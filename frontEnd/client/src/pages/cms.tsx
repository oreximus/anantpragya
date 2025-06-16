import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import RichTextEditor from "@/components/rich-text-editor";
import { 
  Edit, 
  Eye, 
  Trash2, 
  Plus, 
  Settings, 
  Tags, 
  FileText,
  X
} from "lucide-react";
import type { Post, Category, InsertPost, InsertCategory } from "@shared/schema";

export default function CMS() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [postForm, setPostForm] = useState<Partial<InsertPost>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    categoryId: undefined,
    author: "",
    status: "draft",
    tags: [],
    metaDescription: "",
    focusKeyword: "",
    readTime: 5,
  });

  const [categoryForm, setCategoryForm] = useState<Partial<InsertCategory>>({
    name: "",
    description: "",
    color: "#FF6B35",
    slug: "",
  });

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["/api/posts"],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: settings } = useQuery({
    queryKey: ["/api/settings"],
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: InsertPost) => {
      const response = await apiRequest("POST", "/api/posts", postData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setPostForm({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        featuredImage: "",
        categoryId: undefined,
        author: "",
        status: "draft",
        tags: [],
        metaDescription: "",
        focusKeyword: "",
        readTime: 5,
      });
      toast({
        title: "पोस्ट बनाई गई",
        description: "नई पोस्ट सफलतापूर्वक बनाई गई है।",
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertPost> }) => {
      const response = await apiRequest("PUT", `/api/posts/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setEditingPost(null);
      toast({
        title: "पोस्ट अपडेट की गई",
        description: "पोस्ट सफलतापूर्वक अपडेट की गई है।",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "पोस्ट हटाई गई",
        description: "पोस्ट सफलतापूर्वक हटाई गई है।",
      });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (categoryData: InsertCategory) => {
      const response = await apiRequest("POST", "/api/categories", categoryData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      setCategoryForm({
        name: "",
        description: "",
        color: "#FF6B35",
        slug: "",
      });
      toast({
        title: "श्रेणी बनाई गई",
        description: "नई श्रेणी सफलतापूर्वक बनाई गई है।",
      });
    },
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title || !postForm.content || !postForm.author) {
      toast({
        title: "अधूरी जानकारी",
        description: "कृपया सभी आवश्यक फील्ड भरें।",
        variant: "destructive",
      });
      return;
    }

    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, data: postForm });
    } else {
      createPostMutation.mutate(postForm as InsertPost);
    }
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name || !categoryForm.slug) {
      toast({
        title: "अधूरी जानकारी",
        description: "कृपया सभी आवश्यक फील्ड भरें।",
        variant: "destructive",
      });
      return;
    }

    createCategoryMutation.mutate(categoryForm as InsertCategory);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setPostForm(post);
  };

  const handleDeletePost = (id: number) => {
    if (confirm("क्या आप वाकई इस पोस्ट को हटाना चाहते हैं?")) {
      deletePostMutation.mutate(id);
    }
  };

  const getCategory = (categoryId: number) => {
    return categories?.find((cat: Category) => cat.id === categoryId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="shadow-warm-lg overflow-hidden">
        {/* CMS Header */}
        <CardHeader className="bg-gradient-to-r from-saffron-500 to-gold-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold font-hindi">
                सामग्री प्रबंधन
              </CardTitle>
              <p className="text-saffron-100 font-english">Content Management System</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-4 border-b rounded-none">
              <TabsTrigger value="posts" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span className="font-hindi">लेख प्रबंधन</span>
              </TabsTrigger>
              <TabsTrigger value="new-post" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span className="font-hindi">नया लेख</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center space-x-2">
                <Tags className="w-4 h-4" />
                <span className="font-hindi">श्रेणियां</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span className="font-hindi">सेटिंग्स</span>
              </TabsTrigger>
            </TabsList>

            {/* Posts Management */}
            <TabsContent value="posts" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold font-hindi text-gray-800">सभी लेख</h2>
                <div className="flex items-center space-x-4">
                  <Input placeholder="लेख खोजें..." className="font-hindi" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="सभी स्थितियां" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">सभी स्थितियां</SelectItem>
                      <SelectItem value="published">प्रकाशित</SelectItem>
                      <SelectItem value="draft">मसौदा</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-saffron-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-saffron-700 font-hindi">शीर्षक</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-saffron-700 font-hindi">लेखक</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-saffron-700 font-hindi">श्रेणी</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-saffron-700 font-hindi">स्थिति</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-saffron-700 font-hindi">तिथि</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-saffron-700 font-hindi">कार्रवाई</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {posts?.map((post: Post) => {
                        const category = getCategory(post.categoryId);
                        return (
                          <tr key={post.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900 font-hindi">{post.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {post.excerpt || post.content.substring(0, 100) + "..."}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-hindi">{post.author}</td>
                            <td className="px-6 py-4">
                              {category && (
                                <Badge 
                                  className="font-hindi"
                                  style={{ backgroundColor: category.color + "20", color: category.color }}
                                >
                                  {category.name}
                                </Badge>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <Badge 
                                variant={post.status === "published" ? "default" : "secondary"}
                                className="font-hindi"
                              >
                                {post.status === "published" ? "प्रकाशित" : "मसौदा"}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString('hi-IN')}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditPost(post)}
                                  className="text-saffron-600 hover:text-saffron-500"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-500"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-red-600 hover:text-red-500"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* New Post */}
            <TabsContent value="new-post" className="p-6">
              {editingPost && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium font-hindi text-blue-800">पोस्ट संपादित कर रहे हैं</p>
                    <p className="text-sm text-blue-600">{editingPost.title}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingPost(null);
                      setPostForm({
                        title: "",
                        slug: "",
                        content: "",
                        excerpt: "",
                        featuredImage: "",
                        categoryId: undefined,
                        author: "",
                        status: "draft",
                        tags: [],
                        metaDescription: "",
                        focusKeyword: "",
                        readTime: 5,
                      });
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <h2 className="text-xl font-semibold font-hindi text-gray-800 mb-6">
                {editingPost ? "लेख संपादित करें" : "नया लेख लिखें"}
              </h2>
              
              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                    लेख का शीर्षक <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={postForm.title}
                    onChange={(e) => {
                      setPostForm(prev => ({ 
                        ...prev, 
                        title: e.target.value,
                        slug: generateSlug(e.target.value)
                      }));
                    }}
                    placeholder="यहाँ अपना शीर्षक लिखें..."
                    className="font-hindi text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                    URL स्लग
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 font-english bg-gray-50 px-3 py-2 rounded-l-lg border">
                      anantpragya.com/post/
                    </span>
                    <Input
                      value={postForm.slug}
                      onChange={(e) => setPostForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-slug"
                      className="rounded-l-none font-english"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                      श्रेणी <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={postForm.categoryId?.toString()}
                      onValueChange={(value) => setPostForm(prev => ({ ...prev, categoryId: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="श्रेणी चुनें" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                      लेखक <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={postForm.author}
                      onChange={(e) => setPostForm(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="लेखक का नाम"
                      className="font-hindi"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                    लेख की सामग्री <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    value={postForm.content || ""}
                    onChange={(content) => setPostForm(prev => ({ ...prev, content }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                    संक्षिप्त विवरण
                  </label>
                  <Textarea
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="लेख का संक्षिप्त विवरण..."
                    className="font-hindi"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPostForm(prev => ({ ...prev, status: "draft" }))}
                      className="font-hindi"
                    >
                      मसौदे में सेव करें
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingPost(null);
                        setPostForm({
                          title: "",
                          slug: "",
                          content: "",
                          excerpt: "",
                          featuredImage: "",
                          categoryId: undefined,
                          author: "",
                          status: "draft",
                          tags: [],
                          metaDescription: "",
                          focusKeyword: "",
                          readTime: 5,
                        });
                      }}
                      className="font-hindi"
                    >
                      रद्द करें
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => setPostForm(prev => ({ ...prev, status: "published" }))}
                      disabled={createPostMutation.isPending || updatePostMutation.isPending}
                      className="bg-saffron-500 hover:bg-saffron-600 font-hindi"
                    >
                      {editingPost ? "अपडेट करें" : "प्रकाशित करें"}
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>

            {/* Categories */}
            <TabsContent value="categories" className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold font-hindi text-gray-800 mb-4">नई श्रेणी जोड़ें</h3>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                        श्रेणी का नाम <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={categoryForm.name}
                        onChange={(e) => {
                          setCategoryForm(prev => ({ 
                            ...prev, 
                            name: e.target.value,
                            slug: generateSlug(e.target.value)
                          }));
                        }}
                        placeholder="श्रेणी का नाम"
                        className="font-hindi"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                        स्लग <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={categoryForm.slug}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="category-slug"
                        className="font-english"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                        विवरण
                      </label>
                      <Textarea
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="श्रेणी का विवरण"
                        className="font-hindi"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                        रंग
                      </label>
                      <div className="flex space-x-2">
                        {["#FF6B35", "#FFD700", "#E07A5F", "#32CD32", "#4169E1"].map(color => (
                          <button
                            key={color}
                            type="button"
                            className={`w-8 h-8 rounded-full border-2 ${
                              categoryForm.color === color ? "border-gray-800" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setCategoryForm(prev => ({ ...prev, color }))}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={createCategoryMutation.isPending}
                      className="w-full bg-saffron-500 hover:bg-saffron-600 font-hindi"
                    >
                      श्रेणी जोड़ें
                    </Button>
                  </form>
                </div>

                <div>
                  <h3 className="text-lg font-semibold font-hindi text-gray-800 mb-4">मौजूदा श्रेणियां</h3>
                  <div className="space-y-3">
                    {categories?.map((category: Category) => (
                      <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <div>
                            <h4 className="font-medium font-hindi text-gray-800">{category.name}</h4>
                            <p className="text-sm text-gray-500">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-saffron-600 hover:text-saffron-500">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="p-6">
              <h2 className="text-xl font-semibold font-hindi text-gray-800 mb-6">वेबसाइट सेटिंग्स</h2>
              
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold font-hindi text-gray-800 mb-4">सामान्य सेटिंग्स</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                        साइट का नाम
                      </label>
                      <Input 
                        defaultValue={settings?.siteName}
                        className="font-hindi"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                        साइट की टैगलाइन
                      </label>
                      <Input 
                        defaultValue={settings?.siteTagline}
                        className="font-hindi"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 font-hindi mb-2">
                        साइट का विवरण
                      </label>
                      <Textarea 
                        defaultValue={settings?.siteDescription}
                        className="font-hindi"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-saffron-500 hover:bg-saffron-600 font-hindi">
                    सेटिंग्स सेव करें
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
