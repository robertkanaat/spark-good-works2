import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play, Star, Calendar, Users, Award, Download, Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import andreVideoPreview from '@/assets/andre-norman-video-preview.jpg';
import joeVideoPreview from '@/assets/joe-polish-video-preview.jpg';

const speakingTopics = [
  {
    title: "Breaking the Cycle: Understanding Addiction Recovery",
    description: "A comprehensive look at the science and psychology behind addiction recovery",
    duration: "45-60 minutes"
  },
  {
    title: "Family Recovery: Healing Together",
    description: "How families can support recovery while protecting their own wellbeing",
    duration: "30-45 minutes"
  },
  {
    title: "The Genius Method: Revolutionary Recovery Approaches",
    description: "Innovative strategies that are transforming addiction treatment",
    duration: "60-90 minutes"
  },
  {
    title: "Mental Health in Recovery",
    description: "Addressing dual diagnosis and co-occurring disorders",
    duration: "45-60 minutes"
  },
  {
    title: "Workplace Wellness: Supporting Employees in Recovery",
    description: "Creating supportive workplace environments for recovery",
    duration: "30-45 minutes"
  },
  {
    title: "Hope and Healing: Personal Stories of Transformation",
    description: "Inspiring keynote sharing real recovery journeys",
    duration: "30-60 minutes"
  }
];

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Conference Director, National Recovery Summit",
    content: "Joe's presentation was the highlight of our conference. His authentic approach and practical insights left our 500+ attendees genuinely inspired and equipped with actionable strategies.",
    rating: 5,
    event: "National Recovery Summit 2024"
  },
  {
    name: "Maria Rodriguez",
    role: "CEO, Hope Foundation",
    content: "Andre's keynote brought our entire organization to tears and then to action. His story of transformation combined with practical recovery principles created lasting impact.",
    rating: 5,
    event: "Hope Foundation Annual Gala"
  },
  {
    name: "Michael Chen",
    role: "Program Director, Wellness Corp",
    content: "The Genius Recovery team delivered exactly what we needed - hope, practical tools, and a clear path forward. Our employee wellness program was transformed.",
    rating: 5,
    event: "Corporate Wellness Summit"
  },
  {
    name: "Dr. Jennifer Adams",
    role: "Chief Medical Officer, Regional Health System",
    content: "Their evidence-based approach combined with personal experience creates a powerful message that resonates with both professionals and families.",
    rating: 5,
    event: "Medical Professional Conference"
  }
];

const achievements = [
  "100+ Speaking Engagements Annually",
  "Featured on National Media Outlets",
  "Keynote Speaker at Major Conferences",
  "Expert Contributors to Recovery Literature",
  "Award-Winning Recovery Advocates"
];

// Validation schema
const speakerBookingSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-'\.]+$/, "Name can only contain letters, spaces, hyphens, apostrophes, and periods"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[\+\-\(\)\s\d]+$/, "Please enter a valid phone number"),
  organization: z.string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(200, "Organization name must be less than 200 characters"),
  eventDate: z.string()
    .trim()
    .min(1, "Event date is required"),
  eventType: z.string()
    .trim()
    .min(1, "Event type is required")
    .max(100, "Event type must be less than 100 characters"),
  audience: z.string()
    .trim()
    .min(1, "Audience size is required")
    .max(50, "Audience size must be less than 50 characters"),
  topic: z.string()
    .trim()
    .max(200, "Topic must be less than 200 characters"),
  budget: z.string()
    .trim()
    .max(50, "Budget must be less than 50 characters"),
  message: z.string()
    .trim()
    .max(2000, "Message must be less than 2000 characters")
});

type SpeakerBookingForm = z.infer<typeof speakerBookingSchema>;

