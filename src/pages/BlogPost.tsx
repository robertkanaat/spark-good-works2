import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Heart,
  Share2, 
  BookmarkPlus,
  X,
  Facebook,
  Linkedin,
  Copy,
  BookOpen,
  Download,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useWordPressPosts } from "@/hooks/useWordPressPosts";
import { toast } from "@/components/ui/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { posts, loading } = useWordPressPosts();
  const [post, setPost] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (posts.length > 0 && slug) {
      const foundPost = posts.find(p => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
      } else {
        // If post not found, redirect to blog
        navigate('/blog');
      }
    }
  }, [posts, slug, navigate]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
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
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard.",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse space-y-8 max-w-4xl w-full">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} | Genius Recovery`}
        description={post.excerpt}
        keywords={`recovery story, addiction recovery, ${post.category}, ${post.author}, inspiration, hope, healing`}
        ogType="article"
        ogImage={post.image}
        canonicalUrl={`https://geniusrecovery.org/blog/${post.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.image,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Genius Recovery",
            "logo": {
              "@type": "ImageObject",
              "url": "https://geniusrecovery.org/genius-recovery-logo.png"
            }
          },
          "datePublished": post.date,
          "dateModified": post.date,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://geniusrecovery.org/blog/${post.slug}`
          }
        }}
      />
      <Header />
      
      {/* Hero Section - Above the fold for SEO */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-orange-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              className="mb-8 hover-scale group"
              onClick={() => {
                // Check if we have a stored referrer page
                const referrerPage = sessionStorage.getItem('blogReferrerPage');
                if (referrerPage && referrerPage !== '1') {
                  navigate(`/blog?page=${referrerPage}`);
                } else {
                  navigate('/blog');
                }
                // Clean up the stored referrer
                sessionStorage.removeItem('blogReferrerPage');
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Stories
            </Button>

            {/* Article Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary px-4 py-2 text-sm font-medium">
                {post.category}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                {post.excerpt.replace(/READ IT TO ME:.*?Click play to listen to this post\./gi, '').trim()}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              {/* Engagement Actions */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  className={`hover-scale transition-all duration-300 ${isLiked ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 mr-2 transition-all duration-300 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
                  Like
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`hover-scale transition-all duration-300 ${isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <BookmarkPlus className={`w-4 h-4 mr-2 transition-all duration-300 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
                  Save
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative mb-16 overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Sidebar - Now on the left */}
              <div className="lg:col-span-1 lg:order-1">
                <div className="sticky top-8 space-y-8">
                  {/* Share Options */}
                  <Card className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Share This Story
                    </h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start hover-scale"
                        onClick={() => handleShare('x')}
                      >
                        <X className="w-4 h-4 mr-2" />
                        X
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start hover-scale"
                        onClick={() => handleShare('facebook')}
                      >
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start hover-scale"
                        onClick={() => handleShare('linkedin')}
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start hover-scale"
                        onClick={() => handleShare('copy')}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                  </Card>

                  {/* Free Book Download */}
                  <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border border-primary/20">
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-foreground">Free Recovery Guide</h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Get expert insights from Joe Polish's interviews with world-renowned recovery specialists
                      </p>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">Dr. Gabor Maté interviews</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">100% free download</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full hover-scale bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        onClick={() => navigate('/addiction-recovery-book')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Now
                      </Button>
                    </div>
                  </Card>

                  {/* Related Stories CTA */}
                  <Card className="p-6 bg-gradient-to-br from-primary/10 to-orange-500/10">
                    <h3 className="font-bold mb-4">More Inspiring Stories</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover more journeys of hope and recovery
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full hover-scale"
                      onClick={() => {
                        // Check if we have a stored referrer page
                        const referrerPage = sessionStorage.getItem('blogReferrerPage');
                        if (referrerPage && referrerPage !== '1') {
                          navigate(`/blog?page=${referrerPage}`);
                        } else {
                          navigate('/blog');
                        }
                        // Clean up the stored referrer
                        sessionStorage.removeItem('blogReferrerPage');
                      }}
                    >
                      Explore Stories
                    </Button>
                  </Card>
                </div>
              </div>

              {/* Main Content - Now on the right */}
              <div className="lg:col-span-3 lg:order-2">
                <Card className="p-8 md:p-12 shadow-elegant">
                  <div 
                    className="space-y-8 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/<p>/g, '<p class="mb-8 text-lg text-muted-foreground leading-relaxed">')
                        .replace(/<h1>/g, '<h1 class="text-4xl font-bold text-foreground mb-6 mt-12 first:mt-0">')
                        .replace(/<h2>/g, '<h2 class="text-3xl font-bold text-foreground mb-6 mt-10">')
                        .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-foreground mb-4 mt-8">')
                        .replace(/<h4>/g, '<h4 class="text-xl font-bold text-foreground mb-4 mt-6">')
                        .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-primary pl-6 py-4 my-8 bg-primary/5 rounded-r-lg italic text-foreground">')
                        .replace(/<ul>/g, '<ul class="mb-8 space-y-3 pl-6">')
                        .replace(/<ol>/g, '<ol class="mb-8 space-y-3 pl-6">')
                        .replace(/<li>/g, '<li class="text-lg text-muted-foreground">')
                        .replace(/<a /g, '<a class="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-colors" ')
                        .replace(/<strong>/g, '<strong class="text-foreground font-semibold">')
                        .replace(/<em>/g, '<em class="text-foreground italic">')
                        .replace(/<img /g, '<img class="rounded-lg shadow-md my-8 w-full" ')
                    }}
                  />
                  
                  <Separator className="my-12" />
                  
                  {/* Author Information */}
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/10">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">About the Author</h3>
                    <div className="flex items-start gap-4">
                      {/* Author Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Author Details */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{post.author || 'Genius Recovery Team'}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {post.author === 'Genius Recovery' || !post.author ? 
                            'Our dedicated team of addiction recovery specialists, mental health professionals, and peer recovery advocates work together to provide evidence-based resources and support for individuals and families affected by substance use disorders. With years of combined experience in the field, we are committed to sharing knowledge that empowers recovery journeys.' :
                            `${post.author} is a contributing writer for Genius Recovery, bringing valuable insights and expertise to help individuals and families navigate the path to recovery. Their work focuses on providing practical, evidence-based guidance for overcoming addiction and building lasting wellness.`
                          }
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            Recovery Specialist
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Mental Health Advocate
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Author
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Optional: Link to more articles by this author */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Published on {post.date} • {post.readTime}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;