import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';

interface TransformedPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar?: string | null;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  link: string;
  tags: string[];
}

interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const WORDPRESS_API_URL = 'https://geniusrecovery.wpenginepowered.com/wp-json/wp/v2';

const stripHtml = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = stripHtml(content).split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const TagPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<TransformedPost[]>([]);
  const [tag, setTag] = useState<WordPressTag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  useEffect(() => {
    const fetchTagAndPosts = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // First, fetch the tag information
        const tagResponse = await fetch(`${WORDPRESS_API_URL}/tags?slug=${slug}`, {
          headers: { 'Accept': 'application/json' },
        });

        if (!tagResponse.ok) {
          throw new Error('Tag not found');
        }

        const tags = await tagResponse.json();
        if (!tags || tags.length === 0) {
          throw new Error('Tag not found');
        }

        const tagData = tags[0];
        setTag(tagData);

        // Now fetch posts with this tag
        const postsResponse = await fetch(
          `${WORDPRESS_API_URL}/posts?_embed&tags=${tagData.id}&per_page=100&orderby=date&order=desc`,
          {
            headers: { 'Accept': 'application/json' },
          }
        );

        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts');
        }

        const wordpressPosts = await postsResponse.json();

        // Transform posts
        const transformedPosts: TransformedPost[] = wordpressPosts.map((post: any) => {
          const getCategoryName = () => {
            if (post._embedded?.['wp:term']?.[0]) {
              const categories = post._embedded['wp:term'][0];
              for (const category of categories) {
                if (category.taxonomy === 'category' && category.name !== 'Uncategorized') {
                  return category.name;
                }
              }
            }
            return 'Blog';
          };

          const getAuthorName = () => {
            if (post._embedded?.author?.[0]) {
              return post._embedded.author[0].name;
            }
            return 'Genius Recovery';
          };

          const getAuthorAvatar = () => {
            if (post._embedded?.author?.[0]?.avatar_urls) {
              const avatarUrls = post._embedded.author[0].avatar_urls;
              return avatarUrls['96'] || avatarUrls['48'] || avatarUrls['24'] || Object.values(avatarUrls)[0] || null;
            }
            return null;
          };

          const getFeaturedImage = () => {
            if (post._embedded?.['wp:featuredmedia']?.[0]) {
              const media = post._embedded['wp:featuredmedia'][0];
              if ('code' in media && 'message' in media) {
                return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop&auto=format';
              }
              const sizes = media.media_details?.sizes;
              if (sizes?.large?.source_url) return sizes.large.source_url;
              if (sizes?.medium_large?.source_url) return sizes.medium_large.source_url;
              if (sizes?.medium?.source_url) return sizes.medium.source_url;
              if (media.source_url) return media.source_url;
            }
            return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop&auto=format';
          };

          const getTags = () => {
            if (post._embedded?.['wp:term']?.[1]) {
              return post._embedded['wp:term'][1]
                .filter((term: any) => term.taxonomy === 'post_tag')
                .map((term: any) => term.name);
            }
            return [];
          };

          return {
            id: post.id,
            title: stripHtml(post.title.rendered),
            excerpt: stripHtml(post.excerpt.rendered).replace(/READ IT TO ME:.*?Click play to listen to this post\./gi, '').trim(),
            content: post.content.rendered,
            category: getCategoryName(),
            author: getAuthorName(),
            authorAvatar: getAuthorAvatar(),
            date: formatDate(post.date),
            readTime: calculateReadTime(post.content.rendered),
            image: getFeaturedImage(),
            slug: post.slug,
            link: post.link,
            tags: getTags(),
          };
        });

        setPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching tag posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchTagAndPosts();
  }, [slug]);

  useEffect(() => {
    const saved = localStorage.getItem('likedPosts');
    if (saved) {
      setLikedPosts(JSON.parse(saved));
    }
  }, []);

  const toggleLike = (postId: number) => {
    const newLikedPosts = likedPosts.includes(postId)
      ? likedPosts.filter(id => id !== postId)
      : [...likedPosts, postId];
    
    setLikedPosts(newLikedPosts);
    localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
  };

  const handleShare = (platform: string, post: TransformedPost) => {
    const url = `https://geniusrecovery.org/${post.slug}`;
    const text = `${post.title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: 'Link copied!',
          description: 'The article link has been copied to your clipboard.',
        });
        break;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !tag) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Tag Not Found</h1>
            <p className="text-muted-foreground mb-6">The tag you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${tag.name} - Recovery Articles & Resources | Genius Recovery`}
        description={tag.description || `Browse all articles tagged with ${tag.name}. Find recovery insights, resources, and support for your journey.`}
        keywords={`${tag.name}, recovery, addiction recovery, ${tag.name} resources`}
        canonicalUrl={`https://geniusrecovery.org/tag/${tag.slug}`}
      />
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
            
            <div className="max-w-3xl">
              <Badge className="mb-4" variant="secondary">Tag</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {tag.name}
              </h1>
              {tag.description && (
                <p className="text-xl text-muted-foreground mb-6">
                  {tag.description}
                </p>
              )}
              <p className="text-muted-foreground">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found with this tag.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <Link to={`/${post.slug}`} className="block">
                        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                        {post.excerpt}
                      </p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tagName, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tagName}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border/50">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {post.authorAvatar && (
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(post.id)}
                            className={likedPosts.includes(post.id) ? 'text-red-500' : ''}
                          >
                            <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                          </Button>
                          
                          <div className="relative group/share">
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <div className="absolute right-0 top-full mt-2 bg-popover border border-border rounded-lg shadow-lg p-2 hidden group-hover/share:block z-10 min-w-[160px]">
                              <button
                                onClick={() => handleShare('facebook', post)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent rounded transition-colors"
                              >
                                <Facebook className="h-4 w-4" />
                                Facebook
                              </button>
                              <button
                                onClick={() => handleShare('twitter', post)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent rounded transition-colors"
                              >
                                <Twitter className="h-4 w-4" />
                                Twitter
                              </button>
                              <button
                                onClick={() => handleShare('linkedin', post)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent rounded transition-colors"
                              >
                                <Linkedin className="h-4 w-4" />
                                LinkedIn
                              </button>
                              <button
                                onClick={() => handleShare('copy', post)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent rounded transition-colors"
                              >
                                <LinkIcon className="h-4 w-4" />
                                Copy Link
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default TagPage;
