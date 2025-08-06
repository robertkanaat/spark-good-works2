import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, Search, Filter, Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      featured: true
    },
    {
      id: 2,
      title: "Understanding Co-Occurring Disorders: When Mental Health and Addiction Intersect",
      excerpt: "Exploring the complex relationship between mental health conditions and substance use disorders.",
      category: "Mental Health",
      author: "Dr. Michael Chen",
      date: "December 3, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&auto=format"
    },
    {
      id: 3,
      title: "Supporting Your Loved One: A Family Guide to Recovery",
      excerpt: "Practical advice for families navigating the challenges of supporting someone in recovery.",
      category: "Family Support",
      author: "Lisa Thompson",
      date: "December 1, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=400&fit=crop&auto=format"
    },
    {
      id: 4,
      title: "The Science of Addiction: Understanding the Brain's Role",
      excerpt: "A deep dive into how addiction affects the brain and why recovery is possible with the right support.",
      category: "Resources",
      author: "Dr. Emily Rodriguez",
      date: "November 28, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format"
    },
    {
      id: 5,
      title: "Finding Hope in Dark Times: Community Support Makes the Difference",
      excerpt: "How peer support groups and community connections can transform the recovery journey.",
      category: "Recovery Stories",
      author: "James Wilson",
      date: "November 25, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop&auto=format"
    },
    {
      id: 6,
      title: "New Study Shows Promise for Alternative Recovery Therapies",
      excerpt: "Recent research highlights the effectiveness of art therapy, meditation, and other holistic approaches.",
      category: "News",
      author: "Research Team",
      date: "November 22, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format"
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-orange-500/10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Recovery <span className="text-primary">Stories & Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real stories, expert insights, and practical resources to support your recovery journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Search className="w-5 h-5 mr-2" />
                Browse Articles
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5 mr-2" />
                Share Your Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="text-primary">Featured Story</Badge>
              <h2 className="text-3xl font-bold mt-4">Latest Featured Article</h2>
            </div>
            <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-orange-500/5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 line-clamp-2">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Button className="self-start">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-orange-500/10">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest recovery stories, expert insights, and resources delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <MessageCircle className="w-5 h-5 mr-2" />
              Subscribe to Newsletter
            </Button>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;