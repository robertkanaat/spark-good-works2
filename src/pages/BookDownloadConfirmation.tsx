import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Download, BookOpen, Users, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const BookDownloadConfirmation = () => {
  const additionalResources = [
    {
      title: "Crisis Support Hotline",
      description: "24/7 immediate support for those in crisis",
      icon: Heart,
      link: "/emergency",
      external: false
    },
    {
      title: "Treatment Center Directory",
      description: "Find quality treatment centers near you",
      icon: Users,
      link: "/treatment-centers",
      external: false
    },
    {
      title: "Recovery Support Hub",
      description: "Access expert videos, articles, and community support",
      icon: BookOpen,
      link: "/resources",
      external: false
    }
  ];

  return (
    <>
      <SEOHead 
        title="Book Download Confirmation - Thank You | Genius Recovery"
        description="Thank you for downloading 'Understanding Addiction And Recovery'. Access additional recovery resources and support."
        keywords="book download confirmation, addiction recovery resources, thank you, recovery support"
        canonicalUrl="https://geniusrecovery.org/addiction-recovery-book-download"
      />
      
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/30 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Your download has been processed successfully. Check your email for the download link to 
              "Understanding Addiction And Recovery."
            </p>
            <Card className="p-6 bg-primary/5 border-primary/20 max-w-md mx-auto">
              <div className="flex items-center gap-3 text-primary">
                <Download className="w-5 h-5" />
                <span className="font-semibold">Download link sent to your email</span>
              </div>
            </Card>
          </div>

          {/* Additional Resources */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Continue Your Recovery Journey
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {additionalResources.map((resource, index) => {
                const IconComponent = resource.icon;
                const linkProps = resource.external 
                  ? { href: resource.link, target: "_blank", rel: "noopener noreferrer" }
                  : { to: resource.link };
                
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer bg-card/50 border-border/50">
                    {resource.external ? (
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                            Access Resource
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </div>
                        </div>
                      </a>
                    ) : (
                      <Link to={resource.link} className="block">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {resource.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                            Access Resource
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </div>
                        </div>
                      </Link>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Support Message */}
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                You're Not Alone in This Journey
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Recovery is possible, and we're here to support you every step of the way. 
                Whether you need immediate help or ongoing resources, our community is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/emergency">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Heart className="w-5 h-5 mr-2" />
                    Get Immediate Help
                  </Button>
                </Link>
                <Link to="/support">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Users className="w-5 h-5 mr-2" />
                    Join Our Community
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link to="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BookDownloadConfirmation;