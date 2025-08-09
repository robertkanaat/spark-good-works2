import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const BlogPreviewSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding the Root Causes of Addiction",
      excerpt: "Exploring the deep connections between trauma, pain, and addictive behaviors in modern society.",
      date: "December 15, 2024",
      readTime: "8 min read",
      category: "Recovery Insights",
      slug: "understanding-root-causes-addiction"
    },
    {
      id: 2,
      title: "Building Support Networks for Recovery",
      excerpt: "How community connections and meaningful relationships play a crucial role in healing from addiction.",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Community",
      slug: "building-support-networks-recovery"
    },
    {
      id: 3,
      title: "The Science Behind Compassionate Treatment",
      excerpt: "Research-backed approaches that prioritize understanding and empathy over punishment and shame.",
      date: "December 5, 2024",
      readTime: "10 min read",
      category: "Research",
      slug: "science-compassionate-treatment"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-40" aria-hidden />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-60" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-donate/5 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-foreground font-bold tracking-wider uppercase text-sm">
              Latest Insights
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
            Recovery{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-primary">
              Stories & Insights
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover compassionate perspectives, research-backed approaches, and real stories 
            from the recovery community.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/90 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-donate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="relative p-8">
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
                  {post.category}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-muted-foreground/80">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/blog">
            <Button 
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
              style={{ 
                background: 'var(--gradient-primary)',
                boxShadow: 'var(--shadow-elegant)'
              }}
            >
              <span className="relative flex items-center gap-2">
                Explore All Articles
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;