const Speakers = () => {
  const [formData, setFormData] = useState<SpeakerBookingForm>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    eventDate: '',
    eventType: '',
    audience: '',
    topic: '',
    budget: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isJoeVideoOpen, setIsJoeVideoOpen] = useState(false);
  const [isAndreVideoOpen, setIsAndreVideoOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SpeakerBookingForm, string>>>({});
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name as keyof SpeakerBookingForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      // Validate form data with zod schema
      const validatedData = speakerBookingSchema.parse(formData);

      setIsLoading(true);
      
      // Sanitize data for webhook (removing any potential XSS)
      const sanitizedData = Object.fromEntries(
        Object.entries(validatedData).map(([key, value]) => [
          key, 
          typeof value === 'string' ? value.trim().replace(/<[^>]*>?/gm, '') : value
        ])
      );

      // Prepare data for Zapier webhook
      const webhookData = {
        ...sanitizedData,
        timestamp: new Date().toISOString(),
        source: "Genius Recovery Speakers Page",
        url: window.location.href,
      };

      console.log("Sending validated speaker booking data to Zapier:", webhookData);

      const response = await fetch("https://hooks.zapier.com/hooks/catch/155028/ud1c44d/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Handle CORS for external webhook
        body: JSON.stringify(webhookData),
      });

      // Show success message
      toast({
        title: "Speaking Request Submitted Successfully! 🎉",
        description: "Thank you for your interest! We'll respond within 24 hours to discuss your event.",
      });

      // Reset form on success
      setFormData({
        name: '', email: '', phone: '', organization: '', eventDate: '',
        eventType: '', audience: '', topic: '', budget: '', message: ''
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Partial<Record<keyof SpeakerBookingForm, string>> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof SpeakerBookingForm] = issue.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Please check your information",
          description: "Some fields need to be corrected before submitting.",
          variant: "destructive",
        });
      } else {
        console.error("Error submitting speaker booking:", error);
        toast({
          title: "Submission Error",
          description: "There was an issue submitting your request. Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Book Joe & Andre as Speakers | Genius Recovery Speaking Bureau</title>
        <meta name="description" content="Book Joe and Andre from Genius Recovery for your next event. Inspiring keynotes on addiction recovery, family healing, and transformation. Professional speaker bureau services." />
        <meta name="keywords" content="recovery speakers, addiction keynote speakers, motivational speakers, recovery conference speakers, addiction recovery presentations" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/50"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 text-base font-medium px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 hover-glow">
              ✨ Professional Speaking Bureau
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent animate-gradient-slide">
                Transformational
              </span>
              <br />
              <span className="text-foreground">Speakers</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Book Joe and Andre for <span className="text-primary font-semibold">inspiring keynotes</span> that combine personal recovery journeys with evidence-based strategies that create lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-10 py-6 shadow-elegant hover-scale bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
                <Calendar className="mr-3 h-6 w-6" />
                Book Speaking Engagement
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker Highlights */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-muted/30 via-background to-muted/30"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Our Impact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Speaker Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Proven track record of delivering <span className="text-primary font-semibold">powerful, transformational presentations</span> that create lasting change
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="group text-center p-6 hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 bg-gradient-to-b from-card to-card/80 border-2 hover:border-primary/20">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">{achievement}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker Reel */}
      <section className="py-20 relative">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">Watch Now</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Speaker Reel</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Watch highlights from recent speaking engagements and see the <span className="text-primary font-semibold">transformational impact</span>
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card 
              className="group cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-all duration-500 overflow-hidden border-2 hover:border-primary/30"
              onClick={() => setIsJoeVideoOpen(true)}
            >
              <div className="relative aspect-video rounded-t-lg flex items-center justify-center overflow-hidden"
                   style={{ backgroundImage: `url(${joeVideoPreview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <div className="text-white text-center px-4">
                    <p className="font-bold text-lg mb-1">Joe's Keynote Highlights</p>
                    <p className="text-sm opacity-90">5:30 minutes of inspiration</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30">Featured Speaker</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Joe's Keynote Highlights</h3>
                <p className="text-muted-foreground">
                  Compilation of Joe's most powerful moments from recent conferences, showcasing authentic storytelling and audience engagement
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className="group cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-all duration-500 overflow-hidden border-2 hover:border-secondary/30"
              onClick={() => setIsAndreVideoOpen(true)}
            >
              <div className="relative aspect-video rounded-t-lg flex items-center justify-center overflow-hidden"
                   style={{ backgroundImage: `url(${andreVideoPreview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <div className="text-white text-center px-4">
                    <p className="font-bold text-lg mb-1">Andre's Speaker Reel</p>
                    <p className="text-sm opacity-90">4:45 minutes of transformation</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30">Expert Presenter</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 group-hover:text-secondary transition-colors">Andre's Speaker Reel</h3>
                <p className="text-muted-foreground">
                  Andre's transformational presentations and powerful audience reactions, featuring real recovery stories and practical insights
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-muted/40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Expertise Areas</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Speaking Topics</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              <span className="text-primary font-semibold">Customizable presentations</span> tailored to your audience and event goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakingTopics.map((topic, index) => (
              <Card key={index} className="group hover:shadow-elegant hover:-translate-y-2 transition-all duration-300 bg-gradient-to-b from-card to-card/90 border-2 hover:border-primary/20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 group-hover:bg-secondary/20 transition-colors">{topic.duration}</Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Attendees Say</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from event organizers and attendees about the <span className="text-primary font-semibold">transformational impact</span> of our presentations
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-2 hover:border-primary/20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-glow to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="pt-8 pb-6">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary mr-1 animate-pulse delay-[{i*100}ms]" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <Badge variant="outline" className="text-xs mt-1 bg-primary/5 text-primary border-primary/20">
                        {testimonial.event}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Booking Form */}
      <section id="booking-form" className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-muted/20 to-background"></div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Ready to Book?</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Book a Speaking Engagement</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Let's discuss how we can make your event <span className="text-primary font-semibold">impactful and memorable</span>
              </p>
            </div>
            
            <Card className="p-8 md:p-12 bg-gradient-to-br from-card via-card/98 to-card/95 border-2 border-primary/10 shadow-elegant">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 ${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 ${errors.email ? 'border-destructive' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 ${errors.phone ? 'border-destructive' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization *</Label>
                    <Input
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 ${errors.organization ? 'border-destructive' : ''}`}
                    />
                    {errors.organization && (
                      <p className="text-sm text-destructive mt-1">{errors.organization}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="eventDate">Event Date *</Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 ${errors.eventDate ? 'border-destructive' : ''}`}
                    />
                    {errors.eventDate && (
                      <p className="text-sm text-destructive mt-1">{errors.eventDate}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="eventType">Event Type *</Label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 w-full px-3 py-2 border bg-background rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.eventType ? 'border-destructive' : 'border-input'}`}
                    >
                      <option value="">Select event type</option>
                      <option value="conference">Conference</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="nonprofit">Nonprofit Event</option>
                      <option value="medical">Medical/Healthcare</option>
                      <option value="educational">Educational Institution</option>
                      <option value="community">Community Event</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.eventType && (
                      <p className="text-sm text-destructive mt-1">{errors.eventType}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="audience">Expected Audience Size *</Label>
                    <Input
                      id="audience"
                      name="audience"
                      type="number"
                      value={formData.audience}
                      onChange={handleInputChange}
                      required
                      className={`mt-1 ${errors.audience ? 'border-destructive' : ''}`}
                      placeholder="e.g., 100"
                    />
                    {errors.audience && (
                      <p className="text-sm text-destructive mt-1">{errors.audience}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="budget">Speaking Fee Budget</Label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={`mt-1 w-full px-3 py-2 border bg-background rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.budget ? 'border-destructive' : 'border-input'}`}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-plus">$25,000+</option>
                      <option value="nonprofit">Nonprofit Rate</option>
                      <option value="discuss">Prefer to Discuss</option>
                    </select>
                    {errors.budget && (
                      <p className="text-sm text-destructive mt-1">{errors.budget}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="topic">Preferred Speaking Topic</Label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className={`mt-1 w-full px-3 py-2 border bg-background rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.topic ? 'border-destructive' : 'border-input'}`}
                  >
                    <option value="">Select a topic or choose custom</option>
                    {speakingTopics.map((topic, index) => (
                      <option key={index} value={topic.title}>{topic.title}</option>
                    ))}
                    <option value="custom">Custom Topic</option>
                  </select>
                  {errors.topic && (
                    <p className="text-sm text-destructive mt-1">{errors.topic}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Event Details & Special Requests</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`mt-1 ${errors.message ? 'border-destructive' : ''}`}
                    placeholder="Tell us about your event, goals, audience, and any special requirements..."
                    rows={4}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  <Mail className="mr-2 h-5 w-5" />
                  {isLoading ? "Submitting Request..." : "Submit Speaking Request"}
                </Button>
              </form>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Prefer to speak directly?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">1-800-GENIUS (1-800-436-4878)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">director@geniusrecovery.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modals */}
      <Dialog open={isJoeVideoOpen} onOpenChange={setIsJoeVideoOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Joe's Keynote Highlights</DialogTitle>
            <DialogDescription>
              Watch Joe's keynote highlights and powerful speaking moments
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/KW_Oqge2fNE?autoplay=1"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAndreVideoOpen} onOpenChange={setIsAndreVideoOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Andre's Speaker Reel</DialogTitle>
            <DialogDescription>
              Watch Andre's transformational presentations and speaker highlights
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/7I2xO3AzLbc?autoplay=1"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Speakers;