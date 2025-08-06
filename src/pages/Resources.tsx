import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Users, Globe, Shield, Phone, BookOpen, HeadphonesIcon, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Resources = () => {
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
      link: "#"
    },
    {
      title: "Recovery Stages",
      description: "Navigate the different phases of recovery with confidence",
      link: "#"
    },
    {
      title: "Harm Reduction",
      description: "Practical strategies to reduce risks and promote safety",
      link: "#"
    },
    {
      title: "Mental Health",
      description: "Address co-occurring mental health conditions",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Recovery Resources & Support
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive resources to support your recovery journey. From crisis intervention to long-term support, 
              we're here to help you find the right path forward.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Safe & Confidential
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                Community Support
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Globe className="w-4 h-4 mr-2" />
                Available Worldwide
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Emergency & Crisis Support
            </h2>
            <p className="text-lg text-muted-foreground">
              If you or someone you know is in crisis, immediate help is available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {emergencyResources.map((resource, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <resource.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-3">{resource.description}</p>
                    <div className="space-y-2">
                      <a 
                        href={`tel:${resource.phone.replace(/[^0-9]/g, '')}`}
                        className="block text-xl font-bold text-primary hover:underline"
                      >
                        {resource.phone}
                      </a>
                      <Badge variant="outline" className="text-xs">
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
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                View All Emergency Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recovery Resources */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Recovery Support Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the support and tools you need for every stage of recovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recoveryResources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                </div>
                <div className="space-y-2">
                  {resource.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs mr-2 mb-2">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Explore Resources
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Educational Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Knowledge is power. Learn about addiction, recovery, and wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {educationalResources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog">
              <Button variant="outline">
                Visit Our Blog for More Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Changing the Global Conversation
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Genius Recovery was born out of a mission to change the way the world understands and supports 
              addiction recovery. We believe in transforming the conversation from one of judgment to one of 
              compassion, providing hope and healing to those who need it most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Compassionate Care</h3>
              <p className="text-sm text-muted-foreground">
                Moving beyond judgment to offer understanding and support
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Community Connection</h3>
              <p className="text-sm text-muted-foreground">
                Building networks of support and shared experiences
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Safe Spaces</h3>
              <p className="text-sm text-muted-foreground">
                Creating environments where healing can truly begin
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donation">
              <Button className="bg-primary hover:bg-primary/90">
                Support Our Mission
              </Button>
            </Link>
            <Link to="/emergency">
              <Button variant="outline">
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