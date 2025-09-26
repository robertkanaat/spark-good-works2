
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Clock, 
  Star, 
  DollarSign,
  Users, 
  Target, 
  BookOpen,
  Palette,
  Megaphone,
  Code,
  PenTool,
  Briefcase,
  Gift,
  ArrowDown,
  Sparkles,
  HandHeart
} from "lucide-react";

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const Donors = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Genius Recovery",
    "description": "Non-profit organization dedicated to addiction recovery support with transparent donor recognition and impact reporting.",
    "url": "https://geniusrecovery.org/donors"
  };

  const waysToDonate = [
    {
      icon: Clock,
      title: "Give Your Time",
      quote: "The simplest gift is often the most profound. Your time has the power to lift spirits and inspire change.",
      items: [
        "Share your recovery story: Share your experience, strength, and hope so those who are struggling can see that someone like them found a way out of the darkness.",
        "Share your caregiver story: You have supported a loved one through the roller coaster of addiction recovery. Your story will inspire other caregivers on their support journey.",
        "Share expert content: There are many factors to support achievement of long-term recovery, including nutrition, exercise, breathwork, yoga, meditation, journaling, and so many more tools!"
      ],
      buttonText: "Become a Volunteer",
      variant: "secondary",
      iconBg: "bg-secondary/20",
      iconColor: "text-secondary-foreground",
      bulletColor: "bg-secondary"
    },
    {
      icon: Sparkles,
      title: "Share Your Talent",
      quote: "Your unique skills are a gift. Contribute your talents to make recovery accessible and relatable.",
      items: [
        "Professional Skills: Lend your expertise in areas such as counseling, writing, marketing, graphic design, or IT to help Genius Recovery expand its reach and impact.",
        "Creative Contributions: If you're an artist, musician, or content creator, help us share stories of hope and recovery through your craft.",
        "Advocacy Work: Join our team in advocating for policy changes that increase access to treatment and support services. Your voice matters!"
      ],
      buttonText: "Share Your Talent",
      variant: "outline",
      iconBg: "bg-accent/30",
      iconColor: "text-accent-foreground",
      bulletColor: "bg-accent-foreground"
    },
    {
      icon: HandHeart,
      title: "Donate Today",
      quote: "Every dollar given is a step toward a world where no one struggles with addiction alone.",
      items: [
        "One-Time Donation: Make an immediate impact with a single donation.",
        "Monthly Giving: Become a sustaining donor to provide ongoing support that ensures we can meet critical needs every month.",
        "Fund a Program: Choose a specific initiative that resonates with you, like education, community outreach, or recovery mentorship programs."
      ],
      buttonText: "Donate Now",
      variant: "donate",
      iconBg: "bg-donate/20",
      iconColor: "text-donate",
      bulletColor: "bg-donate"
    }
  ];

  const talentCategories = [
    {
      icon: PenTool,
      title: "Writing & Content",
      description: "Help create compelling stories and educational content"
    },
    {
      icon: Palette,
      title: "Creative Arts",
      description: "Design, music, video, and artistic contributions"
    },
    {
      icon: Code,
      title: "Technology",
      description: "Web development, IT support, and digital solutions"
    },
    {
      icon: Briefcase,
      title: "Professional Services",
      description: "Counseling, marketing, legal, and business expertise"
    },
    {
      icon: Megaphone,
      title: "Advocacy",
      description: "Policy work, public speaking, and community outreach"
    },
    {
      icon: BookOpen,
      title: "Education",
      description: "Training, workshops, and educational program development"
    }
  ];

  const impactStories = [
    {
      name: "Rachel's Path to Freedom",
      story: "After years of battling addiction, Rachel found that she needed education, tools, encouragement, and a supportive community. Today, she is not only thriving in recovery, but is also volunteering as a mentor and sponsor, guiding others on their recovery journey.",
      icon: Heart
    },
    {
      name: "Mark's Journey to Advocacy",
      story: "After losing a loved one to addiction, Mark sought purpose in advocacy. He connected with local and regional groups to bring more awareness to communities and legislators about addiction and how harm reduction and de-stigmatization can save lives. He is creating lasting changes so other people won't have to suffer the pain of losing a loved one to overdose.",
      icon: Megaphone
    }
  ];

  const impactAreas = [
    {
      icon: Target,
      title: "Provide Resources",
      description: "Fund programs and materials that give individuals a foundation for lasting recovery."
    },
    {
      icon: BookOpen,
      title: "Expand Education", 
      description: "Spread awareness about addiction and its treatment to combat stigma and misunderstanding."
    },
    {
      icon: Megaphone,
      title: "Advocate for Change",
      description: "Work toward policies and resources that make treatment accessible to everyone in need."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Donor Recognition & Transparency | Genius Recovery"
        description="Transparent donor recognition and impact reporting. See how your donations support addiction recovery programs and help save lives. Join our mission today."
        keywords="donor recognition, donation transparency, nonprofit impact, addiction recovery donations, charitable giving"
        structuredData={structuredData}
        canonicalUrl="https://geniusrecovery.org/donors"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-subtle)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,hsl(var(--primary))_0%,transparent_50%)] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--gradient-primary)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-6 text-sm px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Your Support Changes Lives
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Be Part of the{" "}
              <span className="text-primary">Solution</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
              When you join Genius Recovery as a donor, you're not just giving resources—you're giving hope, support, and a path to recovery. 
              Every contribution you make, whether through <span className="text-primary font-semibold">time</span>, 
              <span className="text-secondary-foreground font-semibold"> talent</span>, or 
              <span className="text-donate font-semibold"> treasure</span>, fuels real, lasting change in the lives of those affected by addiction.
            </p>
            
            <p className="text-2xl font-semibold text-foreground mb-12">
              Together, we can build a future where every person struggling with addiction has the support they need to recover, reconnect, and thrive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 h-auto animate-fade-in hover-scale"
                onClick={() => scrollToSection('ways-to-help')}
              >
                <Heart className="w-5 h-5 mr-2" />
                Start Giving Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto animate-fade-in hover-scale"
                onClick={() => scrollToSection('impact-stories')}
              >
                <Users className="w-5 h-5 mr-2" />
                See Our Impact
              </Button>
            </div>
            
            {/* Scroll indicator */}
            <div className="mt-12 animate-fade-in">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('ways-to-help')}
                className="animate-pulse hover-scale"
              >
                <ArrowDown className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How You Can Make a Difference */}
      <section id="ways-to-help" className="relative py-24 overflow-hidden bg-muted/30">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-donate/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,hsl(var(--primary))_0%,transparent_50%)] opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-donate/15 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full border border-primary/30 shadow-[var(--shadow-elegant)]">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                  Three Ways to Help
                </span>
              </div>
            </div>
            
            {/* Main Headline */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight animate-fade-in">
              How You Can Make a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-secondary-foreground">
                Difference
              </span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-foreground/90 leading-relaxed max-w-4xl mx-auto animate-fade-in font-medium">
              Choose the way that resonates most with you—every contribution matters and creates real impact.
            </p>
          </div>
          
          <div className="space-y-20">
            {waysToDonate.map((way, index) => {
              const getButtonAction = (title: string) => {
                if (title.includes('Time')) return '/volunteer';
                if (title.includes('Talent')) return () => scrollToSection('talent-areas');
                if (title.includes('Donate')) return '/donation';
                return () => {};
              };

              const isFunction = typeof getButtonAction(way.title) === 'function';

              return (
                <div key={index} className={`group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="flex items-center gap-6 mb-8">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center hover-scale hover-glow transition-all duration-500 ${way.iconBg} backdrop-blur-sm border border-border/50`}>
                        <way.icon className={`w-10 h-10 ${way.iconColor}`} />
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground">{way.title}</h3>
                    </div>
                    
                    <blockquote className="text-lg text-muted-foreground italic mb-8 border-l-4 border-primary pl-6 bg-[var(--gradient-card)] p-6 rounded-r-lg backdrop-blur-sm">
                      "{way.quote}"
                    </blockquote>
                    
                    <ul className="space-y-6 mb-10">
                      {way.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-4 animate-fade-in hover-scale" style={{ animationDelay: `${(index * 0.2) + (itemIndex * 0.1)}s` }}>
                          <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${way.bulletColor} shadow-lg`}></div>
                          <span className="text-muted-foreground leading-relaxed text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {isFunction ? (
                      <Button 
                        size="lg" 
                        variant={way.variant as any}
                        className="text-lg px-8 py-6 h-auto hover-scale hover-glow transition-all duration-300 w-full lg:w-auto shadow-lg"
                        onClick={getButtonAction(way.title) as () => void}
                      >
                        <way.icon className="w-5 h-5 mr-2" />
                        {way.buttonText}
                      </Button>
                    ) : (
                      <Link to={getButtonAction(way.title) as string}>
                        <Button 
                          size="lg" 
                          variant={way.variant as any}
                          className="text-lg px-8 py-6 h-auto hover-scale hover-glow transition-all duration-300 w-full lg:w-auto shadow-lg"
                        >
                          <way.icon className="w-5 h-5 mr-2" />
                          {way.buttonText}
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} animate-fade-in`} style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                    <Card className="group-hover:shadow-[var(--shadow-elegant)] transition-all duration-700 hover:-translate-y-3 bg-[var(--gradient-card)] backdrop-blur-sm border-border/50">
                      <CardContent className="p-8">
                        <div className="grid grid-cols-2 gap-6">
                          {talentCategories.slice(index * 2, (index * 2) + 2).map((category, catIndex) => (
                            <div key={catIndex} className="text-center p-6 rounded-xl bg-background/60 hover:bg-background/90 transition-all duration-300 hover-scale hover-glow border border-border/30">
                              <category.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                              <h4 className="font-semibold text-sm mb-3 text-foreground">{category.title}</h4>
                              <p className="text-xs text-muted-foreground leading-relaxed">{category.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Stories of Hope */}
      <section id="impact-stories" className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-donate/10 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                Impact Stories
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight animate-fade-in">
              Real Stories of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-secondary-foreground">
                Hope and Recovery
              </span>
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4 animate-fade-in">The Impact of Your Support</h3>
            <p className="text-xl text-foreground/90 leading-relaxed max-w-4xl mx-auto animate-fade-in">
              Your generosity directly impacts the lives of those struggling with addiction and their families. 
              Here are some of the lives transformed through your support.
            </p>
          </div>
          
          <div className="space-y-16">
            {impactStories.map((story, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''} animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Story Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-donate/10 rounded-2xl p-8 border border-primary/20 group hover:shadow-[var(--shadow-elegant)] transition-all duration-700">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0 hover-scale hover-glow group-hover:bg-primary/30 transition-all duration-300">
                        <story.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold text-foreground">{story.name}</h4>
                    </div>
                    <p className="text-foreground/90 leading-relaxed text-lg mb-6">{story.story}</p>
                    
                    {/* Impact Stats for this story */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary/20">
                      <div className="text-center p-4 bg-background/50 rounded-xl">
                        <div className="text-2xl font-black text-primary mb-1">
                          {index === 0 ? "5+" : "100+"}
                        </div>
                        <div className="text-sm text-foreground/70 font-medium">
                          {index === 0 ? "Years in Recovery" : "Lives Touched"}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-background/50 rounded-xl">
                        <div className="text-2xl font-black text-primary mb-1">
                          {index === 0 ? "25+" : "12"}
                        </div>
                        <div className="text-sm text-foreground/70 font-medium">
                          {index === 0 ? "People Mentored" : "Policy Changes"}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <div className="relative p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/20">
                    <div className="absolute -top-3 left-6">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-bold">"</span>
                      </div>
                    </div>
                    <blockquote className="text-lg italic text-foreground/90 leading-relaxed mb-3">
                      {index === 0 
                        ? "Recovery isn't just about getting clean—it's about discovering who you're meant to be and helping others find their path too."
                        : "Every life lost to overdose represents a failure of our system. We must create a world where compassion comes before judgment."
                      }
                    </blockquote>
                    <cite className="text-primary font-semibold">— {story.name.split("'s")[0]}</cite>
                  </div>
                </div>
                
                {/* Visual Element / Stats */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/20 hover:shadow-[var(--shadow-elegant)] transition-all duration-700">
                    <h5 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                      <Heart className="w-6 h-6 text-primary" />
                      {index === 0 ? "Recovery Milestones" : "Advocacy Impact"}
                    </h5>
                    
                    <div className="space-y-4">
                      {index === 0 ? (
                        <>
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-donate/10 rounded-lg">
                            <span className="text-foreground/80">Completed Treatment</span>
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-donate/10 rounded-lg">
                            <span className="text-foreground/80">Became a Sponsor</span>
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-donate/10 rounded-lg">
                            <span className="text-foreground/80">Started Mentoring</span>
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-donate/10 rounded-lg">
                            <span className="text-foreground/80">Community Leader</span>
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-donate/10 rounded-lg">
                            <span className="text-foreground/80">Harm Reduction Programs</span>
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-donate/10 rounded-lg">
                            <span className="text-foreground/80">Treatment Access Laws</span>
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-donate/10 rounded-lg">
                            <span className="text-foreground/80">Stigma Reduction</span>
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-donate/10 rounded-lg">
                            <span className="text-foreground/80">Family Support</span>
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Mission Alignment */}
                  <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-donate/10 rounded-2xl p-6 border border-primary/20">
                    <h6 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Your Support Made This Possible
                    </h6>
                    <p className="text-foreground/90 leading-relaxed text-sm">
                      {index === 0 
                        ? "Through donations to recovery programs and mentorship initiatives, supporters like you provided Rachel with the tools, community, and hope she needed to transform her life."
                        : "Your contributions to advocacy programs and policy work enabled Mark to channel his grief into meaningful change that prevents other families from experiencing similar loss."
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Overall Impact Summary */}
          <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-donate/10 rounded-2xl p-8 border border-primary/20">
              <h4 className="text-2xl font-bold text-foreground mb-6">Your Collective Impact</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-primary mb-2">500+</div>
                  <div className="text-sm text-foreground/70 font-medium">Lives Transformed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-primary mb-2">50+</div>
                  <div className="text-sm text-foreground/70 font-medium">Families Reunited</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-primary mb-2">25</div>
                  <div className="text-sm text-foreground/70 font-medium">Policy Changes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-primary mb-2">1M+</div>
                  <div className="text-sm text-foreground/70 font-medium">People Reached</div>
                </div>
              </div>
              <p className="text-lg text-primary font-semibold mt-6">
                Every dollar donated creates ripples of hope that extend far beyond what we can measure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Your Contribution Matters */}
      <section className="relative py-24 overflow-hidden bg-muted/30">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-primary/5 to-muted/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-donate/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                Your Impact
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight animate-fade-in">
              Why Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-secondary-foreground">
                Contribution Matters
              </span>
            </h2>
            
            <p className="text-xl text-foreground/90 leading-relaxed max-w-3xl mx-auto animate-fade-in">
              Addiction affects more than just individuals—it impacts families, communities, and society. With your help, we can:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {impactAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-700 hover:-translate-y-3 animate-fade-in bg-[var(--gradient-card)] backdrop-blur-sm border-border/50" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale hover-glow group-hover:bg-primary/30 transition-all duration-300">
                    <area.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center animate-fade-in">
            <p className="text-2xl font-semibold text-primary mb-8">
              Your support is more than a donation; it's an investment in lives, hope, and healing.
            </p>
          </div>
        </div>
      </section>

      {/* Talent Areas Section */}
      <section id="talent-areas" className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-donate/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20 mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                Talent Categories
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight animate-fade-in">
              Ways to Share Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-foreground via-primary to-donate">
                Talent
              </span>
            </h2>
            
            <p className="text-xl text-foreground/90 leading-relaxed max-w-3xl mx-auto animate-fade-in">
              Your unique skills and expertise can make a real difference in our mission to support recovery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {talentCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-700 hover:-translate-y-3 animate-fade-in bg-[var(--gradient-card)] backdrop-blur-sm border-border/50" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale hover-glow group-hover:bg-primary/30 transition-all duration-300">
                    <category.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{category.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{category.description}</p>
                  <Link to="/volunteer">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover-scale hover-glow transition-all duration-300 w-full"
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      Get Involved
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Signup Section */}
      <section id="volunteer-signup" className="relative py-24 overflow-hidden bg-muted/30">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-donate/5 to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_70%)] opacity-15"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-donate/20 rounded-full blur-3xl animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000 opacity-50" />
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--gradient-primary)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--gradient-primary)]"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full border border-primary/30 shadow-[var(--shadow-elegant)]">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground font-bold tracking-wider uppercase text-sm">
                  Join Our Mission
                </span>
              </div>
            </div>
            
            {/* Main Headline */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight">
              Ready to Make a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-secondary-foreground animate-gradient-slide bg-300% bg-left">
                Difference?
              </span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-foreground/90 mb-12 leading-relaxed font-medium max-w-4xl mx-auto">
              Join our community of volunteers and start making an impact today. Every action creates ripples of hope.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/volunteer" className="group">
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-8 h-auto hover-scale w-full sm:w-auto shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] relative overflow-hidden"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <Users className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  <span className="relative flex flex-col items-start">
                    <span className="font-bold">Become a Volunteer</span>
                    <span className="text-sm opacity-90">Share your story & time</span>
                  </span>
                </Button>
              </Link>
              
              <Link to="/contact" className="group">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-xl px-12 py-8 h-auto hover-scale w-full sm:w-auto border-2 border-primary/40 bg-white/10 backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-all duration-500 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                >
                  <Megaphone className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  <span className="flex flex-col items-start">
                    <span className="font-bold">Contact Us</span>
                    <span className="text-sm opacity-70">Let's discuss your ideas</span>
                  </span>
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-primary/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">500+ Lives Transformed</h4>
                <p className="text-sm text-foreground/70 text-center">Through volunteer support and mentorship</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-primary/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-donate/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-donate" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Growing Community</h4>
                <p className="text-sm text-foreground/70 text-center">Join hundreds of dedicated volunteers</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-primary/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Meaningful Impact</h4>
                <p className="text-sm text-foreground/70 text-center">Every contribution creates lasting change</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_70%)] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--gradient-primary)]"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 animate-fade-in text-foreground leading-tight">
            Thank you for helping us create a world where recovery and hope are possible for everyone.
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 h-auto hover-scale hover-glow animate-fade-in transition-all duration-300 group"
              onClick={() => scrollToSection('volunteer-signup')}
              style={{ animationDelay: '0.1s' }}
            >
              <Clock className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              <span className="flex flex-col items-start">
                <span className="font-semibold">Donate Your Time</span>
                <span className="text-sm opacity-70">Share your story</span>
              </span>
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 h-auto hover-scale hover-glow animate-fade-in transition-all duration-300 group"
              onClick={() => scrollToSection('talent-areas')}
              style={{ animationDelay: '0.2s' }}
            >
              <Sparkles className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              <span className="flex flex-col items-start">
                <span className="font-semibold">Give Your Talent</span>
                <span className="text-sm opacity-70">Use your skills</span>
              </span>
            </Button>
            <Link to="/donation" className="w-full">
              <Button 
                size="lg" 
                variant="donate"
                className="text-lg px-8 py-6 h-auto w-full hover-scale hover-glow animate-fade-in transition-all duration-300 group"
                style={{ animationDelay: '0.3s' }}
              >
                <HandHeart className="w-6 h-6 mr-3 group-hover:animate-heartbeat" />
                <span className="flex flex-col items-start">
                  <span className="font-semibold">Donate Now</span>
                  <span className="text-sm opacity-70">Make an impact</span>
                </span>
              </Button>
            </Link>
          </div>
          
          <p className="mt-12 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Every action you take creates ripples of hope in someone's recovery journey.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donors;