import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Users, Globe, Shield, Phone, BookOpen, HeadphonesIcon, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import resourcesHeroBg from "@/assets/recovery-resources-hero-new.jpg";

const Resources = () => {
  useEffect(() => {
    document.title = "Recovery Resources & Support Tools | Genius Recovery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Comprehensive addiction recovery resources including crisis hotlines, treatment centers, support groups, and educational materials. Find the help you need today.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Comprehensive addiction recovery resources including crisis hotlines, treatment centers, support groups, and educational materials. Find the help you need today.';
      document.head.appendChild(meta);
    }
  }, []);

  const emergencyResources = [
    {
      title: "988 Suicide & Crisis Lifeline",
      description: "24/7 free and confidential support for people in distress, prevention and crisis resources.",
      phone: "988",
      available: "24/7",
      icon: Phone
    },
    {
      title: "SAMHSA National Helpline",
      description: "Treatment referral and information service for mental health and substance use disorders.",
      phone: "1-800-662-4357",
      available: "24/7",
      icon: HeadphonesIcon
    },
    {
      title: "Crisis Text Line",
      description: "Free, 24/7 support for those in crisis. Text HOME to connect with a counselor.",
      phone: "Text HOME to 741741",
      available: "24/7",
      icon: MessageCircle
    },
    {
      title: "Trevor Project (LGBTQ+)",
      description: "LGBTQ+ crisis support and suicide prevention specifically for young people.",
      phone: "1-866-488-7386",
      available: "24/7",
      icon: Heart
    },
    {
      title: "Veterans Crisis Line",
      description: "Confidential support for veterans in crisis and their families and friends.",
      phone: "1-800-273-8255",
      available: "24/7",
      icon: Shield
    },
    {
      title: "National Domestic Violence",
      description: "24/7 support, information, and referrals for domestic violence situations.",
      phone: "1-800-799-7233",
      available: "24/7",
      icon: Users
    }
  ];

  const recoveryResources = [
    {
      title: "Treatment Centers",
      description: "Find qualified treatment facilities and programs in your area",
      topics: ["Inpatient Care", "Outpatient Programs", "Detox Centers", "Specialized Treatment"]
    },
    {
      title: "Support Groups",
      description: "Connect with peer support and recovery communities",
      topics: ["AA/NA Meetings", "SMART Recovery", "Refuge Recovery", "Online Communities"]
    },
    {
      title: "Family Support",
      description: "Resources for families and loved ones of those in recovery",
      topics: ["Al-Anon", "Nar-Anon", "Family Therapy", "Educational Materials"]
    },
    {
      title: "Recovery Tools",
      description: "Apps, books, and tools to support your recovery journey",
      topics: ["Mobile Apps", "Workbooks", "Meditation", "Goal Setting"]
    }
  ];

  const educationalResources = [
    {
      title: "Understanding Addiction",
      description: "Learn about the science and psychology behind addiction",
      link: "/education#understanding-addiction"
    },
    {
      title: "Recovery Stages",
      description: "Navigate the different phases of recovery with confidence",
      link: "/education#recovery-stages"
    },
    {
      title: "Harm Reduction",
      description: "Practical strategies to reduce risks and promote safety",
      link: "/education#harm-reduction"
    },
    {
      title: "Mental Health",
      description: "Address co-occurring mental health conditions",
      link: "/education#mental-health"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${resourcesHeroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/50 to-secondary/25"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"></div>
        </div>
        
        {/* Floating Elements Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 left-10 w-24 h-24 bg-secondary/15 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-ping"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Icon Cluster */}
            <div className="flex items-center justify-center mb-8 gap-4">
              <div className="relative">
                <Heart className="w-16 h-16 text-primary animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg"></div>
              </div>
              <div className="relative">
                <Shield className="w-16 h-16 text-secondary animate-bounce" />
                <div className="absolute -inset-2 bg-secondary/20 rounded-full blur-lg"></div>
              </div>
              <div className="relative">
                <Users className="w-16 h-16 text-accent animate-pulse" />
                <div className="absolute -inset-2 bg-accent/20 rounded-full blur-lg"></div>
              </div>
              <div className="relative">
                <BookOpen className="w-16 h-16 text-primary animate-bounce" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg"></div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
                Recovery Resources
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent animate-fade-in delay-300">
                & Support Hub
              </span>
            </h1>
            
            <p className="text-2xl text-foreground/80 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
              Your comprehensive gateway to healing, growth, and lasting recovery. 
              <span className="text-primary font-semibold">Discover resources, connect with support, and transform your journey.</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Badge variant="secondary" className="px-8 py-4 text-lg bg-white/90 backdrop-blur-md border-primary/30 hover:scale-110 hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-2xl">
                <Shield className="w-6 h-6 mr-3" />
                Crisis Support 24/7
              </Badge>
              <Badge variant="secondary" className="px-8 py-4 text-lg bg-white/90 backdrop-blur-md border-secondary/30 hover:scale-110 hover:bg-secondary hover:text-secondary-foreground transition-all duration-500 shadow-2xl">
                <Users className="w-6 h-6 mr-3" />
                Community Networks
              </Badge>
              <Badge variant="secondary" className="px-8 py-4 text-lg bg-white/90 backdrop-blur-md border-accent/30 hover:scale-110 hover:bg-accent hover:text-accent-foreground transition-all duration-500 shadow-2xl">
                <Globe className="w-6 h-6 mr-3" />
                Global Resources
              </Badge>
              <Badge variant="secondary" className="px-8 py-4 text-lg bg-white/90 backdrop-blur-md border-primary/30 hover:scale-110 hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-2xl">
                <BookOpen className="w-6 h-6 mr-3" />
                Educational Tools
              </Badge>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                onClick={() => {
                  const emergencySection = document.querySelector('#emergency-section');
                  if (emergencySection) {
                    emergencySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Phone className="w-6 h-6 mr-3" />
                Emergency Support
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-xl font-bold border-2 border-primary/30 bg-white/10 backdrop-blur-md hover:bg-primary hover:border-primary hover:text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
                onClick={() => {
                  const resourcesSection = document.querySelector('#recovery-resources-section');
                  if (resourcesSection) {
                    resourcesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Heart className="w-6 h-6 mr-3" />
                Explore Resources
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Comprehensive Emergency Resources */}
      <section id="emergency-section" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--destructive)/0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <Phone className="w-20 h-20 text-destructive mx-auto animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-r from-destructive/30 to-destructive/10 rounded-full blur-2xl"></div>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-destructive via-destructive/80 to-destructive/60 bg-clip-text text-transparent mb-6">
              Emergency & Crisis Support
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Immediate, professional help is available 24/7. You're not alone in your crisis.
            </p>
            <div className="mt-8 p-6 bg-destructive/10 border-l-4 border-destructive rounded-lg max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-destructive mb-2">Crisis Warning Signs:</p>
              <p className="text-muted-foreground">Thoughts of self-harm, substance overdose, severe withdrawal, or mental health emergency</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {emergencyResources.map((resource, index) => (
              <Card key={index} className="group p-8 border-l-4 border-l-destructive bg-gradient-to-br from-card to-card/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:border-l-destructive/80">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <resource.icon className="w-8 h-8 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-foreground">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{resource.description}</p>
                    <div className="space-y-3">
                      <a 
                        href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                        className="block text-2xl font-bold text-destructive hover:text-destructive/80 transition-colors duration-200"
                      >
                        {resource.phone}
                      </a>
                      <Badge variant="outline" className="border-destructive/20 text-destructive bg-destructive/5">
                        {resource.available}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/emergency">
              <Button className="bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                View All Emergency Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recovery Resources */}
      <section id="recovery-resources-section" className="py-20 relative bg-gradient-to-br from-muted/30 via-muted/10 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-donate bg-clip-text text-transparent mb-6">
              Recovery Support Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Find the support and tools you need for every stage of recovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recoveryResources.map((resource, index) => (
              <Card key={index} className="group p-8 bg-gradient-to-br from-card via-card/95 to-card/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1 border-primary/10">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">{resource.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{resource.description}</p>
                </div>
                <div className="space-y-3 mb-6">
                  {resource.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs mr-2 mb-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-200">
                      {topic}
                    </Badge>
                  ))}
                </div>
                {resource.title === "Treatment Centers" ? (
                  <Link to="/treatment-centers">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                      Find Treatment Centers
                    </Button>
                  </Link>
                ) : resource.title === "Support Groups" ? (
                  <Link to="/support-groups">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                      Find Support Groups
                    </Button>
                  </Link>
                ) : resource.title === "Family Support" ? (
                  <Link to="/family-support">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                      Family Support Resources
                    </Button>
                  </Link>
                ) : resource.title === "Recovery Tools" ? (
                  <Link to="/recovery-tools">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                      Recovery Tools & Apps
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                    Explore Resources
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
              Educational Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Knowledge is power. Learn about addiction, recovery, and wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {educationalResources.map((resource, index) => (
              <Card key={index} className="group p-8 bg-gradient-to-br from-card to-card/80 hover:shadow-2xl hover:scale-105 transition-all duration-500 border-accent/20">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-foreground">{resource.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{resource.description}</p>
                    <Link to={resource.link}>
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Learn More
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button variant="outline" className="px-8 py-3 text-lg font-semibold border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Visit Our Blog for More Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 relative bg-gradient-to-br from-muted/20 via-primary/5 to-donate/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_50%)] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--donate)/0.1),transparent_50%)] opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <div className="relative inline-block mb-8">
              <Heart className="w-20 h-20 text-primary mx-auto animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-donate/20 rounded-full blur-2xl opacity-50"></div>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-donate to-primary/80 bg-clip-text text-transparent mb-8">
              Changing the Global Conversation
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
              Genius Recovery was born out of a mission to change the way the world understands and supports 
              addiction recovery. We believe in transforming the conversation from one of judgment to one of 
              compassion, providing hope and healing to those who need it most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-foreground">Compassionate Care</h3>
              <p className="text-muted-foreground leading-relaxed">
                Moving beyond judgment to offer understanding and support
              </p>
            </div>
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-donate/30 to-donate/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-donate" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-foreground">Community Connection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building networks of support and shared experiences
              </p>
            </div>
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-donate/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-foreground">Safe Spaces</h3>
              <p className="text-muted-foreground leading-relaxed">
                Creating environments where healing can truly begin
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/donation">
              <Button className="bg-gradient-to-r from-primary to-donate hover:from-primary/90 hover:to-donate/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Support Our Mission
              </Button>
            </Link>
            <Link to="/emergency">
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300">
                Get Help Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;