import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Heart, 
  Users, 
  Shield, 
  User, 
  PlayCircle, 
  BookOpen, 
  Calendar,
  UserCheck,
  Lightbulb,
  MessageCircle,
  Star
} from "lucide-react";

const Support = () => {
  useEffect(() => {
    document.title = "Caregiver Support Hub - Genius Recovery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Supporting someone with addiction is challenging. Get expert guidance, resources, and community support for caregivers and families affected by addiction.');
    }

    // Add canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', window.location.origin + '/support');
    } else {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = window.location.origin + '/support';
      document.head.appendChild(canonical);
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Caregiver Support Hub",
      "description": "Supporting someone with addiction is challenging. Get expert guidance, resources, and community support for caregivers and families affected by addiction.",
      "url": window.location.origin + '/support',
      "provider": {
        "@type": "Organization",
        "name": "Genius Recovery"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const features = [
    {
      icon: UserCheck,
      title: "Expert Guidance",
      description: "Get access to courses and resources designed by top addiction and recovery specialists."
    },
    {
      icon: Shield,
      title: "Private, Safe Communities",
      description: "No trolls, no judgment. Just a supportive, anonymous space where you can connect with others who understand."
    },
    {
      icon: Heart,
      title: "It's About You",
      description: "Everything we offer is centered around your well being! You need and deserve resources for your own well-being as well as empowerment tools for your loved one on their recovery journey."
    }
  ];

  const resources = [
    {
      icon: PlayCircle,
      title: "Expert Videos",
      description: "Access a collection of expert content tailored for caregivers, featuring insightful interviews, inspiring talks, and educational presentations. Each video is crafted to equip you with the knowledge and confidence to support your loved one effectively."
    },
    {
      icon: BookOpen,
      title: "Expert Articles & Resources",
      description: "Explore a curated selection of articles and resources designed specifically for caregivers. Gain practical tools, insights, and strategies from addiction recovery experts to help you navigate the challenges of caregiving."
    },
    {
      icon: Calendar,
      title: "Live Virtual Events",
      description: "Join interactive virtual events led by recovery experts and connect with other caregivers in real-time. Participate in Q&A sessions, workshops, and support group meetings designed to provide immediate guidance and community connection."
    },
    {
      icon: MessageCircle,
      title: "Community Support",
      description: "Connect with other caregivers who understand your journey. Share experiences, ask questions, and receive support from a compassionate community that's been where you are."
    }
  ];

  const testimonials = [
    {
      quote: "This community gave me hope when I felt like I was drowning. The resources are incredible and the support is genuine.",
      author: "Sarah M.",
      role: "Mother supporting her son's recovery"
    },
    {
      quote: "Finally, a place where I don't have to explain myself. Everyone here gets it, and the expert guidance has been life-changing.",
      author: "Michael D.",
      role: "Husband supporting his wife's journey"
    },
    {
      quote: "The live events and community discussions have helped me feel less alone and more empowered in supporting my daughter.",
      author: "Jennifer L.",
      role: "Parent and caregiver"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 text-sm px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Caregiver Support Hub
            </Badge>
            
            <p className="text-lg text-muted-foreground mb-4 font-medium">
              You're not alone, and we're here to help.
            </p>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Empowering Those Who Support{" "}
              <span className="text-primary">Loved Ones</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              The journey of supporting someone struggling with addiction is challenging, but you don't have to face it alone. The Caregivers Support Hub is designed as a safe, supportive community offering practical tools, resources, and guidance to help you navigate this journey with resilience and hope.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
                <Heart className="w-5 h-5 mr-2" />
                Get the Support YOU Need
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch Introduction Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Genius Recovery Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Genius Recovery?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We understand the unique challenges you face as a caregiver, and we're here to support you every step of the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What You Get With Your{" "}
              <span className="text-primary">Caregiver Support Hub</span> Membership
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive resources and community support designed specifically for caregivers and families.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 text-primary">Exclusive Recovery Resources</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <resource.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3">{resource.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{resource.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stories from Our Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from other caregivers who have found hope, support, and strength through our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get the Support You Deserve?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join thousands of caregivers who have found strength, hope, and practical tools to support both themselves and their loved ones on the recovery journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              <Users className="w-5 h-5 mr-2" />
              Join Our Community
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
              <Lightbulb className="w-5 h-5 mr-2" />
              Learn More About Membership
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            Start your 7-day free trial • Cancel anytime • No commitment required
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;