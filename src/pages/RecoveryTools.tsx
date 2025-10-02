import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Brain, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Phone, 
  ExternalLink, 
  Clock, 
  Shield, 
  Users, 
  CheckCircle, 
  ShoppingCart,
  Download,
  Target,
  Zap,
  Timer,
  Activity,
  Smartphone,
  Globe,
  PenTool
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SectionNavigation from "@/components/SectionNavigation";

const RecoveryTools = () => {
  useEffect(() => {
    document.title = "Recovery Tools & Resources | Digital Support for Your Journey | Genius Recovery";
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Recovery Tools & Resources",
    "description": "Digital tools, apps, and resources to support your recovery journey including sobriety trackers, meditation apps, and recovery workbooks",
    "url": "https://geniusrecovery.org/recovery-tools",
    "sameAs": [
      "https://www.facebook.com/geniusrecovery",
      "https://www.instagram.com/geniusrecovery"
    ]
  };

  const digitalTools = [
    {
      title: "Quit Now - Stop Smoking",
      description: "Track your sobriety from any addiction with detailed statistics and savings calculator",
      icon: Calendar,
      platform: "iOS & Android",
      cost: "Free with Premium",
      features: ["Day counter", "Money saved tracker", "Health improvements", "Achievement system"],
      category: "Tracking",
      iosLink: "https://apps.apple.com/app/quit-now/id483994930",
      androidLink: "https://play.google.com/store/apps/details?id=com.EAGINsoftware.dejaloYa&hl=en_US&pli=1"
    },
    {
      title: "Ten Percent Happier",
      description: "Meditation app designed for skeptics with practical mindfulness courses",
      icon: Brain,
      platform: "iOS & Android", 
      cost: "Free with Premium",
      features: ["Guided meditations", "Sleep content", "Anxiety courses", "Expert teachers"],
      category: "Mental Health",
      iosLink: "https://apps.apple.com/app/ten-percent-happier/id992210239",
      androidLink: "https://play.google.com/store/apps/details?id=com.changecollective.tenpercenthappier"
    },
    {
      title: "SMART Recovery Toolbox",
      description: "Evidence-based tools for motivation, coping with urges, and managing thoughts",
      icon: Target,
      platform: "Web & Mobile",
      cost: "Free",
      features: ["SMART tools", "Change plan worksheet", "Cost-benefit analysis", "Meeting finder"],
      category: "Recovery Support",
      iosLink: "https://www.smartrecovery.org/smart-recovery-toolbox/",
      androidLink: "https://www.smartrecovery.org/smart-recovery-toolbox/"
    },
    {
      title: "Insight Timer",
      description: "Free meditation app with thousands of guided sessions for stress and anxiety",
      icon: Clock,
      platform: "iOS & Android",
      cost: "Free with Premium",
      features: ["Free meditations", "Timer with bells", "Community features", "Sleep content"],
      category: "Mental Health",
      iosLink: "https://apps.apple.com/app/insight-timer/id337472899",
      androidLink: "https://play.google.com/store/apps/details?id=com.spotlightsix.zentimerlite2"
    },
    {
      title: "Nomo - Sobriety Clocks",
      description: "Beautiful sobriety counter with multiple addiction tracking",
      icon: Heart,
      platform: "iOS & Android",
      cost: "Free with Premium",
      features: ["Multiple counters", "Motivational quotes", "Milestone celebrations", "Progress widgets"],
      category: "Recovery Support",
      iosLink: "https://apps.apple.com/app/nomo-sobriety-clocks/id1362617749",
      androidLink: "https://play.google.com/store/apps/details?id=com.wunderbucket.nomo"
    },
    {
      title: "Calm - Meditation & Sleep",
      description: "Popular meditation app with anxiety and stress management tools",
      icon: Activity,
      platform: "iOS & Android",
      cost: "Free with Premium",
      features: ["Guided meditations", "Sleep stories", "Anxiety programs", "Daily mindfulness"],
      category: "Mental Health",
      iosLink: "https://apps.apple.com/app/calm/id571800810",
      androidLink: "https://play.google.com/store/apps/details?id=com.calm.android"
    }
  ];

  const workbooksAndResources = [
    {
      title: "The Big Book (AA)",
      description: "The foundational text of Alcoholics Anonymous, available in digital format",
      icon: BookOpen,
      downloadLink: "https://wagga.aagroup.org.au/wp-content/uploads/2016/02/AA-Big-Book-4th-edition.pdf",
      type: "PDF/eBook",
      topics: ["12 Steps", "Personal stories", "Recovery principles", "Spiritual awakening"]
    },
    {
      title: "SMART Recovery Handbook",
      description: "Comprehensive guide to SMART Recovery tools and techniques",
      icon: Target,
      downloadLink: "https://smartrecovery.org/handbooks",
      type: "PDF/Print",
      topics: ["Motivation building", "Urge management", "Rational thinking", "Balanced living"]
    },
    {
      title: "Recovery Workbook Collection",
      description: "Printable worksheets for tracking progress and building coping skills",
      icon: PenTool,
      downloadLink: "https://cpr.bu.edu/store/the-recovery-workbook/",
      type: "PDF Worksheets",
      topics: ["Trigger identification", "Coping strategies", "Goal setting", "Daily reflections"]
    },
    {
      title: "Mindfulness in Recovery Guide",
      description: "Evidence-based mindfulness practices for addiction recovery",
      icon: Brain,
      downloadLink: "/resources", // Internal link to resources page
      type: "PDF Guide",
      topics: ["Meditation techniques", "Mindful awareness", "Stress reduction", "Emotional regulation"]
    }
  ];

  const emergencyResources = [
    {
      title: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "24/7 treatment referral and information service",
      availability: "24/7"
    },
    {
      title: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text message",
      availability: "24/7"
    },
    {
      title: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "Crisis support for anyone contemplating suicide",
      availability: "24/7"
    }
  ];

  const onlineSupport = [
    {
      title: "AA Online Meetings",
      description: "Virtual Alcoholics Anonymous meetings available 24/7",
      icon: Users,
      platform: "Web-based",
      link: "https://aa-intergroup.org/",
      features: ["Live meetings", "Chat support", "Speaker meetings", "Multiple languages"]
    },
    {
      title: "NA Virtual Meetings",
      description: "Online Narcotics Anonymous meetings and community support",
      icon: MessageCircle,
      platform: "Web-based", 
      link: "https://virtual-na.org/",
      features: ["Daily meetings", "Step study", "Literature discussion", "Newcomer focused"]
    },
    {
      title: "SMART Recovery Online",
      description: "Science-based recovery meetings and tools online",
      icon: Brain,
      platform: "Web-based",
      link: "https://meetings.smartrecovery.org/",
      features: ["Interactive tools", "Facilitator-led", "Evidence-based", "Flexible approach"]
    },
    {
      title: "Recovery Community Forums",
      description: "Peer support through online forums and discussion groups",
      icon: Globe,
      platform: "Web-based",
      link: "https://www.reddit.com/r/recovery/",
      features: ["24/7 access", "Anonymous posting", "Moderated discussions", "Resource sharing"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Recovery Tools & Resources | Digital Support for Your Journey | Genius Recovery"
        description="Discover essential recovery tools including sobriety tracking apps, meditation resources, recovery workbooks, and online support communities to strengthen your recovery journey."
        keywords="recovery tools, sobriety apps, recovery workbooks, meditation apps, online support groups, digital recovery resources, addiction recovery tools"
        structuredData={structuredData}
      />
      <Header />
      
      <SectionNavigation />
      
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="relative inline-block mb-8">
              <Smartphone className="w-20 h-20 text-primary mx-auto" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl opacity-50"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6 animate-fade-in">
              Recovery Tools & Apps
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Empower your recovery journey with digital tools, workbooks, and resources designed 
              to support you every step of the way. From sobriety tracking to meditation apps.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Apps
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <BookOpen className="w-4 h-4 mr-2" />
                Digital Workbooks
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <Globe className="w-4 h-4 mr-2" />
                Online Support
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section id="emergency-support" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent mb-6">
              Emergency Support
            </h2>
            <p className="text-xl text-muted-foreground">
              Immediate help when you need it most
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {emergencyResources.map((resource, index) => (
              <Card key={index} className="group p-8 border-l-4 border-l-destructive bg-gradient-to-br from-card to-card/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{resource.description}</p>
                  <a 
                    href={resource.phone.includes('Text') ? undefined : `tel:${resource.phone.replace(/[^0-9]/g, '')}`}
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

      {/* Digital Tools Section */}
      <section id="digital-tools" className="py-20 relative bg-gradient-to-br from-muted/30 via-muted/10 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6">
              Digital Recovery Tools
            </h2>
            <p className="text-xl text-muted-foreground">
              Mobile apps and digital tools to support your daily recovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {digitalTools.map((tool, index) => (
              <Card key={index} className="group p-8 bg-gradient-to-br from-card via-card/95 to-card/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-primary/10">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <tool.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-foreground">{tool.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{tool.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-foreground">Platform:</span>
                      <p className="text-muted-foreground">{tool.platform}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Cost:</span>
                      <p className="text-muted-foreground">{tool.cost}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {tool.category}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <span className="font-semibold text-foreground text-sm">Key Features:</span>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-200">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <a href={tool.iosLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      iOS
                    </Button>
                  </a>
                  <a href={tool.androidLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Android
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workbooks and Resources */}
      <section id="workbooks" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
              Recovery Workbooks & Guides
            </h2>
            <p className="text-xl text-muted-foreground">
              Downloadable resources for deeper recovery work and self-reflection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workbooksAndResources.map((resource, index) => (
              <Card key={index} className="group p-8 bg-gradient-to-br from-card to-card/80 hover:shadow-2xl hover:scale-105 transition-all duration-500 border-accent/20">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <resource.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-foreground">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{resource.description}</p>
                    
                    <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
                      {resource.type}
                    </Badge>
                    
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

                    <a href={resource.downloadLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        {(resource.title === "SMART Recovery Handbook" || resource.title === "Recovery Workbook Collection") ? "View Resource" : "Download Resource"}
                        {(resource.title === "SMART Recovery Handbook" || resource.title === "Recovery Workbook Collection") ? (
                          <ShoppingCart className="w-5 h-5 ml-2" />
                        ) : (
                          <Download className="w-5 h-5 ml-2" />
                        )}
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Online Support Communities */}
      <section id="online-support" className="py-20 relative bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent mb-6">
              Online Support Communities
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect with others in recovery through virtual meetings and forums
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {onlineSupport.map((support, index) => (
              <Card key={index} className="group p-8 bg-gradient-to-br from-card via-card/95 to-card/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-primary/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <support.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-foreground">{support.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{support.description}</p>
                    
                    <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                      {support.platform}
                    </Badge>
                    
                    <div className="space-y-3 mb-6">
                      <span className="font-semibold text-foreground text-sm">Features:</span>
                      <div className="flex flex-wrap gap-2">
                        {support.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-200">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <a href={support.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                        Join Community
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

      {/* Call to Action */}
      <section className="py-24 relative bg-gradient-to-br from-primary/10 via-background to-muted/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_50%)] opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <div className="relative inline-block mb-8">
              <Heart className="w-20 h-20 text-primary mx-auto animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl opacity-50"></div>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-8">
              Your Recovery Toolkit Awaits
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
              Recovery is a journey that benefits from the right tools and support. Whether you're just 
              starting or strengthening your recovery, these resources are here to support you every step of the way.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/support">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Find Support Groups
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-xl transition-all duration-300">
                Get Personal Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RecoveryTools;