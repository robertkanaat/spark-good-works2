import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  Gift
} from "lucide-react";

const Donors = () => {
  useEffect(() => {
    document.title = "Donors - Be Part of the Solution | Genius Recovery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join Genius Recovery as a donor and be part of the solution. Give your time, talent, or treasure to help those struggling with addiction find hope and recovery.');
    }

    // Add canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', window.location.origin + '/donors');
    } else {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = window.location.origin + '/donors';
      document.head.appendChild(canonical);
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Donors - Be Part of the Solution",
      "description": "Join Genius Recovery as a donor and be part of the solution. Give your time, talent, or treasure to help those struggling with addiction find hope and recovery.",
      "url": window.location.origin + '/donors',
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
      color: "blue"
    },
    {
      icon: Star,
      title: "Share Your Talent",
      quote: "Your unique skills are a gift. Contribute your talents to make recovery accessible and relatable.",
      items: [
        "Professional Skills: Lend your expertise in areas such as counseling, writing, marketing, graphic design, or IT to help Genius Recovery expand its reach and impact.",
        "Creative Contributions: If you're an artist, musician, or content creator, help us share stories of hope and recovery through your craft.",
        "Advocacy Work: Join our team in advocating for policy changes that increase access to treatment and support services. Your voice matters!"
      ],
      buttonText: "Get Involved",
      color: "purple"
    },
    {
      icon: Gift,
      title: "Donate Your Treasures",
      quote: "Every dollar given is a step toward a world where no one struggles with addiction alone.",
      items: [
        "One-Time Donation: Make an immediate impact with a single donation.",
        "Monthly Giving: Become a sustaining donor to provide ongoing support that ensures we can meet critical needs every month.",
        "Fund a Program: Choose a specific initiative that resonates with you, like education, community outreach, or recovery mentorship programs."
      ],
      buttonText: "Donate Now",
      color: "green"
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
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-background to-primary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,hsl(var(--primary))_0%,transparent_50%)] opacity-15"></div>
        
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
              <span className="text-purple-600 font-semibold"> talent</span>, or 
              <span className="text-green-600 font-semibold"> treasure</span>, fuels real, lasting change in the lives of those affected by addiction.
            </p>
            
            <p className="text-2xl font-semibold text-foreground mb-12">
              Together, we can build a future where every person struggling with addiction has the support they need to recover, reconnect, and thrive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
                <Heart className="w-5 h-5 mr-2" />
                Start Giving Today
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                <Users className="w-5 h-5 mr-2" />
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How You Can Make a Difference */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How You Can Make a Difference
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the way that resonates most with you—every contribution matters and creates real impact.
            </p>
          </div>
          
          <div className="space-y-16">
            {waysToDonate.map((way, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      way.color === 'blue' ? 'bg-blue-500/10' :
                      way.color === 'purple' ? 'bg-purple-500/10' : 'bg-green-500/10'
                    }`}>
                      <way.icon className={`w-8 h-8 ${
                        way.color === 'blue' ? 'text-blue-600' :
                        way.color === 'purple' ? 'text-purple-600' : 'text-green-600'
                      }`} />
                    </div>
                    <h3 className="text-3xl font-bold">{way.title}</h3>
                  </div>
                  
                  <blockquote className="text-lg text-muted-foreground italic mb-8 border-l-4 border-primary pl-6">
                    "{way.quote}"
                  </blockquote>
                  
                  <ul className="space-y-4 mb-8">
                    {way.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          way.color === 'blue' ? 'bg-blue-600' :
                          way.color === 'purple' ? 'bg-purple-600' : 'bg-green-600'
                        }`}></div>
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    size="lg" 
                    className={`${
                      way.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                      way.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                  >
                    {way.buttonText}
                  </Button>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card className="p-8 h-full bg-gradient-to-br from-muted/50 to-background">
                    <div className="grid grid-cols-2 gap-4">
                      {talentCategories.slice(index * 2, (index * 2) + 2).map((category, catIndex) => (
                        <div key={catIndex} className="text-center p-4 rounded-lg bg-background/50">
                          <category.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                          <h4 className="font-semibold text-sm mb-2">{category.title}</h4>
                          <p className="text-xs text-muted-foreground">{category.description}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Stories of Hope */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 italic">
              Real Stories of Hope and Recovery
            </h2>
            <h3 className="text-2xl font-semibold mb-4">The Impact of Your Support</h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Your generosity directly impacts the lives of those struggling with addiction and their families. 
              Here are some of the lives transformed through your support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {impactStories.map((story, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <story.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold">{story.name}</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">{story.story}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Your Contribution Matters */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Your Contribution Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Addiction affects more than just individuals—it impacts families, communities, and society. With your help, we can:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {impactAreas.map((area, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <area.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-semibold text-primary mb-8">
              Your support is more than a donation; it's an investment in lives, hope, and healing.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Thank you for helping us create a world where recovery and hope are possible for everyone.
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button size="lg" variant="outline" className="text-lg px-6 py-4 h-auto">
              <Clock className="w-5 h-5 mr-2" />
              Donate Your Time
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-6 py-4 h-auto">
              <Star className="w-5 h-5 mr-2" />
              Give Your Talent
            </Button>
            <Link to="/donation">
              <Button size="lg" className="text-lg px-6 py-4 h-auto w-full">
                <DollarSign className="w-5 h-5 mr-2" />
                Donate Treasure
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donors;