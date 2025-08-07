import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Mail, Phone } from "lucide-react";
import pressHeroBg from "@/assets/press-hero-bg.jpg";

const Press = () => {
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
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${pressHeroBg})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/90" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Press Center
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            Stay informed about Genius Recovery's mission to transform addiction treatment and recovery support through innovation and compassion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg" 
              className="gap-2 animate-fade-in hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              <FileText className="w-5 h-5" />
              Download Media Kit
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 animate-fade-in hover:scale-105 transition-all duration-300 hover:shadow-lg backdrop-blur-sm bg-background/50 border-border/50"
            >
              <Mail className="w-5 h-5" />
              Contact Press Team
            </Button>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
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

      {/* Media Kit Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Media Kit
            </h2>
            <p className="text-lg text-muted-foreground">
              Download logos, photos, and brand assets for media coverage
            </p>
          </div>

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
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
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
                    <div className="font-medium">press@geniusrecovery.org</div>
                    <div className="text-sm text-muted-foreground">General media inquiries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">(555) 123-PRESS</div>
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
                    <div className="font-medium">interviews@geniusrecovery.org</div>
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