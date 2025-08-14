import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Heart, Phone, BookOpen, Users, MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    console.error("Full URL:", window.location.href);
    console.error("Search params:", window.location.search);
  }, [location.pathname]);

  const recommendedLinks = [
    {
      title: "Home",
      description: "Return to our main page",
      icon: Home,
      path: "/",
      color: "text-primary"
    },
    {
      title: "Get Support",
      description: "Find immediate help and resources",
      icon: Heart,
      path: "/support",
      color: "text-donate"
    },
    {
      title: "Crisis Support",
      description: "24/7 emergency assistance",
      icon: Phone,
      path: "/crisis-support",
      color: "text-destructive"
    },
    {
      title: "Resources",
      description: "Helpful guides and information",
      icon: BookOpen,
      path: "/resources",
      color: "text-secondary-foreground"
    },
    {
      title: "Treatment Centers",
      description: "Find recovery centers near you",
      icon: MapPin,
      path: "/treatment-centers",
      color: "text-accent-foreground"
    },
    {
      title: "About Us",
      description: "Learn about our mission",
      icon: Users,
      path: "/about",
      color: "text-muted-foreground"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Hero Section */}
          <div className="animate-fade-in mb-12">
            <div className="text-9xl font-bold bg-gradient-to-r from-primary via-donate to-primary bg-clip-text text-transparent mb-6">
              404
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're sorry, but the page you're looking for doesn't exist. 
              Don't worry - you can find what you need using the links below.
            </p>
            
            <Button asChild size="lg" className="hover-scale">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Link>
            </Button>
          </div>

          {/* Recommended Links Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Where would you like to go?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Card 
                    key={link.path}
                    className="p-6 hover-scale hover-glow transition-all duration-300 border-border bg-card/50 backdrop-blur-sm animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link to={link.path} className="block text-left">
                      <div className="flex items-start space-x-4">
                        <div className={`${link.color} mt-1`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-card-foreground mb-2">
                            {link.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Emergency Support Section */}
          <Card className="p-8 bg-destructive/5 border-destructive/20 animate-scale-in">
            <div className="text-center">
              <Phone className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-muted-foreground mb-4">
                If you're in crisis, don't wait. Get help now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="destructive" className="hover-scale">
                  <Link to="/crisis-support">
                    Crisis Support
                  </Link>
                </Button>
                <Button asChild variant="outline" className="hover-scale">
                  <a href="tel:988">
                    Call 988
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
