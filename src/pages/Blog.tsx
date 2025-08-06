import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, Search, Filter, Heart, MessageCircle, Share2, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import blogHeroBg from "@/assets/blog-hero-bg.jpg";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Recovery Stories", "Mental Health", "Family Support", "Resources", "News"];
  
  const blogPosts = [
    {
      id: 1,
      title: "Breaking the Silence: One Woman's Journey from Addiction to Advocacy",
      excerpt: "Sarah shares her powerful story of overcoming addiction and how she now helps others find their path to recovery.",
      category: "Recovery Stories",
      author: "Sarah Martinez",
      date: "December 5, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop&auto=format",
      featured: true,
      likes: 245,
      comments: 18
    },
    {
      id: 2,
      title: "Understanding Co-Occurring Disorders: When Mental Health and Addiction Intersect",
      excerpt: "Exploring the complex relationship between mental health conditions and substance use disorders.",
      category: "Mental Health",
      author: "Dr. Michael Chen",
      date: "December 3, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&auto=format",
      likes: 189,
      comments: 24
    },
    {
      id: 3,
      title: "Supporting Your Loved One: A Family Guide to Recovery",
      excerpt: "Practical advice for families navigating the challenges of supporting someone in recovery.",
      category: "Family Support",
      author: "Lisa Thompson",
      date: "December 1, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=400&fit=crop&auto=format",
      likes: 156,
      comments: 12
    },
    {
      id: 4,
      title: "The Science of Addiction: Understanding the Brain's Role",
      excerpt: "A deep dive into how addiction affects the brain and why recovery is possible with the right support.",
      category: "Resources",
      author: "Dr. Emily Rodriguez",
      date: "November 28, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format",
      likes: 298,
      comments: 31
    },
    {
      id: 5,
      title: "Finding Hope in Dark Times: Community Support Makes the Difference",
      excerpt: "How peer support groups and community connections can transform the recovery journey.",
      category: "Recovery Stories",
      author: "James Wilson",
      date: "November 25, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop&auto=format",
      likes: 167,
      comments: 15
    },
    {
      id: 6,
      title: "New Study Shows Promise for Alternative Recovery Therapies",
      excerpt: "Recent research highlights the effectiveness of art therapy, meditation, and other holistic approaches.",
      category: "News",
      author: "Research Team",
      date: "November 22, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format",
      likes: 134,
      comments: 8
    }
  ];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Background */}
      <section className="relative min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${blogHeroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium">Recovery Stories & Resources</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Stories of <span className="text-primary">Hope & Healing</span>
            </h1>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Real stories, expert insights, and practical resources to support your recovery journey and inspire transformation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                <Search className="w-6 h-6 mr-3" />
                Explore Stories
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg">
                <Heart className="w-6 h-6 mr-3" />
                Share Your Story
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-2">500+</div>
            <div className="text-muted-foreground">Recovery Stories</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-2">10K+</div>
            <div className="text-muted-foreground">Lives Impacted</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-2">95%</div>
            <div className="text-muted-foreground">Hope Restored</div>
          </div>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="bg-primary/10 text-primary px-4 py-2 text-sm font-medium">
                ✨ Featured Story
              </Badge>
              <h2 className="text-4xl font-bold mt-6 mb-4">Latest Featured Article</h2>
              <p className="text-xl text-muted-foreground">Inspiring stories that change lives</p>
            </div>
            
            <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-background to-orange-500/5 border-0 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {featuredPost.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {featuredPost.comments}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <Button size="lg" className="self-start bg-primary hover:bg-primary/90 group">
                    Read Full Story
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "hover:scale-105 hover:shadow-md"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {filteredPosts.slice(1).map((post, index) => (
            <Card key={post.id} className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50/50 animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80 font-medium group">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="p-16 text-center bg-gradient-to-br from-primary/10 via-background to-orange-500/10 border-0 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Stay Connected to Hope</h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Get the latest recovery stories, expert insights, and life-changing resources delivered directly to your inbox. 
              Join our community of hope and healing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg group">
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;