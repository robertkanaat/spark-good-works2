import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, Heart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import resourcesHeroImage from "@/assets/resources-hero-bg.jpg";
import DOMPurify from "dompurify";
import Turnstile from 'react-turnstile';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us - Get Support & Recovery Help | Genius Recovery";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Genius Recovery for addiction support, recovery resources, or general inquiries. Our compassionate team is here to help you or your loved ones find the path to recovery.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Contact Genius Recovery for addiction support, recovery resources, or general inquiries. Our compassionate team is here to help you or your loved ones find the path to recovery.';
      document.head.appendChild(meta);
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: ""
  });
  

  // Enhanced input validation and sanitization
  const validateInput = (value: string, field: string): string => {
    // Basic length limits to prevent abuse
    const maxLengths: Record<string, number> = {
      firstName: 50,
      lastName: 50,
      email: 254,
      phone: 20,
      subject: 200
    };

    if (value.length > (maxLengths[field] || 100)) {
      return value.substring(0, maxLengths[field] || 100);
    }

    // Basic sanitization - remove potentially dangerous characters but preserve spaces and normal text
    const sanitized = DOMPurify.sanitize(value, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    });

    // Only trim for email field, preserve spaces for other fields
    return field === 'email' ? sanitized.trim() : sanitized;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === "phone") {
      // Format phone number as user types
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      
      if (cleaned.length >= 6) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      } else if (cleaned.length >= 3) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      } else if (cleaned.length > 0) {
        formatted = cleaned;
      }
      
      setFormData(prev => ({ ...prev, [id]: validateInput(formatted, id) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: validateInput(value, id) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Verify Turnstile token
  if (!turnstileToken) {
    toast.error("Verification Required", {
      description: "Please complete the security verification.",
    });
    return;
  }
  
  setIsSubmitting(true);
  try {
    // Additional validation before submission
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.subject) {
      throw new Error('Please fill in all required fields');
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }
    const { data, error } = await supabase.functions.invoke('send-contact-email', {
      body: {
        ...formData,
        turnstileToken: turnstileToken
      },
    });
    
    console.log("Supabase response:", { data, error });
    console.log("Data type:", typeof data);
    console.log("Data keys:", data ? Object.keys(data) : 'null');
    
    // Check for successful response
    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message || 'Failed to send message');
    }
    
    // Check if the function executed successfully
    // The edge function returns { success: true, message: "..." }
    if (data?.success === true) {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: ""
      });
      // Reset Turnstile widget by changing key
      setTurnstileToken('');
      setTurnstileKey(prev => prev + 1);
    } else {
      console.error("Function returned unsuccessful response:", data);
      throw new Error(data?.error || 'Failed to send message');
    }
  } catch (error) {
    console.error("Form submission error:", error);
    toast.error("Error sending message", {
      description: error instanceof Error ? error.message : "Please try again or contact us directly.",
    });
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Better Contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: `url(${resourcesHeroImage})`,
            backgroundPosition: 'center 50%'
          }}
        >
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
        </div>
        
        {/* Animated Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side - Powerful Content */}
            <div className="lg:col-span-7 text-left">
              {/* Badge */}
              <div className="mb-8 animate-fade-in">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Heart className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-white font-semibold tracking-wider uppercase text-sm">
                    Compassionate Support
                  </span>
                </div>
              </div>
              
              {/* Main Headline - More Impactful */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] animate-fade-in">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
                  Voice
                </span>{" "}
                <br />
                <span className="text-primary">Matters</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium animate-fade-in">
                Every story deserves to be heard.<br />
                <span className="text-white/70">Every journey deserves support.</span>
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-col gap-4 mb-12 animate-fade-in">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">24/7 Crisis Support</span>
                  </div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">100% Confidential</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">Professional Support Team</span>
                  </div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <span className="text-lg font-medium">Free Resources</span>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="animate-fade-in">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-primary/30 group"
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start' 
                    });
                  }}
                >
                  <span className="relative">
                    Start the Conversation
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            {/* Right side - Quote/Testimonial Card */}
            <div className="lg:col-span-5 animate-fade-in">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <blockquote className="text-white text-xl font-medium mb-6 leading-relaxed">
                    "Recovery is not a destination, it's a journey. And no one should walk that path alone."
                  </blockquote>
                  <div className="text-white/70 font-medium">
                    - Genius Recovery Team
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Let's Connect
                </h2>
                <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                  Every conversation matters. Whether you're seeking support, have questions about our services, 
                  or want to partner with us in healing addiction around the world, we're ready to listen.
                </p>
              </div>

              <div className="space-y-8">
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary group">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-3">24/7 Support Hotline</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        Available around the clock for crisis support and immediate assistance
                      </p>
                      <a 
                        href="tel:+1-800-GENIUS" 
                        className="text-primary hover:text-primary/80 font-bold text-lg transition-colors duration-300"
                      >
                        1-800-GENIUS (1-800-436-4878)
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-secondary group">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-3">Email Support</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Director & General Inquiries:</p>
                          <a href="mailto:director@geniusrecovery.org" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300">
                            director@geniusrecovery.org
                          </a>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Support:</p>
                          <a href="mailto:support@geniusrecovery.org" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300">
                            support@geniusrecovery.org
                          </a>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Press inquiries:</p>
                          <a href="mailto:press@geniusrecovery.org" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300">
                            press@geniusrecovery.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-accent group">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-3">Headquarters</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Genius Recovery<br />
                        4440 S Rural Rd BLDG F<br />
                        Tempe, AZ 85282<br />
                        United States
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/60 group">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/60 to-primary/40 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-3">Office Hours</h3>
                      <div className="text-muted-foreground space-y-2 leading-relaxed">
                        <p className="font-medium">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                        <p>Weekend: 24/7 Crisis Support Available</p>
                        <p className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                          🚨 Emergency support always available
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact-form">
              <Card className="p-10 bg-gradient-to-br from-background to-muted/50 border-2 border-primary/10 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
                    <Send className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Send Message</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Stay Connected
                  </h3>
                  <p className="text-muted-foreground mt-2">We're listening and ready to help</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-semibold">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Your first name" 
                        className="h-12 border-2 border-border/50 focus:border-primary transition-colors duration-300" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-semibold">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Your last name" 
                        className="h-12 border-2 border-border/50 focus:border-primary transition-colors duration-300"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="h-12 border-2 border-border/50 focus:border-primary transition-colors duration-300"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-semibold">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="(555) 123-4567" 
                      className="h-12 border-2 border-border/50 focus:border-primary transition-colors duration-300"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-semibold">Subject *</Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                      required
                    >
                      <SelectTrigger className="h-12 border-2 border-border/50 focus:border-primary transition-colors duration-300">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                        <SelectItem value="Resource Request">Resource Request</SelectItem>
                        <SelectItem value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                        <SelectItem value="Press Inquiry">Press Inquiry</SelectItem>
                        <SelectItem value="Volunteer Information">Volunteer Information</SelectItem>
                        <SelectItem value="Donation Question">Donation Question</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                      <div>
                        <p className="text-sm text-yellow-800 font-medium mb-1">Crisis Support Available 24/7</p>
                        <p className="text-sm text-yellow-700">
                          If you're experiencing a mental health crisis or having thoughts of self-harm, 
                          please call <strong>988</strong> (Suicide & Crisis Lifeline) or <strong>911</strong> immediately. 
                          This contact form is not monitored 24/7.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cloudflare Turnstile */}
                  <div className="flex justify-center my-6">
                    <Turnstile
                      key={turnstileKey}
                      sitekey="0x4AAAAAAB5Ja4WmfAWnGyJt"
                      onVerify={(token) => setTurnstileToken(token)}
                      onError={() => {
                        setTurnstileToken('');
                        toast.error("Verification Error", {
                          description: "Security verification failed. Please try again.",
                        });
                      }}
                      onExpire={() => setTurnstileToken('')}
                      theme="light"
                    />
                  </div>
                  
                  <Button
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-bold gap-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Send Message
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Need Immediate Help?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            If you or someone you know is in crisis, don't wait. Help is available right now.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a 
              href="tel:988" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Call 988 - Crisis Lifeline
            </a>
            <a 
              href="tel:1-800-662-4357" 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              SAMHSA: 1-800-662-4357
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;