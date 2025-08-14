import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Download, BookOpen, Users, Heart, Quote, Star, CheckCircle, ArrowRight, Sparkles, Crown, Award, Zap } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import joePolishAvatar from '@/assets/experts/joe-polish.jpg';
import gaborMateAvatar from '@/assets/experts/gabor-mate.jpg';
import patrickCarnesAvatar from '@/assets/experts/patrick-carnes.jpg';
import kenWellsAvatar from '@/assets/experts/ken-wells.jpg';
import guruPremAvatar from '@/assets/experts/guru-prem.jpg';

const BookDownload = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'Book Download Request - Understanding Addiction And Recovery',
          message: `Book Download Request:\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`
        }),
      });

      if (response.ok) {
        toast({
          title: "Request Submitted Successfully!",
          description: "We'll send you the download link shortly. Check your email.",
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const experts = [
    {
      name: "Joe Polish",
      title: "Host & Creator",
      description: "Entrepreneur, addiction recovery advocate, and founder of Genius Network. Joe's personal journey through addiction recovery drives his mission to change how the world views and treats addiction.",
      expertise: "Recovery Advocacy",
      avatar: joePolishAvatar
    },
    {
      name: "Dr. Gabor Maté",
      title: "Physician & Author",
      description: "Renowned physician and bestselling author specializing in addiction, stress, and trauma. His compassionate approach emphasizes the connection between emotional pain and addictive behaviors.",
      expertise: "Addiction Medicine",
      avatar: gaborMateAvatar
    },
    {
      name: "Dr. Patrick Carnes",
      title: "Clinical Psychologist",
      description: "Pioneer in the field of sexual addiction and trauma recovery. His groundbreaking work has helped millions understand the nature of addictive behaviors and the path to healing.",
      expertise: "Behavioral Addiction",
      avatar: patrickCarnesAvatar
    },
    {
      name: "Ken Wells",
      title: "Recovery Expert",
      description: "Long-time recovery advocate and expert in addiction treatment modalities. His practical approach to recovery has helped countless individuals find their path to lasting sobriety.",
      expertise: "Treatment Strategies",
      avatar: kenWellsAvatar
    },
    {
      name: "Guru Prem",
      title: "Spiritual Teacher",
      description: "Spiritual guide and teacher specializing in the integration of mindfulness and meditation practices in addiction recovery. Brings ancient wisdom to modern recovery challenges.",
      expertise: "Spiritual Recovery",
      avatar: guruPremAvatar
    }
  ];

  return (
    <>
      <SEOHead 
        title="Free Book Download - Understanding Addiction And Recovery | Genius Recovery"
        description="Download your free copy of 'Understanding Addiction And Recovery' by Joe Polish. Expert insights on addiction treatment and recovery support."
        keywords="free book download, addiction recovery book, Joe Polish interviews, understanding addiction, recovery resources"
        canonicalUrl="https://geniusrecovery.org/book-download"
      />
      
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section - Stunning Visual Impact */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Dynamic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--donate)/0.25),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--secondary)/0.15),transparent_50%)]"></div>
          </div>
          
          {/* Animated Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-40" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-donate/5 rounded-full blur-2xl animate-pulse delay-500 opacity-30" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left side - Powerful Content */}
              <div className="lg:col-span-7 text-left">
                {/* Badge */}
                <div className="mb-8 animate-fade-in">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-primary/20">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                    <span className="text-foreground font-semibold tracking-wider uppercase text-sm">
                      Exclusive Free Download
                    </span>
                  </div>
                </div>
                
                {/* Main Headline - More Impactful */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-[0.9] animate-fade-in">
                  Understanding{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-secondary">
                    Addiction
                  </span>{" "}
                  <br />
                  <span className="text-primary">& Recovery</span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-2xl md:text-3xl text-muted-foreground mb-8 leading-relaxed font-medium animate-fade-in">
                  Exclusive insights from Joe Polish's interviews.<br />
                  <span className="text-primary font-semibold">Transform your understanding of addiction.</span>
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-col gap-4 mb-12 animate-fade-in">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <span className="text-lg font-medium">Expert Interviews</span>
                    </div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <span className="text-lg font-medium">Compassionate Insights</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <span className="text-lg font-medium">Recovery Wisdom</span>
                    </div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <span className="text-lg font-medium">100% Free</span>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="animate-fade-in">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-primary/30 group"
                    onClick={() => {
                      document.getElementById('download-form')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start' 
                      });
                    }}
                  >
                    <span className="relative">
                      Get Your Free Copy
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              
              {/* Right side - Book Showcase */}
              <div className="lg:col-span-5 animate-fade-in">
                <div className="relative">
                  {/* Glow effect behind book */}
                  <div className="absolute -inset-12 bg-gradient-to-r from-primary/20 via-donate/20 to-secondary/20 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <img 
                      src="/lovable-uploads/879915a0-9251-4cd3-8f03-11b3f3a07f1d.png" 
                      alt="Understanding Addiction And Recovery book cover by Joe Polish"
                      className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="text-center mt-6">
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                        <Award className="w-4 h-4" />
                        Featured Experts Inside
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Featured Experts Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Crown className="w-4 h-4" />
                World-Class Experts
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-foreground mb-6">
                Learn From The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-secondary">
                  Best
                </span>
              </h2>
              <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
                Dive deep into conversations with the world's leading voices in addiction recovery, 
                medicine, psychology, and spiritual healing
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {experts.map((expert, index) => (
                <Card key={index} className="group border-0 shadow-2xl bg-gradient-to-br from-card/80 to-card/95 backdrop-blur-sm hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-donate/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardHeader className="relative pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Expert Avatar */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                          <img 
                            src={expert.avatar} 
                            alt={`${expert.name} headshot`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary/20 to-donate/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-3 h-3 text-primary" />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-primary bg-gradient-to-r from-primary/10 to-donate/10 px-4 py-2 rounded-full border border-primary/20">
                        {expert.expertise}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{expert.name}</CardTitle>
                    <CardDescription className="text-primary font-semibold text-lg">{expert.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground leading-relaxed">{expert.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary font-medium">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">Featured in book</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition - Enhanced */}
        <section className="py-20 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-background to-muted/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--donate)/0.05),transparent_50%)]"></div>
          
          <div className="container mx-auto max-w-6xl px-4 text-center relative z-10">
            <div className="mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6">
                Why This Book{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-donate">
                  Matters
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                More than just a book—it's a bridge to understanding, compassion, and hope
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group space-y-6 p-8 rounded-3xl bg-gradient-to-br from-card/60 to-card/80 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Expert Interviews</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">Candid conversations with leading addiction specialists, revealing breakthrough insights and compassionate approaches to recovery</p>
                <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>5+ World-Class Experts</span>
                </div>
              </div>
              
              <div className="group space-y-6 p-8 rounded-3xl bg-gradient-to-br from-card/60 to-card/80 backdrop-blur-sm border border-donate/10 hover:border-donate/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-donate/10">
                <div className="w-20 h-20 bg-gradient-to-br from-donate/20 to-donate/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-donate" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Compassionate Approach</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">Understanding addiction through empathy and scientific insight, breaking down stigma and building bridges to healing</p>
                <div className="flex items-center justify-center gap-2 text-donate font-semibold">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Evidence-Based Care</span>
                </div>
              </div>
              
              <div className="group space-y-6 p-8 rounded-3xl bg-gradient-to-br from-card/60 to-card/80 backdrop-blur-sm border border-secondary/10 hover:border-secondary/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/10">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Proven Wisdom</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">Time-tested strategies and breakthrough insights for lasting recovery, backed by decades of combined experience</p>
                <div className="flex items-center justify-center gap-2 text-secondary font-semibold">
                  <CheckCircle className="w-4 h-4 fill-current" />
                  <span>Practical Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Form Section - Stunning Design */}
        <section className="py-16 relative overflow-hidden -mt-20 relative z-20" id="download-form">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-donate/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1),transparent_70%)]"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-donate/10 rounded-full blur-2xl animate-pulse delay-1000 opacity-40" />
          
          <div className="container mx-auto max-w-3xl px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Download className="w-4 h-4" />
                Free Instant Access
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-foreground mb-6">
                Get Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-donate to-secondary">
                  Free Copy
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Enter your details below and we'll send you the download link immediately. 
                <span className="text-primary font-semibold"> No spam, ever.</span>
              </p>
            </div>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card/90 to-card/95 backdrop-blur-md relative overflow-hidden">
              {/* Card glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-donate/20 to-secondary/20 rounded-3xl blur-xl opacity-60"></div>
              
              <CardContent className="relative p-8 lg:p-12">
                {/* Trust indicators */}
                <div className="flex justify-center gap-8 mb-8 flex-wrap">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Instant Download
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    No Credit Card
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    100% Private
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-base font-semibold text-foreground">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="h-14 text-base border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-base font-semibold text-foreground">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className="h-14 text-base border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-semibold text-foreground">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="h-14 text-base border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base font-semibold text-foreground">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="h-14 text-base border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-base font-semibold text-foreground">How will this book help you? (Optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us a bit about your journey or how you plan to use this resource..."
                      rows={4}
                      className="text-base border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary to-donate hover:from-primary/90 hover:to-donate/90 text-primary-foreground shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] rounded-xl group relative overflow-hidden"
                    disabled={isSubmitting}
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Download className="w-6 h-6 mr-3" />
                        Get Your Free Book Now
                      </>
                    )}
                  </Button>

                  <div className="bg-muted/50 rounded-xl p-4 border border-primary/10">
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      🔒 <span className="font-semibold">Your privacy matters.</span> By downloading this book, you agree to receive occasional updates from Genius Recovery. 
                      We respect your privacy and never share your information with third parties.
                    </p>
                  </div>
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

export default BookDownload;