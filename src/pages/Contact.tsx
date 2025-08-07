import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (!error) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        });
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/15" />
        <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-transparent to-primary/10" />
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-secondary/25 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-accent/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-primary/15 rounded-full blur-2xl animate-pulse delay-1500" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 animate-fade-in">
            We're Here to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Help
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-fade-in leading-relaxed">
            Whether you need support, have questions, or want to join our mission, 
            we're here to listen and help you every step of the way.
          </p>
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
            <div>
              <Card className="p-10 bg-gradient-to-br from-background to-muted/50 border-2 border-primary/10 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
                    <Send className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Send Message</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Share Your Story
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
                    <Input 
                      id="subject" 
                      placeholder="How can we help you?" 
                      className="h-12 border-2 border-border/50 focus:border-primary transition-colors duration-300"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-semibold">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please tell us more about how we can help you or answer your questions..."
                      className="min-h-[150px] border-2 border-border/50 focus:border-primary transition-colors duration-300 resize-none"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
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