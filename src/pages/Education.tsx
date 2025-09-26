import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Brain, TrendingUp, Shield, Heart, BookOpen, Users, MessageCircle, Phone, ExternalLink, Clock, CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Education = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Addiction Recovery Education Hub | Evidence-Based Learning | Genius Recovery";
  }, []);

  useEffect(() => {
    // Handle anchor link scrolling
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Genius Recovery Education Hub",
    "description": "Comprehensive educational resources for addiction recovery including understanding addiction science, recovery stages, harm reduction, and mental health support.",
    "url": "https://geniusrecovery.org/education",
    "sameAs": [
      "https://twitter.com/geniusrecovery",
      "https://facebook.com/geniusrecovery"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Evidence-Based Recovery Education",
        "name": "Addiction Recovery Education"
      }
    ],
    "mainEntity": [
      {
        "@type": "HowTo",
        "name": "Understanding Addiction: Science and Psychology",
        "description": "Learn the neurobiological and psychological foundations of addiction to better understand the recovery process.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Brain Chemistry Understanding",
            "text": "Learn how addiction affects neurotransmitters like dopamine, serotonin, and GABA, creating physical dependency patterns."
          },
          {
            "@type": "HowToStep", 
            "name": "Psychological Factors",
            "text": "Understand trauma, mental health conditions, and environmental factors that contribute to addiction development."
          },
          {
            "@type": "HowToStep",
            "name": "Breaking Stigma",
            "text": "Recognize addiction as a medical condition requiring compassionate treatment, not moral failing."
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Navigating Recovery Stages with Confidence",
        "description": "A comprehensive guide through the different phases of addiction recovery from early sobriety to long-term maintenance.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Pre-Contemplation to Action",
            "text": "Navigate the stages of change model: recognizing problems, building motivation, and taking initial action steps."
          },
          {
            "@type": "HowToStep",
            "name": "Early Recovery (0-90 days)",
            "text": "Focus on stabilization, detox support, establishing routines, and building initial coping strategies."
          },
          {
            "@type": "HowToStep", 
            "name": "Sustained Recovery (3 months - 1 year)",
            "text": "Develop deeper recovery skills, address underlying issues, build support networks, and prevent relapse."
          },
          {
            "@type": "HowToStep",
            "name": "Long-term Recovery (1+ years)",
            "text": "Maintain sobriety through continued growth, giving back to others, and creating meaningful life purpose."
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Harm Reduction Strategies for Safety",
        "description": "Practical approaches to reduce risks and promote safety for individuals at any stage of their relationship with substances.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Risk Assessment",
            "text": "Learn to identify high-risk situations, substances, and behaviors to make informed safety decisions."
          },
          {
            "@type": "HowToStep",
            "name": "Safety Planning",
            "text": "Develop personal safety protocols including emergency contacts, safe use practices, and overdose prevention."
          },
          {
            "@type": "HowToStep",
            "name": "Gradual Reduction",
            "text": "Understand techniques for safely reducing substance use when abstinence isn't immediately achievable."
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Addressing Co-Occurring Mental Health Conditions",
        "description": "Comprehensive approach to treating addiction alongside mental health conditions like depression, anxiety, PTSD, and bipolar disorder.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Dual Diagnosis Recognition",
            "text": "Identify signs of co-occurring mental health conditions and understand their relationship with addiction."
          },
          {
            "@type": "HowToStep",
            "name": "Integrated Treatment",
            "text": "Find treatment providers who address both addiction and mental health simultaneously for better outcomes."
          },
          {
            "@type": "HowToStep",
            "name": "Medication Management",
            "text": "Work with healthcare providers to safely manage psychiatric medications during recovery."
          }
        ]
      }
    ]
  };

  
  // Debug log to verify structured data creation
  console.log('Education: Created structured data:', structuredData);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Addiction Recovery Education Hub | Evidence-Based Learning | Genius Recovery"
        description="Comprehensive educational resources for addiction recovery including understanding addiction science, recovery stages, harm reduction, and mental health support. Evidence-based learning for lasting recovery."
        keywords="addiction education, recovery stages, harm reduction, mental health, addiction science, recovery education, substance abuse education"
        structuredData={structuredData}
        canonicalUrl="https://geniusrecovery.org/education"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <BookOpen className="w-20 h-20 text-primary animate-pulse" />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl opacity-50"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent mb-6 animate-fade-in">
              Recovery Education Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Evidence-based education to empower your recovery journey. From understanding addiction science 
              to navigating recovery stages, gain the knowledge you need for lasting wellness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <Brain className="w-4 h-4 mr-2" />
                Evidence-Based
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <Users className="w-4 h-4 mr-2" />
                Expert-Reviewed
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border-primary/20 hover:scale-105 transition-all duration-300">
                <CheckCircle className="w-4 h-4 mr-2" />
                Practical & Actionable
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Addiction Section */}
      <section id="understanding-addiction" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mr-4">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Understanding Addiction
                  </h2>
                  <p className="text-muted-foreground">Science & Psychology Behind Dependency</p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Addiction is a complex brain disorder involving neurochemical changes, genetic predisposition, 
                and environmental factors. Understanding the science helps reduce stigma and guides effective treatment approaches.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Neurobiological Changes</h3>
                    <p className="text-muted-foreground">Learn how addiction alters brain chemistry, affecting reward pathways, decision-making, and impulse control systems.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Psychological Factors</h3>
                    <p className="text-muted-foreground">Understand how trauma, mental health conditions, and coping mechanisms contribute to addiction development.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Breaking Stigma</h3>
                    <p className="text-muted-foreground">Recognize addiction as a medical condition requiring compassionate treatment, not moral judgment.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-primary/20">
              <h3 className="font-bold text-xl mb-6 text-foreground">Key Learning Areas</h3>
              <div className="space-y-4">
                {[
                  { topic: "Dopamine & Reward Pathways", description: "How addiction hijacks natural reward systems" },
                  { topic: "Genetic Predisposition", description: "Understanding hereditary risk factors" },
                  { topic: "Environmental Triggers", description: "Identifying external addiction catalysts" },
                  { topic: "Withdrawal & Tolerance", description: "Physical dependency mechanisms" },
                  { topic: "Co-occurring Conditions", description: "Mental health and addiction connections" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{item.topic}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Recovery Stages Section */}
      <section id="recovery-stages" className="py-20 relative bg-gradient-to-br from-accent/5 to-muted/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mr-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent mb-2">
                  Recovery Stages
                </h2>
                <p className="text-muted-foreground">Navigate Your Journey with Confidence</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Recovery is a journey with distinct phases, each presenting unique challenges and opportunities. 
              Understanding these stages helps set realistic expectations and develop appropriate strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                stage: "Pre-Contemplation to Action",
                timeframe: "Varies",
                focus: "Building Awareness & Motivation",
                description: "Recognizing problems, overcoming denial, and building motivation for change",
                keyActivities: ["Problem recognition", "Motivational interviewing", "Goal setting", "Support system building"],
                color: "red"
              },
              {
                stage: "Early Recovery",
                timeframe: "0-90 days",
                focus: "Stabilization & Foundation",
                description: "Managing withdrawal, establishing routines, and learning basic coping skills",
                keyActivities: ["Medical detox", "Intensive treatment", "Routine building", "Crisis management"],
                color: "blue"
              },
              {
                stage: "Sustained Recovery",
                timeframe: "3 months - 1 year",
                focus: "Skill Building & Growth",
                description: "Developing deeper recovery skills and addressing underlying issues",
                keyActivities: ["Therapy work", "Skill development", "Relationship building", "Lifestyle changes"],
                color: "emerald"
              },
              {
                stage: "Long-term Recovery",
                timeframe: "1+ years",
                focus: "Maintenance & Purpose",
                description: "Maintaining sobriety while building meaningful life and helping others",
                keyActivities: ["Continued growth", "Mentoring others", "Career development", "Life enrichment"],
                color: "purple"
              }
            ].map((stage, index) => (
              <Card key={index} className="group p-6 bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-accent/20">
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    stage.color === 'red' ? 'bg-gradient-to-br from-red-500/20 to-red-500/10' :
                    stage.color === 'blue' ? 'bg-gradient-to-br from-blue-500/20 to-blue-500/10' :
                    stage.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/10' :
                    'bg-gradient-to-br from-purple-500/20 to-purple-500/10'
                  }`}>
                    <Clock className={`w-6 h-6 ${
                      stage.color === 'red' ? 'text-red-500' :
                      stage.color === 'blue' ? 'text-blue-500' :
                      stage.color === 'emerald' ? 'text-emerald-500' :
                      'text-purple-500'
                    }`} />
                  </div>
                  <Badge variant="outline" className={`text-xs mb-2 ${
                    stage.color === 'red' ? 'border-red-500/20 bg-red-500/5' :
                    stage.color === 'blue' ? 'border-blue-500/20 bg-blue-500/5' :
                    stage.color === 'emerald' ? 'border-emerald-500/20 bg-emerald-500/5' :
                    'border-purple-500/20 bg-purple-500/5'
                  }`}>
                    {stage.timeframe}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{stage.stage}</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-3">{stage.focus}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{stage.description}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Activities:</h4>
                  {stage.keyActivities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${
                         stage.color === 'red' ? 'bg-red-500' :
                         stage.color === 'blue' ? 'bg-blue-500' :
                         stage.color === 'emerald' ? 'bg-emerald-500' :
                         'bg-purple-500'
                       }`}></div>
                      <span className="text-xs text-muted-foreground">{activity}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/treatment-centers">
              <Button variant="outline" className="px-8 py-3 text-lg font-semibold border-accent/20 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                Find Treatment Programs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Harm Reduction Section */}
      <section id="harm-reduction" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-destructive/20 order-2 lg:order-1">
              <h3 className="font-bold text-xl mb-6 text-foreground">Harm Reduction Principles</h3>
              <div className="space-y-6">
                {[
                  {
                    principle: "Meet People Where They Are",
                    description: "Provide support without requiring immediate abstinence",
                    icon: Heart
                  },
                  {
                    principle: "Reduce Immediate Risks",
                    description: "Focus on preventing overdose, infection, and other dangers",
                    icon: Shield
                  },
                  {
                    principle: "Respect Individual Choices",
                    description: "Support personal autonomy and decision-making",
                    icon: Users
                  },
                  {
                    principle: "Evidence-Based Approaches",
                    description: "Use proven strategies that save lives and reduce harm",
                    icon: Brain
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{item.principle}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <Link to="/emergency">
                  <Button className="w-full bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-white">
                    Emergency Resources
                    <Phone className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>

            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-2xl flex items-center justify-center mr-4">
                  <Shield className="w-8 h-8 text-destructive" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">
                    Harm Reduction
                  </h2>
                  <p className="text-muted-foreground">Practical Safety Strategies</p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Harm reduction acknowledges that not everyone is ready for abstinence immediately. 
                These evidence-based strategies help reduce risks and keep people alive and healthy 
                while they work toward their recovery goals.
              </p>

              <div className="space-y-6">
                <Card className="p-6 bg-muted/20">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center mt-1">
                      <CheckCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Risk Assessment - How to Do It:</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>Step 1:</strong> Create a "high-risk situations" list (specific people, places, times, emotions)</p>
                        <p><strong>Step 2:</strong> Rate each situation 1-10 for danger level</p>
                        <p><strong>Step 3:</strong> For each high-risk item, write 2-3 specific alternatives or exit strategies</p>
                        <p><strong>Example:</strong> "Friday nights at Jake's house (Risk: 9/10) → Alternative: Movie night at home, gym session, coffee with sober friend"</p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-muted/20">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center mt-1">
                      <CheckCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Safety Planning - Concrete Steps:</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>Emergency Contacts:</strong> Program 3 people you can call 24/7 (with their consent)</p>
                        <p><strong>Overdose Kit:</strong> Keep Naloxone/Narcan accessible + know how to use it</p>
                        <p><strong>Safe Use Rules:</strong> Never use alone, test small amounts first, avoid mixing substances</p>
                        <p><strong>Crisis Plan:</strong> "If I feel like using, I will: 1) Call [name], 2) Go to [safe place], 3) Use [coping skill]"</p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-muted/20">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center mt-1">
                      <CheckCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Gradual Reduction - Practical Techniques:</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>Track & Measure:</strong> Keep a daily log (amount, time, triggers, mood)</p>
                        <p><strong>10% Rule:</strong> Reduce use by 10% each week (e.g., from 10 drinks to 9, then 8, etc.)</p>
                        <p><strong>Time Delays:</strong> Wait 15 minutes before using, gradually increase to 30, 45, 60 minutes</p>
                        <p><strong>Substitute Activities:</strong> Replace 1 use session with exercise, call a friend, or creative activity</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Mental Health Section */}
      <section id="mental-health" className="py-20 relative bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center mr-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-primary to-orange-500 bg-clip-text text-transparent">
                  Mental Health & Recovery
                </h2>
                <p className="text-muted-foreground">Addressing Co-Occurring Conditions</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Over 50% of people with substance use disorders also experience mental health conditions. 
              Integrated treatment addressing both issues simultaneously leads to better outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                condition: "Depression & Anxiety",
                prevalence: "40-60%",
                description: "Common co-occurring conditions that often precede or result from substance use",
                symptoms: ["Persistent sadness", "Excessive worry", "Sleep disturbances", "Loss of interest"],
                treatment: ["Cognitive Behavioral Therapy", "Medication management", "Mindfulness practices", "Support groups"]
              },
              {
                condition: "PTSD & Trauma",
                prevalence: "30-50%",
                description: "Trauma often underlies addiction as people self-medicate to cope with painful memories",
                symptoms: ["Flashbacks", "Avoidance behaviors", "Hypervigilance", "Emotional numbing"],
                treatment: ["EMDR therapy", "Trauma-focused CBT", "Somatic therapies", "Safe environment creation"]
              },
              {
                condition: "Bipolar Disorder",
                prevalence: "20-30%",
                description: "Mood swings can trigger substance use, while substances can worsen mood instability",
                symptoms: ["Manic episodes", "Depressive periods", "Impulsivity", "Sleep pattern changes"],
                treatment: ["Mood stabilizers", "Dialectical Behavior Therapy", "Routine establishment", "Crisis planning"]
              }
            ].map((condition, index) => (
              <Card key={index} className="p-6 bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-500 border-primary/20">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-foreground">{condition.condition}</h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {condition.prevalence}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{condition.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Common Symptoms:</h4>
                    <div className="space-y-1">
                      {condition.symptoms.map((symptom, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-xs text-muted-foreground">{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Treatment Approaches:</h4>
                    <div className="space-y-1">
                      {condition.treatment.map((approach, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          <span className="text-xs text-muted-foreground">{approach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-gradient-to-br from-card via-card/95 to-card/80 border-primary/20">
            <div className="text-center">
              <h3 className="font-bold text-2xl mb-4 text-foreground">Integrated Treatment Approach</h3>
              <p className="text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                The most effective treatment addresses both addiction and mental health conditions simultaneously. 
                This dual diagnosis approach recognizes the interconnected nature of these conditions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Coordinated Care</h4>
                  <p className="text-sm text-muted-foreground">Multiple providers working together with shared treatment goals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-blue-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Evidence-Based</h4>
                  <p className="text-sm text-muted-foreground">Therapies and medications proven effective for dual diagnosis</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Holistic Support</h4>
                  <p className="text-sm text-muted-foreground">Addressing physical, emotional, and social aspects of recovery</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/treatment-centers">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Find Treatment Centers
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/support-groups">
                  <Button variant="outline" className="px-8 py-3 text-lg font-semibold border-primary/20 hover:bg-primary hover:text-primary-foreground">
                    Join Support Groups
                    <MessageCircle className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 relative bg-gradient-to-br from-primary/10 via-accent/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-8 relative">
              <span className="bg-gradient-to-r from-purple-500 via-primary to-orange-500 bg-clip-text text-transparent">
                Ready to Take the Next Step?
              </span>
              {/* Fallback text for better contrast */}
              <span className="absolute inset-0 text-foreground opacity-20 -z-10">
                Ready to Take the Next Step?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
              Knowledge is just the beginning. Turn what you've learned into action with our comprehensive 
              support resources and treatment options designed to meet you wherever you are in your journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-500 border-primary/20">
              <Phone className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Need Immediate Help?</h3>
              <p className="text-muted-foreground mb-4">Crisis support available 24/7</p>
              <Link to="/emergency">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                  Emergency Resources
                </Button>
              </Link>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-500 border-primary/20">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Find Treatment</h3>
              <p className="text-muted-foreground mb-4">Professional care for lasting recovery</p>
              <Link to="/treatment-centers">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                  Search Treatment Centers
                </Button>
              </Link>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-500 border-primary/20">
              <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Join Community</h3>
              <p className="text-muted-foreground mb-4">Connect with others in recovery</p>
              <Link to="/support-groups">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/80">
                  Find Support Groups
                </Button>
              </Link>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/resources">
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-primary/30 hover:bg-primary hover:text-primary-foreground">
                More Resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/donation">
              <Button className="bg-gradient-to-r from-purple-500 via-primary to-orange-500 hover:from-purple-600 hover:via-primary/90 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold">
                Donate Now
                <Heart className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Education;