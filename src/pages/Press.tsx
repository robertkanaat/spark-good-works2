import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Mail, Phone, Newspaper, ArrowRight, Users, CheckCircle } from "lucide-react";

const Press = () => {
  useEffect(() => {
    document.title = "Press & Media Center - Latest News | Genius Recovery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Access Genius Recovery press releases, media kit, and latest news. Connect with our team for media inquiries about addiction recovery innovation and support.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Access Genius Recovery press releases, media kit, and latest news. Connect with our team for media inquiries about addiction recovery innovation and support.';
      document.head.appendChild(meta);
    }
  }, []);

  const pressReleases = [
    {
      title: "Genius Recovery Launches AI-Powered 24/7 Recovery Support Platform",
      date: "January 15, 2025",
      excerpt: "Revolutionary nonprofit organization introduces groundbreaking technology to provide immediate addiction recovery support to those in need.",
      downloadUrl: "#"
    },
    {
      title: "New Study Shows 89% Success Rate with Genius Recovery Support Methods",
      date: "December 3, 2024",
      excerpt: "Clinical research validates the effectiveness of compassionate, AI-assisted recovery support in long-term addiction treatment.",
      downloadUrl: "#"
    },
    {
      title: "Genius Recovery Receives $2.5M Grant to Expand Crisis Intervention Services",
      date: "November 18, 2024",
      excerpt: "Major funding will enable organization to reach more individuals and families affected by addiction across the United States.",
      downloadUrl: "#"
    }
  ];

  const mediaKit = [
    {
      name: "Genius Recovery Logo Package",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)",
      fileSize: "2.3 MB"
    },
    {
      name: "Executive Team Photos",
      description: "Professional headshots and team photos",
      fileSize: "8.7 MB"
    },
    {
      name: "Brand Guidelines",
      description: "Complete brand style guide and usage instructions",
      fileSize: "1.2 MB"
    },
    {
      name: "Fact Sheet",
      description: "Key statistics and organizational information",
      fileSize: "256 KB"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: `url('/genius-recovery-uploads/411b8a25-5350-48b3-a3b5-b01e67d05ea2.png')`,
            backgroundPosition: 'center 15%'
          }}
        >
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
        </div>
        
        {/* Animated Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side - Powerful Content */}
            <div className="lg:col-span-7 text-left">
              {/* Badge */}
              <div className="mb-8 animate-fade-in">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Newspaper className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-white font-semibold tracking-wider uppercase text-sm">
                    Media & Press Center
                  </span>
                </div>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] animate-fade-in">
                Sharing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
                  Hope
                </span>{" "}
                <br />
                <span className="text-primary">Worldwide</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium animate-fade-in">
                Transforming the global conversation.<br />
                <span className="text-white/70">From judgment to compassion.</span>
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-col gap-4 mb-12 animate-fade-in">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">Comprehensive Media Kit</span>
                  </div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">Expert Interviews Available</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">24/7 Press Support</span>
                  </div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">High-Res Assets</span>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-primary/30 group"
                  onClick={() => {
                    window.open('https://lhwxxzxdsrykvznrtigf.supabase.co/storage/v1/object/public/press-materials/Genius%20Recovery%20Media%20Kit.pdf', '_blank');
                  }}
                >
                  <span className="relative">
                    Download Media Kit
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <Download className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-0.5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 group bg-black/20"
                  onClick={() => {
                    document.getElementById('media-contacts')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start' 
                    });
                  }}
                >
                  Contact Press Team
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            {/* Right side - Stats Card */}
            <div className="lg:col-span-5 animate-fade-in">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-6">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-6 text-white">
                    <div>
                      <div className="text-3xl font-bold text-primary">2.5M</div>
                      <div className="text-white/70 text-sm">Lives Touched</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">89%</div>
                      <div className="text-white/70 text-sm">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">24/7</div>
                      <div className="text-white/70 text-sm">Support Available</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">50+</div>
                      <div className="text-white/70 text-sm">Media Partners</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Press Releases Section - Hidden temporarily */}
      {/* 
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Press Releases
            </h2>
            <p className="text-lg text-muted-foreground">
              Recent news and announcements from Genius Recovery
            </p>
          </div>

          <div className="grid gap-8 md:gap-6 max-w-4xl mx-auto">
            {pressReleases.map((release, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {release.date}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {release.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {release.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 md:ml-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Media Kit Section */}
      <section className="py-16 bg-muted/50" id="media-kit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Media Kit
            </h2>
            <p className="text-lg text-muted-foreground">
              Download logos, photos, and brand assets for media coverage
            </p>
          </div>

          {/* Complete Media Kit Download */}
          <div className="mb-12">
            <Card className="p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Complete Media Kit
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Download our comprehensive media kit containing logos, brand guidelines, fact sheets, 
                executive photos, and everything you need for your story.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 gap-3 hover:scale-105 transition-all duration-300"
                onClick={() => {
                  window.open('https://lhwxxzxdsrykvznrtigf.supabase.co/storage/v1/object/public/press-materials/Genius%20Recovery%20Media%20Kit.pdf', '_blank');
                }}
              >
                <Download className="w-5 h-5" />
                Download Media Kit (PDF)
              </Button>
            </Card>
          </div>

          {/* Individual Asset Downloads - Hidden temporarily */}
          {/* 
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <div className="text-xs text-muted-foreground mb-4">
                  {item.fileSize}
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </Card>
            ))}
          </div>
          */}
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16" id="media-contacts">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Media Contacts
            </h2>
            <p className="text-lg text-muted-foreground">
              For press inquiries, interviews, and media requests
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Press Inquiries
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">directory@geniusrecovery.org</div>
                    <div className="text-sm text-muted-foreground">General media inquiries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">(480) 858-0008</div>
                    <div className="text-sm text-muted-foreground">Media hotline</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Executive Interviews
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">directory@geniusrecovery.org</div>
                    <div className="text-sm text-muted-foreground">CEO & leadership interviews</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">24-48 hour response time</div>
                    <div className="text-sm text-muted-foreground">For interview requests</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-8 bg-primary/5">
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">
              About Genius Recovery
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Genius Recovery is a 501(c)(3) nonprofit organization dedicated to changing the global conversation 
              around addiction from one of judgment to one of compassion. Through innovative AI-powered technology 
              and 24/7 support services, we connect individuals and families affected by addiction to life-saving 
              resources and recovery support. Our mission is to obliterate addiction around the world, one lost soul at a time.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;