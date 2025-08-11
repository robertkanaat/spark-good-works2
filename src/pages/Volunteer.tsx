import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MessageCircle, Calendar, MapPin, Clock, Mail, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LazyBgImage from "@/components/LazyBackgroundImage";

const Volunteer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    availability: "",
    experience: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Volunteer with Genius Recovery | Make a Difference";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join our volunteer community and help change lives through addiction recovery support. Explore volunteer opportunities with Genius Recovery.');
    }

    const canonicalUrl = `${window.location.origin}/volunteer`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Volunteer Opportunities",
      "description": "Join our volunteer community and help change lives through addiction recovery support.",
      "url": canonicalUrl,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Genius Recovery",
        "url": window.location.origin
      },
      "about": {
        "@type": "Organization",
        "name": "Genius Recovery",
        "description": "501(c)(3) nonprofit organization dedicated to addiction recovery support"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);
  }, []);

  const volunteerOpportunities = [
    {
      title: "Peer Support Mentor",
      description: "Provide one-on-one support to individuals in recovery through shared experience and empathy.",
      commitment: "4-6 hours/week",
      location: "Remote & In-person",
      requirements: ["1+ years in recovery", "Completed our training program", "Background check"],
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Community Outreach Coordinator",
      description: "Help organize and participate in community events, awareness campaigns, and educational workshops.",
      commitment: "6-8 hours/week",
      location: "Local communities",
      requirements: ["Strong communication skills", "Event planning experience preferred", "Reliable transportation"],
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Crisis Support Volunteer",
      description: "Provide compassionate support through our crisis helpline and chat services.",
      commitment: "One 4-hour shift/week",
      location: "Remote",
      requirements: ["Crisis intervention training", "Strong emotional stability", "Excellent listening skills"],
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      title: "Family Support Facilitator",
      description: "Lead support groups for families affected by addiction and help them navigate their healing journey.",
      commitment: "2-3 hours/week",
      location: "Community centers",
      requirements: ["Group facilitation experience", "Understanding of family dynamics", "Compassionate communication"],
      icon: <Calendar className="w-6 h-6" />
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll be in touch within 48 hours.",
      });
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interest: "",
        availability: "",
        experience: "",
        message: ""
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center">
          <LazyBgImage
            src="/assets/hero-family-embrace.jpg"
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          </LazyBgImage>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Make a 
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"> Difference</span>
                  <br />
                  in Recovery
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Join our volunteer community and help change lives through compassionate support, 
                  shared experience, and the power of human connection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                    onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    View Opportunities
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Volunteer Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Volunteer with Us?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your lived experience and compassion can be the bridge between despair and hope for someone in need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>Create Real Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Be part of life-changing moments and help individuals find their path to recovery through your support and understanding.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>Build Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connect with like-minded individuals who share your passion for helping others and building a supportive community.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>Share Your Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use your personal journey and experiences to inspire hope and show others that recovery is possible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section id="opportunities" className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Volunteer Opportunities
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find the perfect way to contribute your skills and make a meaningful difference in the recovery community.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {volunteerOpportunities.map((opportunity, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {opportunity.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{opportunity.title}</CardTitle>
                        <CardDescription className="text-base">
                          {opportunity.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {opportunity.commitment}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {opportunity.location}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {opportunity.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground">
                Fill out the application below and we'll be in touch to discuss how you can make a difference.
              </p>
            </div>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Volunteer Application</CardTitle>
                <CardDescription>
                  Tell us about yourself and how you'd like to contribute to our mission.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="pl-10"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interest">Area of Interest *</Label>
                      <Select onValueChange={(value) => handleSelectChange('interest', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select volunteer opportunity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="peer-support">Peer Support Mentor</SelectItem>
                          <SelectItem value="outreach">Community Outreach</SelectItem>
                          <SelectItem value="crisis-support">Crisis Support</SelectItem>
                          <SelectItem value="family-support">Family Support</SelectItem>
                          <SelectItem value="other">Other/Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability *</Label>
                      <Select onValueChange={(value) => handleSelectChange('availability', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                          <SelectItem value="evenings">Evenings</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Relevant Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Tell us about any relevant experience, training, or personal journey that you'd like to share..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Why do you want to volunteer with us?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share your motivation and what you hope to contribute to our mission..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Volunteer;