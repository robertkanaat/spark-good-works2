import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Download, BookOpen, Users, Heart } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

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

  return (
    <>
      <SEOHead 
        title="Free Book Download - Understanding Addiction And Recovery | Genius Recovery"
        description="Download your free copy of 'Understanding Addiction And Recovery' by Joe Polish. Expert insights on addiction treatment and recovery support."
        keywords="free book download, addiction recovery book, Joe Polish interviews, understanding addiction, recovery resources"
        canonicalUrl="https://geniusrecovery.org/book-download"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Book Cover */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-2xl">
                    <img 
                      src="/lovable-uploads/879915a0-9251-4cd3-8f03-11b3f3a07f1d.png" 
                      alt="Understanding Addiction And Recovery book cover by Joe Polish"
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center lg:text-left space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                    <BookOpen size={16} />
                    FREE DOWNLOAD
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Understanding Addiction 
                    <span className="text-primary"> And Recovery</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Get exclusive insights from Joe Polish's interviews with leading addiction experts 
                    Dr. Gabor Maté, Dr. Patrick Carnes, Ken Wells, and Guru Prem.
                  </p>
                </div>

                {/* Benefits */}
                <div className="grid sm:grid-cols-2 gap-4 pt-6">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Expert Insights</div>
                      <div className="text-sm text-muted-foreground">From leading professionals</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Compassionate Approach</div>
                      <div className="text-sm text-muted-foreground">Understanding & empathy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Form Section */}
        <section className="pb-20 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Download Your Free Copy</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we'll send you the download link immediately.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">How will this book help you? (Optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us a bit about your journey or how you plan to use this resource..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Get Free Download Link
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By downloading this book, you agree to receive occasional updates from Genius Recovery. 
                    We respect your privacy and never share your information.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookDownload;