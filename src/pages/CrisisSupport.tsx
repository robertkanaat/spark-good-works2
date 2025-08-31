
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { 
  Phone, 
  Heart, 
  Users, 
  Shield, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Stethoscope,
  LifeBuoy,
  MessageCircle
} from "lucide-react";

const CrisisSupport = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Genius Recovery Crisis Support",
    "description": "24/7 crisis intervention services providing immediate support for mental health emergencies, suicide prevention, and addiction crises.",
    "url": "https://geniusrecovery.org/crisis-support",
    "telephone": ["988", "1-800-662-4357"],
    "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
    "areaServed": "United States"
  };

  const emergencyHotlines = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 mental health crisis support",
      icon: LifeBuoy
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text",
      icon: MessageCircle
    },
    {
      name: "National Poison Control Center",
      number: "1-800-222-1222",
      description: "24/7 poison emergency support",
      icon: Stethoscope
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "Immediate medical emergencies",
      icon: AlertTriangle
    }
  ];

  const crisisSigns = [
    "Thoughts of suicide or self-harm",
    "Feeling overwhelmed or out of control", 
    "Substance abuse or overdose",
    "Severe depression or anxiety",
    "Psychotic episodes or hallucinations",
    "Domestic violence or abuse"
  ];

  const immediateSteps = [
    {
      step: "1",
      title: "Assess the Situation",
      description: "Determine if immediate medical attention is needed. Call 911 for life-threatening emergencies.",
      icon: AlertTriangle
    },
    {
      step: "2", 
      title: "Reach Out for Support",
      description: "Call a crisis hotline or text for immediate support. You don't have to face this alone.",
      icon: Phone
    },
    {
      step: "3",
      title: "Stay Safe",
      description: "Remove harmful objects from reach. Stay with the person in crisis or have someone stay with you.",
      icon: Shield
    },
    {
      step: "4",
      title: "Follow Up",
      description: "Connect with mental health professionals for ongoing support and treatment planning.",
      icon: CheckCircle
    }
  ];

  const when911vs988 = [
    {
      service: "Call 911 if:",
      scenarios: [
        "The person is unconscious, not breathing, or showing signs of a heart attack or stroke",
        "They are behaving violently or pose a threat to themselves or others",
        "There's immediate physical danger or medical emergency",
        "Overdose or poisoning has occurred"
      ],
      color: "red"
    },
    {
      service: "Call 988 if:",
      scenarios: [
        "The person is in a mental health crisis but not in immediate physical danger",
        "They are experiencing suicidal thoughts but are not actively attempting harm",
        "Severe emotional distress or mental health emergency",
        "Need for crisis counseling and emotional support"
      ],
      color: "blue"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="24/7 Crisis Support | Immediate Help Available | Genius Recovery"
        description="Get immediate crisis support 24/7. Connect with trained professionals for suicide prevention, mental health emergencies, and addiction crises. Help is always available."
        keywords="crisis support, suicide prevention, mental health emergency, addiction crisis, 24/7 help, immediate support"
        structuredData={structuredData}
        canonicalUrl="https://geniusrecovery.org/crisis-support"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-background to-orange-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--destructive))_0%,transparent_50%)] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="destructive" className="mb-6 text-sm px-4 py-2">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Crisis Support
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              You Have the Power to{" "}
              <span className="text-destructive">Help Save a Life</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              We're so glad you're here. At Genius Recovery, we believe that knowledge is the first step to taking action, 
              and taking action can save lives. Whether this is your first time learning about crisis support or you've 
              helped someone before, the information here could make all the difference in an emergency situation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="destructive" 
                className="text-lg px-8 py-4 h-auto"
                onClick={() => window.location.href = 'tel:911'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 911 - Emergency
              </Button>
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 h-auto"
                onClick={() => window.location.href = 'tel:988'}
              >
                <LifeBuoy className="w-5 h-5 mr-2" />
                Call 988 - Crisis Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Hotlines */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Emergency Crisis Hotlines
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These resources are available 24/7 to provide immediate support during a crisis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyHotlines.map((hotline, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-l-destructive">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <hotline.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{hotline.name}</h3>
                    <p className="text-2xl font-bold text-destructive mb-2">{hotline.number}</p>
                    <p className="text-muted-foreground">{hotline.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognizing Crisis Signs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Recognizing the Signs of a{" "}
                <span className="text-destructive">Mental Health Crisis</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A mental health crisis can happen to anyone. These are key warning signs that someone may need immediate support:
              </p>
              <div className="space-y-4">
                {crisisSigns.map((sign, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-foreground">{sign}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6 italic">
                If you see any of these signs, act quickly—immediate support can make all the difference.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-destructive/5 to-orange-500/5 p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Remember</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  You don't need to be a mental health professional to help. Sometimes just being there, 
                  listening, and connecting someone to professional support can save a life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Call 911 vs 988 */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              911 vs. 988: When to Call Which Number
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In some cases, both services are needed. Here's how to determine which number to call first.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {when911vs988.map((service, index) => (
              <Card key={index} className={`p-8 border-l-4 ${service.color === 'red' ? 'border-l-destructive' : 'border-l-primary'}`}>
                <h3 className={`text-2xl font-bold mb-6 ${service.color === 'red' ? 'text-destructive' : 'text-primary'}`}>
                  {service.service}
                </h3>
                <ul className="space-y-3">
                  {service.scenarios.map((scenario, scenarioIndex) => (
                    <li key={scenarioIndex} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${service.color === 'red' ? 'bg-destructive' : 'bg-primary'}`}></div>
                      <span className="text-muted-foreground">{scenario}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Immediate Action Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Immediate Steps in a Crisis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              When someone is in crisis, knowing what to do can save lives. Follow these steps to provide effective support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {immediateSteps.map((step, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Message */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            You Are Not Alone in This Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Every small action matters, and by educating yourself, you've already taken the first step toward making a positive impact. 
            Crisis situations require compassion, quick thinking, and connection to professional resources.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              <Heart className="w-5 h-5 mr-2" />
              Find More Resources
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
              <Users className="w-5 h-5 mr-2" />
              Join Our Community
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            Together, we can create a network of support that saves lives and provides hope.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CrisisSupport;