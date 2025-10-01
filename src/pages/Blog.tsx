import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, Search, Filter, Heart, MessageCircle, Share2, BookOpen, TrendingUp, Loader2, AlertCircle, Sparkles, X, Facebook, Linkedin, Copy } from "lucide-react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useWordPressPosts } from "@/hooks/useWordPressPosts";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import blogHeroBg from "@/assets/blog-hero-bg.jpg";

const Blog = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [email, setEmail] = useState("");
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);
  const { posts, loading, error, featuredPost, categories, totalPages, currentPage, fetchPage, totalPostsCount } = useWordPressPosts();
  
  // Get page from URL params, default to 1
  const pageFromUrl = pageNumber ? parseInt(pageNumber, 10) : 1;
  
  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Load liked posts from localStorage on component mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedPosts');
    if (savedLikes) {
      setLikedPosts(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  // Handle page changes from URL
  useEffect(() => {
    if (pageFromUrl !== currentPage && pageFromUrl >= 1 && pageFromUrl <= totalPages) {
      fetchPage(pageFromUrl);
    }
  }, [pageFromUrl, currentPage, totalPages, fetchPage]);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      // Save to localStorage
      localStorage.setItem('likedPosts', JSON.stringify(Array.from(newLikedPosts)));
      return newLikedPosts;
    });
  };

  const handlePageChange = (page: number) => {
    if (page === 1) {
      navigate('/blog');
    } else {
      navigate(`/blog/page/${page}`);
    }
    fetchPage(page);
  };

  const handleShare = (platform: string, post: any) => {
    const url = `${window.location.origin}/${post.slug}`;
    const title = post.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          // Could add toast notification here
        });
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Error", 
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsNewsletterLoading(true);
    
    try {
      const response = await fetch("https://hooks.zapier.com/hooks/catch/155028/uhapjg7/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: "blog_newsletter",
          page: "blog",
        }),
      });

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter. Welcome to the community!",
      });
      
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsNewsletterLoading(false);
    }
  };

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
            "url": `https://geniusrecovery.org/${post.slug}`
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
                onClick={() => navigate('/contact')}
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
            <div className="text-4xl font-bold text-foreground mb-2">300+</div>
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
                ✨ Must Read
              </Badge>
              <h2 className="text-4xl font-bold mt-6 mb-4">Latest Article</h2>
              <p className="text-xl text-muted-foreground">Inspiring stories that change lives</p>
            </div>
            
            <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-background to-orange-500/5 border-0 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <Link 
                  to={`/${featuredPost.slug}`}
                  state={{ from: location.pathname + location.search }}
                  className="relative h-80 lg:h-auto overflow-hidden cursor-pointer block"
                >
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
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="p-12 flex flex-col justify-center">
                  <Link 
                    to={`/${featuredPost.slug}`}
                    state={{ from: location.pathname + location.search }}
                  >
                    <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight hover:text-primary transition-colors duration-300 cursor-pointer">
                      {featuredPost.title}
                    </h3>
                  </Link>
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
                    asChild
                  >
                    <Link 
                      to={`/${featuredPost.slug}`}
                      state={{ from: location.pathname + location.search }}
                    >
                      <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                      Read Full Story
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
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
              <Link 
                to={`/${post.slug}`}
                state={{ from: location.pathname + location.search }}
                className="relative overflow-hidden cursor-pointer block"
              >
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
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </Link>
              
              <div className="p-8">
                <Link 
                  to={`/${post.slug}`}
                  state={{ from: location.pathname + location.search }}
                >
                  <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                    {post.title}
                  </h3>
                </Link>
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
                    asChild
                  >
                    <Link 
                      to={`/${post.slug}`}
                      state={{ from: location.pathname + location.search }}
                    >
                      <BookOpen className="w-4 h-4 mr-1 group-hover:rotate-6 transition-transform duration-300" />
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-9 w-9 p-0 transition-all duration-300 group/heart ${
                        likedPosts.has(post.id) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'hover:bg-red-50 hover:text-red-500'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(post.id);
                        // Add heart animation
                        const heartButton = e.currentTarget;
                        heartButton.classList.add('animate-pulse');
                        setTimeout(() => heartButton.classList.remove('animate-pulse'), 600);
                      }}
                    >
                      <Heart 
                        className={`w-4 h-4 group-hover/heart:scale-110 transition-all duration-300 ${
                          likedPosts.has(post.id) ? 'fill-current' : ''
                        }`} 
                      />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleShare('x', post)}>
                          <X className="w-4 h-4 mr-2" />
                          Share on X
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('facebook', post)}>
                          <Facebook className="w-4 h-4 mr-2" />
                          Share on Facebook
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('linkedin', post)}>
                          <Linkedin className="w-4 h-4 mr-2" />
                          Share on LinkedIn
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('copy', post)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mb-20">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {/* First page */}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(1);
                    }}
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {/* Ellipsis before current page if needed */}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Page numbers around current page */}
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const pageNum = Math.max(2, Math.min(currentPage - 1, totalPages - 2)) + i;
                  if (pageNum === 1 || pageNum === totalPages || pageNum < 1) return null;
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNum);
                        }}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {/* Ellipsis after current page if needed */}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Last page */}
                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(totalPages);
                      }}
                      isActive={currentPage === totalPages}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

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
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="flex-1 h-12 px-6 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                disabled={isNewsletterLoading}
              />
              <Button 
                type="submit"
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 rounded-full font-medium hover-scale hover-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isNewsletterLoading}
              >
                {isNewsletterLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;