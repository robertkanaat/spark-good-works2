import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/10" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/15 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            We're here to help. Reach out to us for support, questions, or to learn more about our mission to transform addiction recovery.
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
                <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Whether you need immediate support, have questions about our services, or want to partner with us, we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">24/7 Support Hotline</h3>
                      <p className="text-muted-foreground mb-2">Available around the clock for crisis support</p>
                      <a href="tel:+1-800-GENIUS" className="text-primary hover:text-primary/80 font-semibold">
                        1-800-GENIUS (1-800-436-4878)
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                      <div className="space-y-1">
                        <div>
                          <p className="text-sm text-muted-foreground">General inquiries:</p>
                          <a href="mailto:info@geniusrecovery.org" className="text-primary hover:text-primary/80">
                            info@geniusrecovery.org
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Support:</p>
                          <a href="mailto:support@geniusrecovery.org" className="text-primary hover:text-primary/80">
                            support@geniusrecovery.org
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Press inquiries:</p>
                          <a href="mailto:press@geniusrecovery.org" className="text-primary hover:text-primary/80">
                            press@geniusrecovery.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Headquarters</h3>
                      <p className="text-muted-foreground">
                        Genius Recovery<br />
                        123 Recovery Way<br />
                        Hope City, HC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                        <p>Weekend: 24/7 Crisis Support Available</p>
                        <p className="text-sm font-medium text-primary">Emergency support always available</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Your first name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Your last name" className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="How can we help you?" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please tell us more about how we can help you or answer your questions..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Crisis Support:</strong> If you're experiencing a mental health crisis or having thoughts of self-harm, 
                      please call 988 (Suicide & Crisis Lifeline) or 911 immediately. This contact form is not monitored 24/7.
                    </p>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full gap-2 hover:scale-[1.02] transition-all duration-300">
                    <Send className="w-5 h-5" />
                    Send Message
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