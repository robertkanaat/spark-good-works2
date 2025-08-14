import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Download, BookOpen, Users, Heart, Quote, Star } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      expertise: "Recovery Advocacy"
    },
    {
      name: "Dr. Gabor Maté",
      title: "Physician & Author",
      description: "Renowned physician and bestselling author specializing in addiction, stress, and trauma. His compassionate approach emphasizes the connection between emotional pain and addictive behaviors.",
      expertise: "Addiction Medicine"
    },
    {
      name: "Dr. Patrick Carnes",
      title: "Clinical Psychologist",
      description: "Pioneer in the field of sexual addiction and trauma recovery. His groundbreaking work has helped millions understand the nature of addictive behaviors and the path to healing.",
      expertise: "Behavioral Addiction"
    },
    {
      name: "Ken Wells",
      title: "Recovery Expert",
      description: "Long-time recovery advocate and expert in addiction treatment modalities. His practical approach to recovery has helped countless individuals find their path to lasting sobriety.",
      expertise: "Treatment Strategies"
    },
    {
      name: "Guru Prem",
      title: "Spiritual Teacher",
      description: "Spiritual guide and teacher specializing in the integration of mindfulness and meditation practices in addiction recovery. Brings ancient wisdom to modern recovery challenges.",
      expertise: "Spiritual Recovery"
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
        {/* Hero Section - Apple-style minimal */}
        <section className="pt-24 pb-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen size={16} />
                Free Download Available
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-light text-foreground leading-tight mb-6">
                Understanding
                <br />
                <span className="font-semibold text-primary">Addiction And Recovery</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed mb-8">
                Exclusive insights from Joe Polish's interviews with world-renowned experts.
                <br />
                A compassionate guide to recovery and healing.
              </p>
            </div>

            {/* Book Image - Centered and elegant */}
            <div className="flex justify-center mb-20">
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/879915a0-9251-4cd3-8f03-11b3f3a07f1d.png" 
                    alt="Understanding Addiction And Recovery book cover by Joe Polish"
                    className="w-80 lg:w-96 mx-auto rounded-2xl shadow-2xl shadow-black/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Experts Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-6">
                Featured <span className="font-semibold text-primary">Experts</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                Learn from leading voices in addiction recovery, medicine, and spiritual healing
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {experts.map((expert, index) => (
                <Card key={index} className="border-0 shadow-lg bg-card/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {expert.expertise}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold">{expert.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{expert.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{expert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Expert Interviews</h3>
                <p className="text-muted-foreground">Candid conversations with leading addiction specialists and recovery experts</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Compassionate Approach</h3>
                <p className="text-muted-foreground">Understanding addiction through empathy and scientific insight</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Proven Wisdom</h3>
                <p className="text-muted-foreground">Time-tested strategies and breakthrough insights for lasting recovery</p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Form Section - Apple-style clean */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto max-w-2xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-light text-foreground mb-6">
                Get Your <span className="font-semibold text-primary">Free Copy</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                Enter your details below and we'll send you the download link immediately
              </p>
            </div>

            <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-base font-medium">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-base font-medium">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base font-medium">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-base font-medium">How will this book help you? (Optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us a bit about your journey or how you plan to use this resource..."
                      rows={4}
                      className="text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-3" />
                        Get Free Download Link
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    By downloading this book, you agree to receive occasional updates from Genius Recovery. 
                    We respect your privacy and never share your information.
                  </p>
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