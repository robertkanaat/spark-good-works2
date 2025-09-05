import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, Users, BookOpen, MessageCircle, Phone, ExternalLink, Clock, Shield, HandHeart, UserCheck, Calendar, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SectionNavigation from "@/components/SectionNavigation";

const FamilySupport = () => {
  useEffect(() => {
    document.title = "Family Support for Addiction Recovery | Resources & Guidance | Genius Recovery";
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Genius Recovery Family Support",
    "description": "Comprehensive family support resources for those affected by a loved one's addiction",
    "url": "https://geniusrecovery.org/family-support",
    "sameAs": [
      "https://www.facebook.com/geniusrecovery",
      "https://www.instagram.com/geniusrecovery"
    ]
  };

  const supportPrograms = [
    {
      title: "Al-Anon Family Groups",
      description: "Support groups for families and friends of those with alcohol addiction",
      icon: Users,
      features: ["In-person meetings", "Online meetings", "Phone meetings", "Literature resources"],
      availability: "Worldwide",
      cost: "Free",
      link: "https://al-anon.org"
    },
    {
      title: "Nar-Anon Family Groups",
      description: "Support for families affected by someone else's drug addiction",
      icon: Heart,
      features: ["Weekly meetings", "Step programs", "Sponsorship", "Family recovery tools"],
      availability: "Global network",
      cost: "Free",
      link: "https://www.nar-anon.org"
    },
    {
      title: "Family Therapy Programs",
      description: "Professional counseling services designed for families in recovery",
      icon: MessageCircle,
      features: ["Individual sessions", "Group therapy", "Crisis intervention", "Treatment planning"],
      availability: "Licensed therapists",
      cost: "Insurance accepted",
      link: "https://www.psychologytoday.com/us/therapists/family-addiction"
    },
    {
      title: "CRAFT Training",
      description: "Community Reinforcement and Family Training for effective intervention",
      icon: BookOpen,
      features: ["Behavior change techniques", "Communication skills", "Self-care strategies", "Professional guidance"],
      availability: "Certified trainers",
      cost: "Varies",
      link: "https://www.robertjmeyersphd.com/craft.html"
    }
  ];

  const educationalResources = [
    {
      title: "Understanding Addiction as a Family Disease",
      description: "Learn how addiction affects the entire family system and dynamics",
      topics: ["Family roles", "Codependency", "Enabling behaviors", "Healthy boundaries"],
      icon: Brain,
      link: "/education#understanding-addiction"
    },
    {
      title: "Communication Strategies",
      description: "Effective ways to communicate with your loved one during recovery",
      topics: ["Active listening", "Non-judgmental language", "Setting boundaries", "Conflict resolution"],
      icon: MessageCircle,
      link: "/education#recovery-stages"
    },
    {
      title: "Self-Care for Family Members",
      description: "Essential self-care practices for maintaining your own well-being",
      topics: ["Stress management", "Support systems", "Personal boundaries", "Mental health"],
      icon: Heart,
      link: "/education#mental-health"
    },
    {
      title: "Supporting Recovery",
      description: "How to be supportive without enabling during the recovery process",
      topics: ["Encouragement vs enabling", "Recovery milestones", "Relapse prevention", "Long-term support"],
      icon: HandHeart,
      link: "/education#harm-reduction"
    }
  ];

  const crisisResources = [
    {
      title: "Family Crisis Hotline",
      phone: "1-800-621-4673",
      description: "24/7 support for families in crisis situations",
      availability: "24/7"
    },
    {
      title: "Al-Anon Information Service",
      phone: "1-888-425-2666",
      description: "Information and meeting referrals for Al-Anon groups",
      availability: "Business hours"
    },
    {
      title: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "Crisis support for anyone contemplating suicide",
      availability: "24/7"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Family Support for Addiction Recovery | Resources & Guidance | Genius Recovery"
        description="Comprehensive family support resources including Al-Anon, Nar-Anon, family therapy, and educational materials for families affected by addiction."
        keywords="family support, Al-Anon, Nar-Anon, family therapy, addiction recovery, codependency, family education"
        structuredData={structuredData}
      />
      <Header />
      
      <SectionNavigation />
      
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-primary/10 via-background to-muted/20 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="relative inline-block mb-8">
              <Users className="w-20 h-20 text-primary mx-auto" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl opacity-50"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6 animate-fade-in">
              Family Support Resources
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Addiction affects the whole family. Find support, education, and healing resources 
              designed specifically for family members and loved ones on the recovery journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <Shield className="w-4 h-4 mr-2" />
                Safe Environment
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <Heart className="w-4 h-4 mr-2" />
                Compassionate Care
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <Users className="w-4 h-4 mr-2" />
                Community Support
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section id="crisis-support" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent mb-6">
              Crisis Support for Families
            </h2>
            <p className="text-xl text-muted-foreground">
              Immediate help and support when you need it most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="group p-8 border-l-4 border-l-destructive bg-gradient-to-br from-card to-card/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{resource.description}</p>
                  <a 
                    href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                    className="block text-2xl font-bold text-destructive hover:text-destructive/80 transition-colors duration-200 mb-3"
                  >
                    {resource.phone}
                  </a>
                  <Badge variant="outline" className="border-destructive/20 text-destructive bg-destructive/5">
                    {resource.availability}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Programs */}
      <section id="support-programs" className="py-20 relative bg-gradient-to-br from-muted/30 via-muted/10 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6">
              Family Support Programs
            </h2>
            <p className="text-xl text-muted-foreground">
              Proven programs designed to help families heal and recover together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {supportPrograms.map((program, index) => (
              <Card key={index} className="group p-8 bg-gradient-to-br from-card via-card/95 to-card/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-primary/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <program.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-foreground">{program.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{program.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-foreground">Availability:</span>
                          <p className="text-muted-foreground">{program.availability}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">Cost:</span>
                          <p className="text-muted-foreground">{program.cost}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <span className="font-semibold text-foreground text-sm">Features:</span>
                      <div className="flex flex-wrap gap-2">
                        {program.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-200">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <a href={program.link} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section id="education-resources" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
              Family Education Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Knowledge and tools to help your family navigate the recovery journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationalResources.map((resource, index) => (
              <Card key={index} className="group p-8 bg-gradient-to-br from-card to-card/80 hover:shadow-2xl hover:scale-105 transition-all duration-500 border-accent/20">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <resource.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-foreground">{resource.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{resource.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <span className="font-semibold text-foreground text-sm">Topics Covered:</span>
                      <div className="flex flex-wrap gap-2">
                        {resource.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors duration-200">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link to={resource.link}>
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Explore Resource
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-24 relative bg-gradient-to-br from-primary/10 via-background to-muted/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_50%)] opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <div className="relative inline-block mb-8">
              <Heart className="w-20 h-20 text-primary mx-auto animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl opacity-50"></div>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-8">
              You're Not Alone in This Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
              Recovery is a family affair. Whether you're supporting a loved one in recovery or 
              seeking help for yourself, remember that healing is possible and support is available. 
              Take the first step today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Get Support Today
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300">
                Explore More Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FamilySupport;