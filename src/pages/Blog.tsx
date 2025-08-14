import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, Search, Filter, Heart, MessageCircle, Share2, BookOpen, TrendingUp, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useWordPressPosts } from "@/hooks/useWordPressPosts";
import blogHeroBg from "@/assets/blog-hero-bg.jpg";

const Blog = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { posts, loading, error, featuredPost, categories } = useWordPressPosts();
  
  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">Loading inspiring stories...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Unable to Load Stories</h2>
            <p className="text-muted-foreground mb-4">We're having trouble connecting to our blog. Please try again later.</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog | Genius Recovery"
        description="Read inspiring recovery stories, expert insights, and helpful resources on our blog. Find hope, motivation, and practical guidance for your addiction recovery journey."
        keywords="recovery stories, addiction recovery, recovery blog, hope, healing, inspiration, recovery resources, personal stories, expert insights"
        ogImage={blogHeroBg}
        canonicalUrl="https://geniusrecovery.org/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Genius Recovery Blog",
          "description": "Recovery stories, expert insights, and resources for addiction recovery",
          "url": "https://geniusrecovery.org/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Genius Recovery",
            "logo": {
              "@type": "ImageObject",
              "url": "https://geniusrecovery.org/genius-recovery-logo.png"
            }
          },
          "blogPost": posts.slice(0, 5).map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "datePublished": post.date,
            "url": `https://geniusrecovery.org/blog/${post.slug}`
          }))
        }}
      />
      <Header />
      
      {/* Hero Section with Background */}
      <section 
        className="relative min-h-[80vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blogHeroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        
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
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg group hover-scale hover-glow transition-all duration-300"
                onClick={() => {
                  const blogSection = document.querySelector('[data-section="blog-posts"]');
                  if (blogSection) {
                    blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <Search className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Explore Stories
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white px-8 py-4 text-lg group hover-scale transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
                onClick={() => {
                  const subject = 'I want to share my recovery story';
                  const body = `Hi Genius Recovery team,

I would like to share my story of recovery and hope to inspire others on their journey.

My story includes:
- My background and challenges I faced
- The turning point in my recovery
- What has helped me in my healing journey
- Message of hope I want to share

Please let me know the best way to submit my story.

Thank you for all the incredible work you do!

Best regards,`;
                  
                  window.location.href = `mailto:stories@geniusrecovery.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
              >
                <Heart className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:text-red-400 transition-all duration-300" />
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
            <div className="text-4xl font-bold text-foreground mb-2">{posts.length}+</div>
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
                  
                  <Button 
                    size="lg" 
                    className="self-start bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white group hover-scale hover-glow transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => window.location.href = `/blog/${featuredPost.slug}`}
                  >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    Read Full Story
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div data-section="blog-posts" className="mb-16">
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
          {filteredPosts.filter(post => !post.featured).map((post, index) => (
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto text-primary hover:text-primary/80 font-medium group hover-scale transition-all duration-300"
                    onClick={() => window.location.href = `/blog/${post.slug}`}
                  >
                    <BookOpen className="w-4 h-4 mr-1 group-hover:rotate-6 transition-transform duration-300" />
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
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